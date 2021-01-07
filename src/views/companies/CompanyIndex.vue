<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
    </template>
    <template v-slot:main>
      <ul v-if="companies && companies.length !== 0">
        <li v-for="company in companies" :key="company.id">
          <router-link :to="{name: 'CompanyDetails', params: {symbol: company.symbol}}">{{ company.name }}</router-link>
        </li>
      </ul>
      <p v-else class="h-full text-center text-3xl">No Companies Found</p>
    </template>
  </default-layout>
</template>

<script>
  import AlphaVantage from '@/alpha-vantage';
  import DefaultLayout from "@/layouts/DefaultLayout";
  import NavLink from "@/components/NavLink";

  export default {
    name: "CompanyIndex",
    components: {
      DefaultLayout,
      NavLink
    },
    data: function () {
      return {
        companies: AlphaVantage.getAllCompanies()
      }
    }
  }
</script>