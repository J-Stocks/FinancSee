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
        <date-picker
            id="startDate"
            name="startDate"
            :initialDate="startDate"
            :max="maxStartDate"
            @changeDate="updateStartDate($event)"
        />
        <label for="endDate" class="flex flex-col justify-center">End Date:</label>
        <date-picker
            id="endDate"
            name="endDate"
            :initialDate="endDate"
            :min="minEndDate"
            @changeDate="updateEndDate($event)"
        />
      </div>
      <line-chart
          v-if="showChart"
          :chart-data="chartData"
          :chart-options="chartOptions"
          :update-trigger="updateTrigger"
      />
      <p v-else class="h-full text-center text-3xl">Loading</p>
    </template>
  </default-layout>
</template>

<script>
  import AlphaVantage from "@/alpha-vantage";
  import DatePicker from "@/components/DatePicker"
  import DefaultLayout from "@/layouts/DefaultLayout";
  import LineChart from "@/components/LineChart";
  import NavLink from "@/components/NavLink";
  import dayjs from "dayjs";

  export default {
    name: "CompanyGraph",
    components: {
      DatePicker,
      DefaultLayout,
      LineChart,
      NavLink
    },
    data: function () {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Adjusted Close',
              data: []
            }
          ]
        },
        chartOptions: {
          maintainAspectRatio: false,
          responsive: true
        },
        companySymbol: this.$route.params.symbol,
        companyName: '',
        endDate: dayjs().format('YYYY-MM-DD'),
        showChart: false,
        startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        timeSeries: [],
        updateTrigger: true
      }
    },
    computed: {
      maxStartDate() {
        return dayjs(this.endDate).subtract(1, 'day').format('YYYY-MM-DD');
      },
      minEndDate() {
        return dayjs(this.startDate).add(1, 'day').format('YYYY-MM-DD');
      }
    },
    created() {
      AlphaVantage
          .getCompanyName(this.companySymbol)
          .then(name => this.companyName = name)
      ;
      AlphaVantage
          .getTimeSeries(this.companySymbol)
          .then(data => {
            this.timeSeries = data;
            this.updateGraph();
            this.showChart = true;
          })
      ;
    },
    watch:{
      endDate(){
        this.updateGraph();
      },
      startDate(){
        this.updateGraph();
      }
    },
    methods: {
      updateGraph() {
        let tempDate = dayjs(this.startDate);
        let lastData = 0;
        if (dayjs(this.startDate).isBefore(dayjs().subtract(20, 'years'))) {
          tempDate = dayjs().subtract(20, 'years')
        }
        this.chartData.labels.splice(0, this.chartData.labels.length);
        this.chartData.datasets[0].data.splice(0, this.chartData.datasets[0].data.length);
        while (tempDate.isBefore(dayjs(this.endDate)) && tempDate.isBefore(dayjs())) {
          this.chartData.labels.push(tempDate.format('YYYY-MM-DD'));
          if (this.timeSeries[tempDate.format('YYYY-MM-DD')]) {
            this.chartData.datasets[0].data.push(this.timeSeries[tempDate.format('YYYY-MM-DD')]);
            lastData = this.timeSeries[tempDate.format('YYYY-MM-DD')];
          } else {
            this.chartData.datasets[0].data.push(lastData);
          }
          tempDate = tempDate.add(1, 'day');
        }
        this.updateTrigger = !this.updateTrigger;
      },
      updateEndDate(newDate) {
        this.endDate = newDate;
      },
      updateStartDate(newDate) {
        this.startDate = newDate;
      }
    }
  }
</script>

<style scoped>
  .gird-cols-2-auto{
    grid-template-columns: auto auto;
  }
</style>