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
      <div class="inline-grid gird-cols-2-auto gap-2">
        <label for="startDate" class="flex flex-col justify-center">Start Date:</label>
        <date-picker id="startDate" name="startDate" :initialDate="startDate" @changeDate="updateStartDate($event)"/>
        <label for="endDate" class="flex flex-col justify-center">End Date:</label>
        <date-picker id="endDate" name="endDate" :initialDate="endDate" @changeDate="updateEndDate($event)"/>
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
  import DatePicker from "@/components/DatePicker"
  import DefaultLayout from "@/layouts/DefaultLayout";
  import NavLink from "@/components/NavLink";
  import dayjs from "dayjs";

  export default {
    name: "CompanyGraph",
    components: {
      DatePicker,
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
      updateGraph() {
        console.log(`startDate: ${this.startDate}, endDate: ${this.endDate}`)
      },
      updateEndDate(newDate) {
        this.endDate = newDate;
        this.updateGraph();
      },
      updateStartDate(newDate) {
        this.startDate = newDate;
        this.updateGraph()
      }
    }
  }
</script>

<style scoped>
  .gird-cols-2-auto{
    grid-template-columns: auto auto;
  }
</style>