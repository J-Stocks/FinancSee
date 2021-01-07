<template>
  <default-layout>
    <template v-slot:nav>
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'CompanyIndex'}">Companies</router-link>
    </template>
    <template v-slot:main>
      <p>Company Name: {{ company.name }}</p>
      <p>Symbol: {{ company.symbol }}</p>
      <p>Exchange: {{ company.exchange }}</p>
      <p>Asset Type: {{ company.assetType }}</p>
      <p>IPO date: {{ company.ipoDate }}</p>
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
        companyId: this.$route.params.id,
      }
    },
    computed: {
      company() {
        return AlphaVantage.getCompanyById(this.companyId);
      }
    }
  }
</script>