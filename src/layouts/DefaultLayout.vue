<template>
  <div>
    <nav>
      <slot name="nav"></slot>
    </nav>
    <main>
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script>
  export default {
  name: "DefaultLayout"
}
</script>