<template>
  <section>
    <h1>Company Index</h1>
    <p v-if="companies === undefined || companies.length === 0">{{ message }}</p>
    <ul v-else>
      <li v-for="company in companies" :key="company.id">
        <router-link :to="{name: 'CompanyDetails', params: {id: company.id}}">{{ company.name }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import {AlphaVantage} from '@/alpha-vantage';

  export default {
    name: "CompanyIndex",
    data: function () {
      return {
        message: 'No Companies Found',
        companies: AlphaVantage.getAllCompanies()
      }
    }
  }
</script>

<style scoped>

</style>