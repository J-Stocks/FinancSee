<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
    </template>
    <template v-slot:main>
      <h1>Company Index</h1>
      <p v-if="companies === undefined || companies.length === 0">{{ message }}</p>
      <ul v-else>
        <li v-for="company in companies" :key="company.id">
          <router-link :to="{name: 'CompanyDetails', params: {symbol: company.symbol}}">{{ company.name }}</router-link>
        </li>
      </ul>
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
        message: 'No Companies Found',
        companies: AlphaVantage.getAllCompanies()
      }
    }
  }
</script>