<template>
  <div class="show-detail">
    <button class="show-detail__back-button" @click="$router.push('/')">← Back to home</button>

    <div class="show-detail__content">
      <div class="show-detail__poster-wrapper">
        <img :src="selectedShow?.image?.original || placeholderImage" :alt="selectedShow?.name" class="show-detail__poster-wrapper__poster" />
      </div>

      <div class="show-detail__info">
        <h1 class="show-detail__info__title">{{ selectedShow?.name }}</h1>
        <p class="show-detail__info__summary" v-html="selectedShow?.summary"></p>
        <div class="show-detail__info__meta">
        <span v-if="selectedShow?.genres.length" class="show-detail__info__meta__item">
          <strong>Genres:</strong> {{ selectedShow.genres.join(', ') }}
        </span>
          <span v-if="selectedShow?.rating?.average" class="show-detail__info__meta__item">
          <strong>Rating:</strong> {{ selectedShow.rating.average }}/10
        </span>
          <span v-if="selectedShow?.language" class="show-detail__info__meta__item">
          <strong>Language:</strong> {{ selectedShow.language }}
        </span>
        </div>
      </div>
    </div>

    <div class="show-detail__extra-section">
      <h2 class="show-detail__extra-section__heading">Cast</h2>
      <ul class="show-detail__extra-section__cast-list">
        <li v-for="member in cast" :key="member.person.id" class="show-detail__extra-section__cast-list__item">
          <img :src="member.person.image?.medium" :alt="member.person.name" class="show-detail__extra-section__cast-list__item__image" />
          <div>
            <strong>{{ member.person.name }}</strong>
            <div class="show-detail__extra-section__cast-list__item__character">as {{ member.character.name }}</div>
          </div>
        </li>
      </ul>

      <div class="show-detail__extra-section__suggestions" v-if="suggestions.length">
        <GenreRow genre="You might also like" :shows="suggestions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import GenreRow from '@/components/GenreRow.vue'
import { useShowStore } from '@/stores/useShowStore'
import { storeToRefs } from 'pinia'
import { Cast } from '@/types/Cast'
import { Show } from '@/types/Show'

const route = useRoute()
const store = useShowStore()
const { selectedShow, shows } = storeToRefs(store)
const cast = ref<Cast[]>([])
const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'

const getShow = async () => {
  await store.getShowById(Number(route.params.id))
  cast.value = selectedShow.value?._embedded?.cast?.slice(0, 5) || []
}

const suggestions = computed<Show[]>(() => {
  const genres = selectedShow.value?.genres || []
  if (!genres.length) return []

  if (!shows.value.length) {
    store.getAllShows()
  }
  const genreShows = store.showsByGenre
    .filter(g => genres.some(genre => g.genre.includes(genre)))
    .flatMap(g => g.shows.slice(0, 3))

  return Array.from(new Set(genreShows))
    .filter(s => s.id !== selectedShow.value?.id)
    .slice(0, 10)
})

onMounted(getShow)
watch(() => route.params.id, getShow)
</script>

<style scoped lang="scss">
.show-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--color-text);

  &__back-button {
    background: transparent;
    border: none;
    font-size: 1rem;
    color: var(--color-heading);
    cursor: pointer;
    margin-bottom: -1rem;
    padding: 0;
  }

  &__poster-wrapper {
    max-width: 300px;

    &__poster {
      width: 100%;
      border-radius: 0.5rem;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
  }

  .show-detail__content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .show-detail__poster-wrapper {
    max-width: 300px;

    &__poster {
      width: 100%;
      border-radius: 0.5rem;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
  }

  .show-detail__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-heading);
    }

    &__summary {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--color-text);
    }

    &__meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 1rem;
      color: var(--color-text);

      &__item {
        font-size: 1rem;
        color: var(--color-text);
      }
    }
  }

  &__extra-section {
    &__heading {
      font-size: 1.5rem;
      margin-top: 2rem;
      color: var(--color-heading);
    }

    &__cast-list {
      display: flex;
      gap: 1rem;
      list-style: none;

      &__item {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        &__image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        &__character {
          font-size: 0.85rem;
          color: gray;
        }
      }
    }
    
    &__suggestions {
      margin-top: 4rem;
    }
  } 
}
</style>