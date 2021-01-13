<template>
  <default-layout>
    <template v-slot:nav>
      <router-link :to="{name: 'Home'}" class="w-full text-center">FinancSee</router-link>
    </template>
    <template v-slot:main>
      <div class="inline-flex mx-auto flex-col space-y-2 mb-2">
        <router-link
            :to="{name: 'CompanyIndex'}"
            class="text-3xl border-2 border-black rounded px-2 py-1 focus:border-blue-900 hover:border-blue-900 focus:outline-none ease-in-out">
          Companies
        </router-link>
        <router-link
            :to="{name: 'Currency'}"
            class="text-3xl border-2 border-black rounded px-2 py-1 focus:border-blue-900 hover:border-blue-900 focus:outline-none ease-in-out">
          Currencies
        </router-link>
      </div>
      <p class="mx-auto w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
        <span>
          FinancSee is a web application built by Joshua Stocks (u1757754) for the module Advanced Front-End Web
          Development (CHT2531) at the University of Huddersfield. FininacSee allows users to browse company
          profiles, stock prices and compare currency values using data provided by the
        </span>
        <a href="https://www.alphavantage.co/#about" class="underline hover:border-blue-900 focus:text-blue-900">Alpha Vantage</a>
        <span> public API.</span>
      </p>
    </template>
  </default-layout>
</template>

<script>
  import DefaultLayout from "@/layouts/DefaultLayout";

  export default {
    name: 'HomePage',
    components: {
      DefaultLayout
    }
  }
</script>
