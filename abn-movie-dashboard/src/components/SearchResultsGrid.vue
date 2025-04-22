<template>
  <div class="search-results" v-if="results.length > 0">
    <h2 class="text-xl font-bold mb-4">Search Results</h2>
    <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <ShowCard
        v-for="show in results"
        :key="show.id"
        :show="show"
      />
    </div>
  </div>
  <p v-else class="text-center py-16 text-gray-500">
    No shows found.
  </p>
</template>

<script setup lang="ts">
import { Show } from '../types/Show';
import ShowCard from './ShowCard.vue';

defineProps<{ results: Show[] }>();
</script>

<style scoped>
.search-results {
  padding: 2rem 1rem;
}
</style>