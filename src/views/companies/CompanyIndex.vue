<template>
  <default-layout>
    <template v-slot:nav>
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'CompanyIndex'}">Companies</router-link>
    </template>
    <template v-slot:main>
      <h1>Company Index</h1>
      <p v-if="companies === undefined || companies.length === 0">{{ message }}</p>
      <ul v-else>
        <li v-for="company in companies" :key="company.id">
          <router-link :to="{name: 'CompanyDetails', params: {id: company.id}}">{{ company.name }}</router-link>
        </li>
      </ul>
    </template>
  </default-layout>
</template>

<script>
  import {AlphaVantage} from '@/alpha-vantage';
  import DefaultLayout from "@/layouts/DefaultLayout";

  export default {
    name: "CompanyIndex",
    components: {
      DefaultLayout
    },
    data: function () {
      return {
        message: 'No Companies Found',
        companies: AlphaVantage.getAllCompanies()
      }
    }
  }
</script>