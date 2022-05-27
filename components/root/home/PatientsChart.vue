<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'PatientsChart',
  extends: Doughnut,
  props:['chartData','options'],
  methods: {
    update() {
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    window.dispatchEvent(new Event('resize'));
  }
};
</script>