<template>
  <default-layout>
    <template v-slot:nav>
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'CompanyIndex'}">Companies</router-link>
    </template>
    <template v-slot:main>
      <h1>Welcome to FinancSee</h1>
    </template>
  </default-layout>
</template>

<script>
  import DefaultLayout from "@/layouts/DefaultLayout";

  export default {
    name: 'HomePage',
    components: {
      DefaultLayout
    }
  }
</script>
