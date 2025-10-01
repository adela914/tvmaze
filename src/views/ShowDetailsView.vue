<script lang="ts" setup>
import { useShowsStore } from '@/stores/showsStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showId = computed(() => route.params.id as string)

const store = useShowsStore()
</script>
<template>
  <pre>{{ store.showsObjectById[showId] }}</pre>
</template>
