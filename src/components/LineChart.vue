<script>
  import {Line, mixins} from 'vue-chartjs';

  export default {
    name: "LineChart",
    extends: Line,
    mixins: [
      mixins.reactiveProp
    ],
    mounted() {
      this.renderChart(this.chartData, this.options);
    }
  }
</script>