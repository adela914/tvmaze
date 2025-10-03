<script lang="ts" setup>
import { useShowDetailsStore } from '@/stores/showDetailsStore'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showId = computed(() => route.params.id as string)
const showDetailsStore = useShowDetailsStore()
const showData = computed(() => showDetailsStore.showDetails)

onMounted(() => {
  showDetailsStore.fetchShowById(showId.value)
})
</script>

<template>
  <main v-if="showData && !showDetailsStore.isLoading" class="hero">
    <!-- backdrop -->
    <div
      class="backdrop"
      :style="{ backgroundImage: `url(${showData.image?.original || showData.image?.medium})` }"
    ></div>

    <div class="overlay">
      <!-- poster -->
      <div class="poster">
        <img class="image" :src="showData?.image?.medium" :alt="showData?.name" />
      </div>

      <!-- details -->
      <div class="details">
        <h1>{{ showData.name }}</h1>
        <p class="meta">
          <span v-if="showData.premiered">{{ showData.premiered.slice(0, 4) }}</span>
          <span v-if="showData.rating?.average"> • ⭐ {{ showData.rating.average }}/10</span>
        </p>
        <div class="genres">
          <span v-for="g in showData.genres" :key="g" class="badge">{{ g }}</span>
        </div>
        <p class="summary" v-html="showData.summary"></p>
        <p class="extra">
          <strong>Language:</strong> {{ showData.language }} <br />
          <strong>Release Date:</strong> {{ showData.premiered }}
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero {
  position: relative;
  color: var(--color-text);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(12px) brightness(0.4);
  z-index: -1;
}

.overlay {
  display: flex;
  gap: 32px;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  width: 100%;
}

.poster {
  flex-shrink: 0;
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details h1 {
  margin: 0;
  font-size: 2.4rem;
  line-height: 1.2;
}

.meta {
  color: #ddd;
  font-size: 1rem;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
}

.summary {
  max-width: 700px;
  line-height: 1.6;
  color: #eee;
}

.extra {
  font-size: 0.9rem;
  color: #ccc;
}

/* Responsive */
@media (max-width: 800px) {
  .overlay {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .poster {
    width: 60%;
    max-width: 280px;
  }

  .details {
    align-items: center;
  }

  .summary {
    text-align: left;
  }
}
</style>
