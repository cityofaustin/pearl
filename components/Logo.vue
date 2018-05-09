<template>
  <div class="logo">
    <img src="~/static/img/logo-blue.svg" :width="this.width" :height="this.height" alt="❤️🐔">
  </div>
</template>

<script>
export default {
  props: {
    width: {type: Number, default: () => 50},
    height: {type: Number, default: () => 50},
  }
}
</script>


<style>
</style>
