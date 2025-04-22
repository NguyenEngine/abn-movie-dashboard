<template>
  <div class="min-h-screen py-8 px-4 sm:px-8 lg:px-16">
    <h1 class="text-3xl font-bold text-center mb-8">TV Show Dashboard</h1>
    <SearchBar @search="onSearch" />
    <div v-if="isLoading" class="text-center py-16 text-gray-500">Loading shows...</div>
    <div v-else class="space-y-12">
      <SearchResultsGrid v-if="searchQuery" :results="searchResults" />
      <div v-if="!searchQuery && showsByGenre && Object.keys(showsByGenre).length">
        <GenreRow
          v-for="showsList in showsByGenre"
          :key="showsList.genre"
          :genre="showsList.genre"
          :shows="showsList.shows"
        />
      </div>
      <div v-else-if="!searchQuery" class="text-center py-16 text-gray-500">No shows found.</div>
    </div>
    <BackToTopButton />    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useShowStore } from '@/stores/useShowStore'
import GenreRow from '@/components/GenreRow.vue'
import SearchBar from '@/components/SearchBar.vue'
import SearchResultsGrid from '../components/SearchResultsGrid.vue'
import { storeToRefs } from 'pinia'
import BackToTopButton from '@/components/BackToTopButton.vue';

const store = useShowStore()
const { showsByGenre, isLoading, searchResults, error } = storeToRefs(store)
const searchQuery = ref('')

onMounted(() => {
  store.getAllShows()
})

function onSearch(value: string) {
  searchQuery.value = value
}



</script>
