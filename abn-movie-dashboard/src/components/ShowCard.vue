<template>
  <router-link :to="`/show/${show.id}`"
               class="group relative block rounded-lg overflow-hidden w-48 min-w-[12rem] flex-shrink-0 transform transition-transform duration-300 hover:scale-105 z-10">
    <img :src="show.image?.medium || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'"
         alt="Show image" class="w-full h-72 object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
      <h3 class="text-white text-md font-semibold mb-1">{{ show.name }}</h3>
      <p class="text-white text-sm line-clamp-3" v-html="cleanedSummary"></p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Show } from '@/types/Show'

const props = defineProps<{ show: Show }>()

const cleanedSummary = computed(() => {
  return props.show.summary?.replace(/<[^>]+>/g, '').slice(0, 250) + '...'
})
</script>

<style scoped></style>