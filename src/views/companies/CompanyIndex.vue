<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
      <search-box @changeSearch="updateSearchPattern($event)"/>
      <button
          v-on:click="previousPage"
          title="Previous Page"
          type="button"
          class="align-middle border-2 border-black rounded px-1 focus:border-blue-900 focus:text-blue-900 hover:border-blue-900 hover:text-blue-900 focus:outline-none ease-in-out"
      >
        ←
      </button>
      <p class="text-xl flex flex-col justify-center">Page {{ currentPage + 1 }} of {{ pageCount + 1 }}</p>
      <button
          v-on:click="nextPage"
          title="Next Page"
          type="button"
          class="align-middle border-2 border-black rounded px-1 focus:border-blue-900 focus:text-blue-900 hover:border-blue-900 hover:text-blue-900 focus:outline-none ease-in-out"
      >
        →
      </button>
    </template>
    <template v-slot:main>
      <div>
        <div v-if="visibleCompanies && visibleCompanies.length !== 0" class="inline-grid gird-cols-2-auto gap-2">
          <template v-for="company in visibleCompanies">
            <router-link :to="{name: 'CompanyDetails', params: {symbol: company.symbol}}" :key="'symbol' + company.id">
              <strong class="whitespace-nowrap">{{ company.symbol }}</strong>
            </router-link>
            <router-link :to="{name: 'CompanyDetails', params: {symbol: company.symbol}}" :key="'name' + company.id">
              {{ company.name }}
            </router-link>
          </template>
        </div>
        <p v-else-if="allCompanies && allCompanies.length !== 0" class="h-full text-center text-3xl">
          No Matching Companies Found
        </p>
        <p v-else class="h-full text-center text-3xl">Loading</p>
      </div>
    </template>
  </default-layout>
</template>

<script>
  import AlphaVantage from '@/alpha-vantage';
  import DefaultLayout from "@/layouts/DefaultLayout";
  import NavLink from "@/components/NavLink";
  import SearchBox from "@/components/SearchBox";

  export default {
    name: "CompanyIndex",
    components: {
      DefaultLayout,
      NavLink,
      SearchBox
    },
    data: function () {
      return {
        allCompanies: [],
        companiesPerPage: 50,
        visibleCompanies: [],
        currentPage: 0,
        searchPattern: ''
      }
    },
    computed: {
      pageCount() {
        return Math.ceil(this.allCompanies.length / this.companiesPerPage);
      }
    },
    watch: {
      currentPage() {
        this.updateCompaniesToShow();
      },
      searchPattern() {
        this.updateCompaniesToShow();
      }
    },
    created() {
      AlphaVantage.getAllCompanies().then(results => {
        this.allCompanies = results;
        this.updateCompaniesToShow();
      });
    },
    methods: {
      nextPage() {
        if (this.allCompanies[(this.currentPage + 1) * this.companiesPerPage] !== undefined) {
          this.currentPage++;
        }
      },
      previousPage() {
        if (this.currentPage > 0) {
          this.currentPage--;
        }
      },
      updateCompaniesToShow() {
        let tempCompanies = this.allCompanies;
        if (this.searchPattern) {
          let tempPattern = new RegExp(this.searchPattern, 'i');
          tempCompanies = tempCompanies.filter(company => {
            return company.symbol.match(tempPattern) || company.name.match(tempPattern);
          });
          this.currentPage = 0;
        }
        this.visibleCompanies = tempCompanies.slice(
            this.currentPage * this.companiesPerPage,
            (this.currentPage * this.companiesPerPage) + this.companiesPerPage
        );
      },
      updateSearchPattern(newPattern) {
        this.searchPattern = newPattern;
      }
    }
  }
</script>