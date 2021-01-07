<template>
  <section>
    <p>Company Name: {{ company.name }}</p>
    <p>Symbol: {{ company.symbol }}</p>
    <p>Exchange: {{ company.exchange }}</p>
    <p>Asset Type: {{ company.assetType }}</p>
    <p>IPO date: {{ company.ipoDate }}</p>
  </section>
</template>

<script>
  import {AlphaVantage} from '@/alpha-vantage';

  export default {
    name: "CompanyDetails",
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

<style scoped>

</style>