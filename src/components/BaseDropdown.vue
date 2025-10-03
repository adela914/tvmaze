<!-- Work in progress -->
<script setup lang="ts">
interface BaseDropdownProps {
  id: string
  label: string
  options: readonly string[]
  name?: string
  placeholder?: string
}

defineProps<BaseDropdownProps>()

const selected = defineModel<string>()
</script>

<template>
  <label :for="id">{{ label }}: </label>
  <select v-model="selected" :name="name" :id="id">
    <option value="" selected>{{ placeholder }}</option>
    <option v-for="option in options" :key="option">{{ option }}</option>
  </select>
</template>
