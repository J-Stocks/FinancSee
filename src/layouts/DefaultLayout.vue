<template>
  <div class="font-sans bg-gray-200">
    <div class="container flex flex-col min-h-screen mx-auto px-1 pb-1">
      <nav :class="navClasses">
        <slot name="nav"></slot>
      </nav>
      <main class="flex flex-col flex-grow text-lg">
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DefaultLayout",
    props: {
      stickyNav: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      navClasses() {
        let classes = "bg-gray-200 pt-1 pb-2 flex space-x-2 text-3xl whitespace-no-wrap leading-none"
        if (this.stickyNav) {
          return classes + ' sticky top-0'
        } else {
          return classes
        }
      }
    }
  }
</script>