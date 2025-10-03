<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

defineOptions({ inheritAttrs: false }) // ensure attrs go to <input>, not wrapper

// v-model for the component (transparent)
const model = defineModel<string>({ default: '' })

// optional external id support; otherwise auto-id for <label for="">
defineProps<{ inputId?: string }>()

const attrs = useAttrs()
const hasLabel = computed(() => !!useSlots().default)
</script>

<template>
  <div class="field">
    <!-- optional label via default slot -->
    <label v-if="hasLabel" class="label" :for="inputId"><slot /></label>
    <input class="input" :id="inputId" v-model="model" v-bind="attrs" />
  </div>
</template>

<style scoped>
.field {
  width: 100%;
  max-width: 400px;
}
input {
  width: 100%;
  padding: var(--space-xs) var(--space-md);
  font-size: var(--text-base);
  border-radius: var(--border-radius-xs);
  border: 1px solid #ccc;
}
</style>
