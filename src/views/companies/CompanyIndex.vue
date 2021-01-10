<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
      <button v-on:click="previousPage" name="previous" type="button">Previous Page</button>
      <p>Page {{ currentPage + 1 }} of {{ pageCount + 1 }}</p>
      <button v-on:click="nextPage" name="next" type="button">Next Page</button>
    </template>
    <template v-slot:main>
      <ul v-if="companies && companies.length !== 0">
        <li v-for="company in companiesToShow" :key="company.id">
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
        companies: [],
        companiesPerPage: 20,
        currentPage: 0
      }
    },
    computed: {
      companiesToShow() {
        return this.companies.slice(
            this.currentPage * this.companiesPerPage,
            (this.currentPage * this.companiesPerPage) + this.companiesPerPage
        );
      },
      pageCount() {
        return Math.ceil(this.companies.length / this.companiesPerPage);
      }
    },
    created() {
      AlphaVantage.getAllCompanies().then(results => this.companies = results);
    },
    methods: {
      nextPage() {
        if (this.companies[(this.currentPage + 1) * this.companiesPerPage] !== undefined) {
          this.currentPage++;
        }
      },
      previousPage() {
        if (this.currentPage !== 0) {
          this.currentPage--;
        }
      }
    }
  }
</script>