<template>
  <div class="toaster" role="status" aria-live="polite">
    <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">
      {{ t.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toasterStore'
const { toasts } = storeToRefs(useToastStore())
</script>

<style scoped>
.toaster {
  position: fixed;
  left: 50%;
  bottom: var(--space-xl);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-xs);
  z-index: 9999;
}

.toast {
  min-width: 220px;
  max-width: 360px;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  color: var(--color-text);
  background: #2c2c2c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  opacity: 0;
  transform: translateY(6px);
  animation: fade-up 0.2s ease forwards;
}

@keyframes fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast.info {
  background: var(--color-toast-info);
}
.toast.success {
  background: var(--color-toast-success);
}
.toast.error {
  background: var(--color-toast-error);
}
</style>
