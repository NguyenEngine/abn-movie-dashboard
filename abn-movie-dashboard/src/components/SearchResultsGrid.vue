<template>
  <div class="" v-if="searchResults.length > 0">
    <h2 class="text-xl font-bold mb-4">Search Results for <span class="italic">{{ searchQuery }}</span></h2>
    <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <ShowCard
        v-for="show in searchResults"
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
import { useShowStore } from '@/stores/useShowStore'
import { storeToRefs } from 'pinia'
import ShowCard from '@/components/ShowCard.vue'

const store = useShowStore()
const { searchResults, searchQuery } = storeToRefs(store)
</script>
