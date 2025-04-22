<template>
  <div class="mb-6">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        type="text"
        size="large"
        v-model.trim="searchQuery"
        placeholder="Search shows..."
        class="bg-white w-full h-[50px] pl-10 text-gray-700"
        @input.prevent="onSearch"
        @keyup.enter="doSearch"
        aria-label="search shows" />
    </IconField>
  </div>
</template>

<script setup lang="ts">
import { useShowStore } from '@/stores/useShowStore'
import debounce from '@/utils/debounce'
import { IconField, InputIcon, InputText } from 'primevue'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['search'])
const store = useShowStore()
const { searchQuery } = storeToRefs(store)

const onSearch = debounce(() => {
  doSearch()
}, 300)

const doSearch = () => {
  emit('search', searchQuery.value)
  store.searchShows(searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
  store.searchShows('')
}
</script>
