<template>
  <div class="font-sans bg-gray-200">
    <div class="container min-h-screen mx-auto p-1">
      <nav class="flex space-x-2 text-3xl whitespace-no-wrap leading-none mb-2">
        <slot name="nav"></slot>
      </nav>
      <main class="text-lg">
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DefaultLayout"
  }
</script>