<template>
  <div class="mb-6">
    <InputText v-model="searchQuery" placeholder="Search shows..." class="w-full p-inputtext-sm" @input="onSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import InputText from 'primevue/inputtext';

const emit = defineEmits(['search']);
const searchQuery = ref('');

const onSearch = () => {
  emit('search', searchQuery.value);
};
</script>