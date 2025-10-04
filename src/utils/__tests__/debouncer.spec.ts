import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from '@/utils/debouncer'

describe('debounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('calls the function once after the delay', () => {
    const fn = vi.fn()
    const d = debounce(fn, 400)

    d('a')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(399)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')
  })

  it('coalesces rapid calls and uses the last arguments', () => {
    const fn = vi.fn()
    const d = debounce(fn, 400)

    d(1)
    vi.advanceTimersByTime(200)
    d(2)
    vi.advanceTimersByTime(200)
    d(3)

    vi.advanceTimersByTime(399)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)
  })

  it('cancel prevents the pending invoke', () => {
    const fn = vi.fn()
    const d = debounce(fn, 400)

    d('x')
    d.cancel()
    vi.advanceTimersByTime(1000)

    expect(fn).not.toHaveBeenCalled()
  })

  it('supports custom delay and can be used again after firing', () => {
    const fn = vi.fn()
    const d = debounce(fn, 50)

    d('first')
    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith('first')

    d('second')
    vi.advanceTimersByTime(49)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('second')
  })
})
