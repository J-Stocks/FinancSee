<template>
  <div>
    <h1>Company Index</h1>
    <ul>
      <li v-for="company in companies" :key="company.id">{{ company.name }}</li>
    </ul>
  </div>
</template>

<script>
  import {AlphaVantage} from '@/alpha-vantage';

  export default {
    name: "CompanyIndex",
    data: function () {
      return {
        message: 'No Companies Found',
        companies: []
      }
    },
    mounted() {
      this.companies = Object.assign({}, AlphaVantage.getAllCompanies());
      console.log(this.companies);
    }
  }
</script>

<style scoped>

</style>