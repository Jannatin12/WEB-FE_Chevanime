<template>
  <div>
    <app-list>
      <top-anime-card></top-anime-card>
      <top-anime-card></top-anime-card>
      <top-anime-card></top-anime-card>
      <top-anime-card></top-anime-card>
      <top-anime-card></top-anime-card>
      <top-anime-card></top-anime-card>
    </app-list>
  </div>
</template>

<script>
import TopAnimeCard from "../components/TopAnimeCard.vue"
import List from "../components/List.vue"
export default {
  name: 'TopAnime',
  components: {
    TopAnimeCard,
    'app-list' : List
  }
}
</script>