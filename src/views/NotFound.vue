<template>
  <div class="font-sans flex flex-col justify-center min-h-screen min-w-full bg-gray-200">
    <div class="m-auto">
      <p class="text-3xl text-center">404 Page Not Found</p>
      <p class="text-lg text-center">You will be redirected to our homepage shortly</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
    mounted() {
      setTimeout(() => this.$router.push({name: 'Home'}), 3000);
    }
  }
</script>
