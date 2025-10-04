import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'
import { nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '@/App.vue'
import { useToastStore } from '@/stores/toasterStore'

// Helper: make a router we can control
function makeRouter(start = '/') {
  const routes = [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/about', name: 'about', component: { template: '<div>About</div>' } },
  ]
  const router = createRouter({ history: createMemoryHistory(), routes })
  router.push(start)
  return router
}

function renderApp(start = '/') {
  const router = makeRouter(start)
  const pinia = createTestingPinia({
    // we want the real show() with setTimeout behavior
    stubActions: false,
    initialState: {
      // store id is "toast"
      toast: { toasts: [] },
    },
  })

  const utils = render(App, { global: { plugins: [router, pinia] } })
  return router.isReady().then(() => ({ ...utils, router }))
}

describe('App.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders current route and updates on navigation', async () => {
    const { router } = await renderApp('/')
    expect(screen.getByText('Home')).toBeInTheDocument()

    await router.push('/about')
    await nextTick()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders BaseToaster as a polite live region', async () => {
    await renderApp('/')
    const region = screen.getByRole('status')
    expect(region).toBeInTheDocument()
    // If role is on the container, aria-live should be "polite"
    expect(region).toHaveAttribute('aria-live', 'polite')
  })

  it('shows a toast when store.show() is called', async () => {
    await renderApp('/')
    const toastStore = useToastStore()

    toastStore.show('Saved successfully', 'success', 5000)
    await nextTick() // let DOM update

    // Message is visible
    expect(screen.getByText('Saved successfully')).toBeInTheDocument()
    // The toast element should have the "success" type class
    // (parent .toast element wraps the text)
    const toastEl = screen.getByText('Saved successfully').closest('.toast')
    expect(toastEl).not.toBeNull()
    expect(toastEl).toHaveClass('success')
  })

  it('auto-dismisses the toast after duration', async () => {
    vi.useFakeTimers()
    try {
      await renderApp('/')
      const toastStore = useToastStore()

      toastStore.show('Bye soon', 'info', 1200)
      await nextTick()
      expect(screen.getByText('Bye soon')).toBeInTheDocument()

      // Advance time just before dismissal
      vi.advanceTimersByTime(1100)
      expect(screen.getByText('Bye soon')).toBeInTheDocument()

      // Cross the threshold
      vi.advanceTimersByTime(200)
      await nextTick()
      expect(screen.queryByText('Bye soon')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('renders multiple toasts (latest appears too)', async () => {
    await renderApp('/')
    const toastStore = useToastStore()

    toastStore.show('First', 'info', 5000)
    toastStore.show('Second', 'error', 5000)
    await nextTick()

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()

    const second = screen.getByText('Second').closest('.toast')
    expect(second).toHaveClass('error')
  })
})
