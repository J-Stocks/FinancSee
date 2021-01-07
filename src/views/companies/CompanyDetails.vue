<template>
  <default-layout>
    <template v-slot:nav>
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'CompanyIndex'}">Companies</router-link>
    </template>
    <template v-slot:main>
      <div v-if="company">
        <p>Company Name: {{ company.Name }}</p>
        <p>Symbol: {{ company.Symbol }}</p>
        <p>Exchange: {{ company.Exchange }}</p>
        <p>Asset Type: {{ company.AssetType }}</p>
        <p>Industry: {{ company.Industry }}</p>
        <p>{{ company.Description }}</p>
      </div>
      <p v-else>Waiting for Data</p>
    </template>
  </default-layout>
</template>

<script>
  import {AlphaVantage} from '@/alpha-vantage';
  import DefaultLayout from "@/layouts/DefaultLayout";

  export default {
    name: "CompanyDetails",
    components: {
      DefaultLayout
    },
    data: function () {
      return {
        company: null,
        companySymbol: this.$route.params.symbol,
      }
    },
    computed: {
      companyPromise() {
        return AlphaVantage.getCompanyBySymbol(this.companySymbol);
      }
    },
    mounted() {
      this.companyPromise
          .then(response => response.json())
          .then(json => this.company = Object.assign({}, json))
          .catch((error) => console.log('Error:', error));
    }
  }
</script>