<template>
  <router-link
      :to=routeTo
      class="pb-0.5 border-b border-0 border-gray-200 hover:border-gray-800 ease-in-out duration-150"
  >
    {{ linkText }}
  </router-link>
</template>

<script>
  export default {
    name: "NavLink",
    props: {
      routeTo: Object,
      linkText: String
    }
  }
</script>

<style scoped>
  .router-link-exact-active{
    @apply text-blue-900 hover:border-blue-900;
  }
</style>