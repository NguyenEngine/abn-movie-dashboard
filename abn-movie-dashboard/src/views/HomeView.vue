<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
    <h1 class="text-3xl font-bold text-center mb-8">TV Show Dashboard</h1>

    <div class="max-w-4xl mx-auto">
      <SearchBar @search="onSearch" />
    </div>
    <div v-if="loading" class="text-center py-16 text-gray-500">
      Loading shows...
    </div>

    <div v-else class="space-y-12">
      <SearchResultsGrid v-if="searchTerm" :results="searchResults" /> 

      <div v-if="!searchTerm && filteredGroupedGenres && Object.keys(filteredGroupedGenres).length">

        <GenreRow
          v-for="(shows, genre) in filteredGroupedGenres"
          :key="genre"
          :genre="genre"
          :shows="shows"
        />
      </div>
      <div v-else-if="!searchTerm" class="text-center py-16 text-gray-500">No shows found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useShowStore } from '../stores/useShowStore';
import GenreRow from '../components/GenreRow.vue';
import SearchBar from '../components/SearchBar.vue';
import SearchResultsGrid from '../components/SearchResultsGrid.vue';

const store = useShowStore();
const searchTerm = ref('');

onMounted(() => {
  store.fetchShows();
});

const loading = computed(() => store.loading);

const filteredGroupedGenres = computed(() => {
  if (!searchTerm.value) return store.groupedByGenre;

  const result: Record<string, any[]> = {};
  for (const [genre, shows] of Object.entries(store.groupedByGenre)) {
    const filtered = shows.filter(show =>
      show.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
    if (filtered.length) result[genre] = filtered;
  }
  return result;
});

function onSearch(value: string) {
  searchTerm.value = value;
}


const searchResults = computed(() => {
  if (!searchTerm.value) return [];

  const query = searchTerm.value.toLowerCase();

  const allShows = Object.values(filteredGroupedGenres.value).flat();

  const uniqueShows = Array.from(
    new Map(allShows.map((s) => [s.id, s])).values()
  );

  return uniqueShows.filter((show) =>
    show.name?.toLowerCase().includes(query)
  );
});
</script>
