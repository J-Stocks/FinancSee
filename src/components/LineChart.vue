<script>
  import {Line, mixins} from 'vue-chartjs';

  export default {
    name: "LineChart",
    extends: Line,
    mixins: [
      mixins.reactiveProp
    ],
    props: {
      chartOptions: Object,
      updateTrigger: Boolean
    },
    watch: {
      updateTrigger() {
        console.log(this.chartOptions);
        this.renderChart(this.chartData, this.chartOptions);
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.chartOptions);
    }
  }
</script>