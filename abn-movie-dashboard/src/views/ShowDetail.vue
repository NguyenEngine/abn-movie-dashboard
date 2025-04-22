<template>
    <div class="show-detail">
        <button class="back-button" @click="$router.push('/')">← Back to home</button>

        <div class="poster-wrapper">
            <img :src="show?.image?.original || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'"
                :alt="show?.name" class="poster" />
        </div>

        <div class="info">
            <h1>{{ show?.name }}</h1>
            <p class="summary" v-html="show?.summary"></p>
            <div class="meta">
                <span v-if="show?.genres.length"> <strong>Genres:</strong> {{ show.genres.join(', ') }}</span>
                <span v-if="show?.rating?.average"> <strong>Rating:</strong> {{ show.rating.average }}/10</span>
                <span v-if="show?.language"> <strong>Language:</strong> {{ show.language }}</span>
            </div>
        </div>

        <div class="extra-section">
            <h2>Cast</h2>
            <ul class="cast-list">
                <li v-for="member in cast" :key="member.person.id">
                    <img :src="member.person.image?.medium" :alt="member.person.name" />
                    <div>
                        <strong>{{ member.person.name }}</strong>
                        <div class="character">as {{ member.character.name }}</div>
                    </div>
                </li>
            </ul>

            <h2>🎬 You might also like</h2>
            <GenreRow v-if="suggestions.length" genre="Recommended" :shows="suggestions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import GenreRow from '@/components/GenreRow.vue';

const route = useRoute();
const show = ref<any>(null);
const cast = ref<any[]>([]);
const suggestions = ref<any[]>([]);

async function fetchShowData(id: string | number) {
    const [showRes, castRes] = await Promise.all([
        axios.get(`https://api.tvmaze.com/shows/${id}`),
        axios.get(`https://api.tvmaze.com/shows/${id}/cast`),
    ]);

    show.value = showRes.data;
    cast.value = castRes.data.slice(0, 5);

    const genre = show.value.genres?.[0];
    if (genre) {
        const res = await axios.get(`https://api.tvmaze.com/shows`);
        suggestions.value = res.data
            .filter((s: any) => s.genres.includes(genre) && s.id !== show.value.id)
            .slice(0, 15);
    }
}

onMounted(() => {
    fetchShowData(route.params.id as string);
});

watch(() => route.params.id,(newId) => {
        if (newId) fetchShowData(newId);
    }
);
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

    .back-button {
        background: transparent;
        border: none;
        font-size: 1rem;
        color: var(--color-heading);
        cursor: pointer;
        margin-bottom: -1rem;
        padding: 0;
    }

    .poster-wrapper {
        flex: 1 1 300px;
        max-width: 300px;

        .poster {
            width: 100%;
            height: auto;
            border-radius: 0.5rem;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
        }
    }

    .info {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-heading);
        }

        .summary {
            font-size: 1.1rem;
            line-height: 1.7;
            color: var(--color-text);
        }

        .meta {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            font-size: 1rem;
            color: var(--color-text);
        }
    }

    .extra-section {
        h2 {
            font-size: 1.5rem;
            margin-top: 2rem;
            color: var(--color-heading);
        }

        .cast-list {
            display: flex;
            gap: 1rem;
            margin: 1rem 0;
            list-style: none;
            padding: 0;

            li {
                display: flex;
                gap: 0.5rem;
                align-items: center;

                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .character {
                    font-size: 0.85rem;
                    color: gray;
                }
            }
        }
    }
}
</style>