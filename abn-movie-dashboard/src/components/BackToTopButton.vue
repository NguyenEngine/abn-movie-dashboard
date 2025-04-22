<template>
  <div v-if="isVisible" class="fixed bottom-4 w-full flex justify-center z-10">
    <button
      @click="scrollToTop"
      class="bg-white p-button-rounded p-4 pr-8 text-black hover:bg-gray-300">
      <IconField class="pi pi-arrow-up mr-4" />
      Back to top
    </button>
  </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield'
import { ref, watch } from 'vue'

defineProps({
  hideOnTop: {
    type: Boolean,
    default: true
  }
})

// only show button if scroll position is not at the top
const isVisible = ref(false)
window.addEventListener('scroll', () => {
  isVisible.value = window.scrollY > 100;
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>
