import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import BaseCarousel from '@/components/BaseCarousel.vue'

const slides = [
  { id: 1, alt: 'Alpha', img: { medium: 'https://img/1.jpg' } },
  { id: 2, alt: 'Beta', img: { medium: 'https://img/2.jpg' } },
  { id: 3, alt: 'Gamma', img: { medium: 'https://img/3.jpg' } },
]

describe('BaseCarousel', () => {
  it('renders header and slide images', () => {
    render(BaseCarousel, { props: { header: 'Drama', slides, isLoading: false, perPage: 2 } })
    expect(screen.getByRole('heading', { name: /drama/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /alpha/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /beta/i })).toBeInTheDocument()
  })

  it('emits onImageClick with slide id when an image is clicked', async () => {
    const { emitted } = render(BaseCarousel, {
      props: { header: 'Drama', slides, isLoading: false, perPage: 2 },
    })
    await userEvent.click(screen.getByRole('img', { name: /alpha/i }))
    expect(emitted().onImageClick?.[0]).toEqual([1])
  })

  it('emits loadMore when reaching end and pressing Next', async () => {
    const { emitted } = render(BaseCarousel, {
      props: { header: 'Drama', slides, isLoading: false, perPage: 2 },
    })
    // Two pages: [1,2] then [3]; press Next twice → second should trigger loadMore
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(emitted().loadMore).toBeTruthy()
  })

  it('shows loading affordance on images when isLoading=true', () => {
    render(BaseCarousel, { props: { header: 'Drama', slides, isLoading: true, perPage: 3 } })
    const img = screen.getByRole('img', { name: /alpha/i })
    // class .isLoading is attached to <img>
    expect(img.classList.contains('isLoading')).toBe(true)
  })

  it('supports keyboard navigation (left/right) and emits loadMore at end', async () => {
    const user = userEvent.setup()
    const { emitted } = render(BaseCarousel, {
      props: { header: 'Drama', slides, isLoading: false, perPage: 2 },
    })

    // Focus the carousel region
    const region = screen.getByRole('region', { name: /drama/i })
    region.focus()
    expect(region).toHaveFocus()

    // 1st Right: advance to last page -> "Previous" should now be enabled
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled()

    // 2nd Right: we are at the end -> should request more (emit loadMore)
    await user.keyboard('{ArrowRight}')
    expect(emitted().loadMore).toBeTruthy()
    expect(emitted().loadMore).toHaveLength(1)

    // Optional: go back to start with Left keys; "Previous" becomes disabled at index 0
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  })
})
