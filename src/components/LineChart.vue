<script>
  import {Line, mixins} from 'vue-chartjs';

  export default {
    name: "LineChart",
    extends: Line,
    mixins: [
      mixins.reactiveProp
    ],
    props: {
      chartOptions: Object
    },
    mounted() {
      this.renderChart(this.chartData, this.chartOptions);
    }
  }
</script>