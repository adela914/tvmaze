export function debounce<A extends unknown[]>(fn: (...args: A) => void, delay = 400) {
  let t: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: A) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }

  debounced.cancel = () => {
    if (t) clearTimeout(t)
  }

  return debounced as ((...args: A) => void) & { cancel: () => void }
}
