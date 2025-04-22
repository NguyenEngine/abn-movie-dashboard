<template>
  <div class="mb-12 overflow-visible">
    <h2 class="text-xl font-bold mb-4">
      {{ genre }}
      <span v-if="genre.toLowerCase() === 'anime' || shows.length > 60"
            class="ml-2 inline-block text-xs font-semibold bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full align-middle">Top
        Genre</span>
    </h2>
    <div class="relative -mx-4 px-4">
      <Button icon="pi pi-chevron-left" severity="secondary" text rounded :disabled="!canScrollLeft"
              class="absolute left-0 top-1/2 -translate-y-1/2 z-20 shadow-md !bg-white !text-black hover:!bg-gray-300"
              :class="{ 'opacity-0 cursor-not-allowed': !canScrollLeft }" @click="scrollLeft" aria-label="Scroll left" />

      <div ref="scrollContainer" class="flex overflow-x-auto space-x-4 p-2 m-[-4px] scrollbar-hide scroll-smooth" @scroll="onScroll">
        <ShowCard v-for="show in shows" :key="show.id" :show="show" />
      </div>

      <Button icon="pi pi-chevron-right" severity="secondary" text rounded :disabled="!canScrollRight"
              class="absolute right-0 top-1/2 -translate-y-1/2 z-20 shadow-md !bg-white !text-black hover:!bg-gray-300"
              :class="{ 'opacity-0 cursor-not-allowed': !canScrollRight }" @click="scrollRight" aria-label="Scroll right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import ShowCard from './ShowCard.vue'
import Button from 'primevue/button'
import { Show } from '@/types/Show'

defineProps<{ genre: string; shows: Show[] }>()

const scrollContainer = ref<HTMLDivElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollButtons() {
  const el = scrollContainer.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function onScroll() {
  updateScrollButtons()
}

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
}

onMounted(() => {
  nextTick(() => updateScrollButtons())
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
