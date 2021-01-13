<template>
  <p class="h-full text-center text-3xl">
    Loading
    <span class="loading-animation loading-dot-1">⬤</span>
    <span class="loading-animation loading-dot-2">⬤</span>
    <span class="loading-animation loading-dot-3">⬤</span>
  </p>
</template>

<script>
  export default {
    name: "LoadingMessage"
  }
</script>

<style scoped>
  .loading-animation {
    opacity: 0;
    animation: fade 3s linear;
    animation-iteration-count: infinite;
  }

  .loading-dot-1 {
    animation-delay: 0s;
  }

  .loading-dot-2 {
    animation-delay: 1s;
  }

  .loading-dot-3 {
    animation-delay: 2s;
  }

  @keyframes fade {
    0% {
      opacity: 0
    }

    16% {
      opacity: 1;
    }

    33% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }
</style>