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
      <div class="self-start inline-grid gird-cols-2-auto gap-2">
        <label for="startDate" class="flex flex-col justify-center">Start Date:</label>
        <date-picker
            id="startDate"
            name="startDate"
            :initialDate="startDate"
            :max="maxStartDate"
            :min="minStartDate"
            @changeDate="updateStartDate($event)"
        />
        <label for="endDate" class="flex flex-col justify-center">End Date:</label>
        <date-picker
            id="endDate"
            name="endDate"
            :initialDate="endDate"
            :max="maxEndDate"
            :min="minEndDate"
            @changeDate="updateEndDate($event)"
        />
      </div>
      <line-chart
          v-if="showChart"
          :chart-data="chartData"
          :chart-options="chartOptions"
          :update-trigger="updateTrigger"
          class="flex-grow"
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
              yAxisID: 'price',
              backgroundColor: 'rgba(156, 163, 175, 0.4)',
              borderColor: 'rgb(0, 0, 0)',
              borderWidth: 2,
              pointBackgroundColor: 'rbg(0, 0, 0)',
              pointRadius: 2,
              data: []
            },
            {
              label: 'Volume Traded',
              yAxisID: 'volume',
              backgroundColor: 'rgba(156, 163, 175, 0.4)',
              borderColor: 'rgb(30, 58, 138)',
              borderWidth: 2,
              pointBackgroundColor: 'rbg(30, 58, 138)',
              pointRadius: 2,
              data: []
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                fontColor: 'rgb(0, 0, 0)',
                fontSize: 16,
                labelString: 'Time'
              }
            }],
            yAxes: [
              {
                id: 'price',
                position: 'left',
                scaleLabel: {
                  display: true,
                  fontColor: 'rgb(0, 0, 0)',
                  fontSize: 16,
                  labelString: 'Price'
                }
              },
              {
                id: 'volume',
                position: 'right',
                scaleLabel: {
                  display: true,
                  fontColor: 'rgb(0, 0, 0)',
                  fontSize: 16,
                  labelString: 'Volume'
                }
              }
            ]
          }
        },
        companySymbol: this.$route.params.symbol,
        companyName: '',
        endDate: dayjs().format('YYYY-MM-DD'),
        maxEndDate: dayjs().format('YYYY-MM-DD'),
        minStartDate: dayjs().subtract(20, "years").format('YYYY-MM-DD'),
        showChart: false,
        startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        timeSeries: {
          close: [],
          volume: []
        },
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
          .getStockTimeSeries(this.companySymbol)
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
        let closeData = AlphaVantage.sliceTimeSeries(this.timeSeries.close, this.startDate, this.endDate);
        let volumeData = AlphaVantage.sliceTimeSeries(this.timeSeries.volume, this.startDate, this.endDate);
        this.chartData.labels = closeData.labels;
        this.chartData.datasets[0].data = closeData.data;
        this.chartData.datasets[1].data = volumeData.data;
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