<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
      <button
          v-on:click="previousPage"
          title="Previous Page"
          type="button"
          class="border-2 border-black rounded px-1 focus:border-blue-900 focus:text-blue-900 hover:border-blue-900 hover:text-blue-900 ease-in-out"
      >
        ←
      </button>
      <p class="text-xl flex flex-col justify-center">Page {{ currentPage + 1 }} of {{ pageCount + 1 }}</p>
      <button
          v-on:click="nextPage"
          title="Next Page"
          type="button"
          class="border-2 border-black rounded px-1 focus:border-blue-900 focus:text-blue-900 hover:border-blue-900 hover:text-blue-900 ease-in-out"
      >
        →
      </button>
    </template>
    <template v-slot:main>
      <div>
        <div v-if="companies && companies.length !== 0" class="inline-grid gird-cols-2-auto gap-2">
          <template v-for="company in companiesToShow">
            <router-link :to="{name: 'CompanyDetails', params: {symbol: company.symbol}}" :key="'symbol' + company.id">
              <strong class="whitespace-nowrap">{{ company.symbol }}</strong>
            </router-link>
            <router-link :to="{name: 'CompanyDetails', params: {symbol: company.symbol}}" :key="'name' + company.id">
              {{ company.name }}
            </router-link>
          </template>
        </div>
        <p v-else class="h-full text-center text-3xl">No Companies Found</p>
      </div>
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