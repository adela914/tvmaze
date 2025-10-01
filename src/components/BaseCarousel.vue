<template>
  <div class="carousel">
    <h2 class="header">{{ header }}</h2>

    <div class="viewport" ref="viewport">
      <div
        class="track"
        :style="{ transform: `translate3d(-${offsetPx}px, 0, 0)` }"
        role="region"
        aria-roledescription="carousel"
      >
        <div
          class="slide"
          v-for="s in slides"
          :key="s.id"
          :style="{ flexBasis: `${itemWidthPct}%` }"
        >
          <img
            v-if="s.img?.medium || s.img?.original"
            :src="s.img?.medium || s.img?.original"
            :alt="s.alt || ''"
            class="slide-img"
          />
        </div>
      </div>

      <button class="nav left" @click="prev" :disabled="current === 0" aria-label="Previous">
        ‹
      </button>
      <button class="nav right" @click="next" :disabled="current >= maxIndex" aria-label="Next">
        ›
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'

export interface Slide {
  id: number
  img?: { medium: string; original: string }
  alt?: string
}

type Breakpoint = { minWidth: number; perPage: number }

const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  { minWidth: 0, perPage: 1 },
  { minWidth: 480, perPage: 2 },
  { minWidth: 768, perPage: 3 },
  { minWidth: 1024, perPage: 5 },
  { minWidth: 1280, perPage: 6 },
]

const props = defineProps<{
  slides: Slide[]
  /** Fixed number of items per page (disables responsive behavior if provided) */
  perPage?: number
  /** Responsive rules sorted by minWidth ascending; falls back to DEFAULT_BREAKPOINTS */
  breakpoints?: Breakpoint[]
  header: string
}>()

const slides = computed(() => props.slides)

// viewport width tracking
const viewport = ref<HTMLElement | null>(null)
const vw = ref(0)
function measure() {
  // prefer container width for container-query–like behavior
  vw.value = viewport.value?.clientWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 0)
}

let ro: ResizeObserver | null = null
onMounted(() => {
  measure()
  window.addEventListener('resize', measure, { passive: true })
  if ('ResizeObserver' in window && viewport.value) {
    ro = new ResizeObserver(() => measure())
    ro.observe(viewport.value)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  if (ro && viewport.value) ro.disconnect()
})

// compute responsive perPage (or respect fixed prop)
const effectivePerPage = computed(() => {
  if (props.perPage != null) return Math.max(1, props.perPage)
  const rules = (props.breakpoints?.length ? props.breakpoints : DEFAULT_BREAKPOINTS)
    .slice()
    .sort((a, b) => a.minWidth - b.minWidth)
  let p = 1
  for (const r of rules) {
    if (vw.value >= r.minWidth) p = Math.max(1, r.perPage)
  }
  return p
})

// slide width and paging
const itemWidthPct = computed(() => 100 / effectivePerPage.value)
const current = ref(0)
const maxIndex = computed(() => Math.max(0, slides.value.length - effectivePerPage.value))

// translate by full viewport width per "page"
const offsetPx = computed(() => {
  if (slides.value.length <= effectivePerPage.value) return 0
  return (current.value / effectivePerPage.value) * vw.value
})

function next() {
  current.value = Math.min(current.value + effectivePerPage.value, maxIndex.value)
}
function prev() {
  current.value = Math.max(current.value - effectivePerPage.value, 0)
}

// keep index valid when inputs change
watch([slides, effectivePerPage], () => {
  if (current.value > maxIndex.value) current.value = maxIndex.value
})
</script>

<style scoped>
.carousel {
  width: 100%;
}
.header {
  margin: 0 0 8px;
  font: inherit;
  font-weight: 600;
}

.viewport {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.track {
  display: flex;
  transition: transform 300ms ease;
  will-change: transform;
  justify-content: flex-start; /* always left-aligned */
}

.slide {
  flex: 0 0 auto;
  box-sizing: border-box;
  /* each slide = 100 / perPage % — value injected inline from itemWidthPct */
}

.slide-img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 250px;
  object-fit: cover;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 40px;
  height: 40px;
  line-height: 38px;
  text-align: center;
  font-size: 24px;
  border-radius: 9999px;
  cursor: pointer;
  user-select: none;
}
.nav.left {
  left: 8px;
}
.nav.right {
  right: 8px;
}
.nav:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
