import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchData } from '@/api/api'
import { Show } from '@/types/Show'
import { groupAndSortGenres } from '@/utils/ShowSortHelper'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.tvmaze.com'

export const useShowStore = defineStore('showStore', () => {
  const shows = ref<Show[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedShow = ref<Show | null>(null)
  const searchResults = ref<Show[]>([])
  const searchQuery = ref<string>('')

  async function getAllShows() {
    isLoading.value = true
    error.value = null

    try {
      shows.value = await fetchData<Show[]>(`${API_BASE_URL}/shows`)
    } catch (err: any) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  async function getShowById(id: number) {
    isLoading.value = true
    error.value = null

    try {
      selectedShow.value = await fetchData<Show>(`${API_BASE_URL}/shows/${id}?embed=cast`)
    } catch (err: any) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  async function searchShows(query: string) {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      searchResults.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const data = await fetchData<Array<{ show: Show }>>(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(trimmedQuery)}`)
      searchResults.value = data.map(item => item.show)
    } catch (err: any) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  const showsByGenre = computed(() => groupAndSortGenres(shows.value))

  return {
    shows,
    isLoading,
    error,
    selectedShow,
    searchResults,
    searchQuery,
    showsByGenre,
    getAllShows,
    getShowById,
    searchShows
  }
})