import { defineStore } from 'pinia'
import { ref } from 'vue'

type ToastType = 'info' | 'success' | 'error'
type Toast = { id: number; message: string; type: ToastType }

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let nextId = 1

  const show = (message: string, type: ToastType = 'error', duration = 2000) => {
    const id = nextId++
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  return { toasts, show }
})
