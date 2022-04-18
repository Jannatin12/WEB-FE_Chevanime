<template>
  <div>
      <app-pagination 
      :currentPage="currentPage" 
      :hasNextPage="pagination.has_next_page" 
      v-on:changePage="changePage">
    </app-pagination>
    <app-list>
      <top-anime-card 
        v-for="topAnime in listTopAnime" 
        :key="topAnime.mal_id" 
        :anime="topAnime">
      </top-anime-card>
    </app-list>
  </div>
</template>

<script>
import http from "../helpers/http";
import TopAnimeCard from "../components/TopAnimeCard.vue"
import List from "../components/List.vue"
import Pagination from "../components/Pagination.vue"

export default {
  name: 'TopAnime',
  components: {
    TopAnimeCard,
    'app-list' : List,
    'app-pagination' : Pagination
  },
  data() {
    return {
      currentPage: 1,
      listTopAnime: [],
      pagination: {
        last_visible_page: 0,
        has_next_page: false
      }
    }
  },
  created() {
    this.getTopAnime();
  },
  methods: {
    getTopAnime(page = 1) {
      http('/top/anime?page=' + page)
        .then((response) => {
          this.listTopAnime = response.data
          this.pagination = response.pagination
        })
        .catch((error) => alert(error.message));
    },
    changePage(page) {
      this.currentPage = page;
      this.getTopAnime(page);
    }
  }
}
</script>