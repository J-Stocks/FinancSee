<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
      <nav-link :route-to="{name: 'CompanyDetails', symbol: companySymbol}" link-text="Profile"/>
      <nav-link :route-to="{name: 'CompanyGraph', symbol: companySymbol}" link-text="Prices"/>
    </template>
    <template v-slot:main>
      <div class="mb-2 flex flex-col-reverse md:flex-row md:justify-between">
        <p class="text-xl font-medium">{{ companyName }}</p>
        <p class="text-xl font-medium whitespace-nowrap">Symbol: {{ companySymbol }}</p>
      </div>
      <div>
        <label for="startDate">Start Date:</label>
        <input
            v-model="startDate"
            v-on:change="updateGraph"
            type="date"
            name="startDate"
            id="startDate"
        >
      </div>
      <div>
        <label for="endDate">End Date:</label>
        <input
            v-model="endDate"
            v-on:change="updateGraph"
            type="date"
            name="endDate"
            id="endDate"
        >
      </div>
      <div v-if="timeSeries">
        <p>Graph Goes Here</p>
      </div>
      <p v-else class="h-full text-center text-3xl">Loading</p>
    </template>
  </default-layout>
</template>

<script>
  import AlphaVantage from "@/alpha-vantage";
  import DefaultLayout from "@/layouts/DefaultLayout";
  import NavLink from "@/components/NavLink";
  import dayjs from "dayjs";

  export default {
    name: "CompanyGraph",
    components: {
      DefaultLayout,
      NavLink
    },
    data: function () {
      return {
        companySymbol: this.$route.params.symbol,
        endDate: dayjs().format('YYYY-MM-DD'),
        startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        timeSeries: null
      }
    },
    computed: {
      companyName() {
        return AlphaVantage.getCompanyName(this.companySymbol);
      }
    },
    mounted() {
      AlphaVantage
          .getTimeSeries(this.companySymbol)
          .then(response => response.json())
          .then(json => {
            this.timeSeries = json;
            this.updateGraph();
          })
          .catch(error => console.log('Error', error));
    },
    methods: {
      updateGraph: function () {
        console.log(`startDate: ${this.startDate}, endDate: ${this.endDate}`)
      }
    }
  }
</script>