<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
      <nav-link :route-to="{name: 'CompanyDetails', symbol: companySymbol}" link-text="Profile"/>
      <nav-link :route-to="{name: 'CompanyGraph', symbol: companySymbol}" link-text="Prices"/>
    </template>
    <template v-slot:main>
      <div v-if="company">
        <div class="mb-2 flex flex-col-reverse md:flex-row md:justify-between">
          <p class="text-xl font-medium">{{ company.Name }}</p>
          <p class="text-xl font-medium whitespace-nowrap">Symbol: {{ company.Symbol }}</p>
        </div>
        <p class="mb-2">{{ company.Description }}</p>
        <div class="flex-col flex-col space-y-2">
          <p>Asset Type: {{ company.AssetType }}</p>
          <p>Exchange: {{ company.Exchange }}</p>
          <p>Currency: {{ company.Currency}}</p>
          <p>Country: {{ company.Country}}</p>
          <p>Sector: {{ company.Sector }}</p>
          <p>Industry: {{ company.Industry }}</p>
          <p>Address: {{ company.Address }}</p>
        </div>
      </div>
      <loading-message v-else/>
    </template>
  </default-layout>
</template>

<script>
  import AlphaVantage from '@/alpha-vantage';
  import DefaultLayout from "@/layouts/DefaultLayout";
  import NavLink from "@/components/NavLink";
  import LoadingMessage from "@/components/LoadingMessage";

  export default {
    name: "CompanyDetails",
    components: {
      DefaultLayout,
      LoadingMessage,
      NavLink
    },
    data: function () {
      return {
        company: null,
        companySymbol: this.$route.params.symbol,
      }
    },
    created() {
      AlphaVantage
          .getCompanyBySymbol(this.companySymbol)
          .then(company => this.company = Object.assign({}, company))
      ;
    }
  }
</script>