<template>
  <default-layout>
    <template v-slot:nav>
      <nav-link :route-to="{name: 'Home'}" link-text="FS"/>
    </template>
    <template v-slot:main>
      <div class="self-start inline-grid gird-cols-2-auto gap-2">
        <label>From: </label>
        <select
            v-model="fromCurrency"
            title="From"
            id="fromCurrency"
            name="fromCurrency"
            class="text-sm sm:text-lg bg-gray-200 border-2 border-black rounded p-0.5 m-0.5 focus:border-blue-900 hover:border-blue-900 ease-in-out"
        >
          <option
              v-for="currency in allCurrencies"
              :key="currency['currency code']"
              :value="currency['currency code']"
          >
            {{ `(${currency['currency code']}) ${currency['currency name']}` }}
          </option>
        </select>
        <label>To: </label>
        <select
            v-model="toCurrency"
            title="To"
            id="toCurrency"
            name="toCurrency"
            class="text-sm sm:text-lg bg-gray-200 border-2 border-black rounded p-0.5 m-0.5 focus:border-blue-900 hover:border-blue-900 ease-in-out"
        >
          <option
              v-for="currency in allCurrencies"
              :key="currency['currency code']"
              :value="currency['currency code']"
          >
            {{ `(${currency['currency code']}) ${currency['currency name']}` }}
          </option>
        </select>
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
  import DatePicker from "@/components/DatePicker";
  import DefaultLayout from "@/layouts/DefaultLayout";
  import LineChart from "@/components/LineChart";
  import NavLink from "@/components/NavLink";
  import AlphaVantage from "@/alpha-vantage";
  import dayjs from "dayjs";

  export default {
    name: "CurrencyGraph",
    components: {
      DatePicker,
      DefaultLayout,
      LineChart,
      NavLink
    },
    data: function () {
      return {
        allCurrencies: [],
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Closing Price',
              backgroundColor: 'rgba(30, 58, 138, 0.15)',
              borderColor: 'rgb(0, 0, 0)',
              borderWidth: 1,
              pointBackgroundColor: 'rbg(0, 0, 0)',
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
                fontSize: 16,
                labelString: 'Time'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 16,
                labelString: ''
              }
            }]
          }
        },
        endDate: dayjs().format('YYYY-MM-DD'),
        fromCurrency: 'GBP',
        maxEndDate: dayjs().format('YYYY-MM-DD'),
        minStartDate: dayjs().subtract(20, "years").format('YYYY-MM-DD'),
        showChart: false,
        startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        toCurrency: 'USD',
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
      },
      yAxisLabel() {
        return `${this.fromCurrency} to ${this.toCurrency}`;
      }
    },
    created() {
      this.chartOptions.scales.yAxes[0].scaleLabel.labelString = this.yAxisLabel;
      AlphaVantage.getAllCurrencies().then(results => {
        this.allCurrencies = results;
      });
      this.getData().then(() => {
        this.updateGraph();
        this.showChart = true;
      });
    },
    watch:{
      endDate() {
        this.updateGraph();
      },
      fromCurrency() {
        this.getData().then(() => this.updateGraph());
      },
      startDate() {
        this.updateGraph();
      },
      toCurrency() {
        this.getData().then(() => this.updateGraph());
      },
      yAxisLabel() {
        this.chartOptions.scales.yAxes[0].scaleLabel.labelString = this.yAxisLabel;
      },
    },
    methods: {
      getData() {
        return AlphaVantage
            .getCurrencyTimeSeries(this.fromCurrency, this.toCurrency)
            .then(data => this.timeSeries = data)
        ;
      },
      updateGraph() {
        let tempDate = dayjs(this.startDate);
        let lastData = null;
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