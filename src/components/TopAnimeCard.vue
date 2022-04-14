<template>
  <div class="card card-side bg-base-100 shadow-xl">
  <figure>
    <img src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie">
  </figure>
  <div class="card-body">
    <h2 class="card-title">New movie is released!</h2>
    <table>
      <tr>
        <td>Rangking</td>
        <td></td>
        <td>10</td>
      </tr>

      <tr>
        <td>Episode</td>
        <td></td>
        <td>10</td>
      </tr>

      <tr>
        <td>Tipe</td>
        <td></td>
        <td>10</td>
      </tr>

      <tr>
        <td>Score</td>
        <td></td>
        <td>10</td>
      </tr>

      <tr>
        <td>Tahun Rilis</td>
        <td></td>
        <td>10</td>
      </tr>
    </table>
    <div class="w-full flex flex-row">
      <span>
        <div class="badge badge-primary">Primary</div>
      </span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TopAnimeCard',
  props: {
    anime: {
      type: Object,
      default: () => {
        return{}
      }
    }
  }
}
</script>