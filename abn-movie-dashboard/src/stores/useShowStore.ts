import { defineStore } from 'pinia';
import axios from 'axios';
import { Show } from '../types/Show';
import { groupAndSortGenres } from '../utils/ShowSortHelper';

export const useShowStore = defineStore('showStore', {
  state: () => ({
    shows: [] as Show[],
    loading: false as boolean,
    error: null as string | null
  }),
  actions: {
    async fetchShows() {
      this.loading = true;
      try {
        const response = await axios.get('https://api.tvmaze.com/shows');
        this.shows = response.data;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  getters: {
    groupedByGenre: (state) => {
      return groupAndSortGenres(state.shows);
    }
  }
});
