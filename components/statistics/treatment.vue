<template>
  <div class="treatment-statistic">
    <a-card :bordered="false" class="home-stats-head grey-card-x">
      <a-card class="stats" :bordered="false">
        <a-row>
          <a-select
            show-search
            placeholder="Select Treatment Type"
            option-filter-prop="children"
            class="search-dropdown mt-15"
            @change="fetchStats"
            v-model="defaultValue"
          >
            <!-- //@todo Zulkarznain bhai task fetch from   api -->
            <a-select-option
              v-for="treatmentType in treatmentTypes"
              :key="treatmentType.id"
            >
              <p>{{ treatmentType.name }}</p>
            </a-select-option>
          </a-select>
        </a-row>
        <a-row>
          <a-col :span="6" class="chart-container">
            <PatientsChart
              v-if="loaded"
              ref="patients_chart"
              :chart-data="chartData"
              :options="options"
            >
            </PatientsChart>
          </a-col>
          <a-col :span="10" class="mr-5 chart-right-stats">
            <span class="vertical-line"></span>
            <span>{{ chartDetail.total }}</span>
            <br />
            <span>{{ translation['TotalPatie_2_460'] }}</span>
          </a-col>
        </a-row>
        <a-row class="mt-4 m-3">
          <a-col :span="12" class="white-card">
            <span class="completed"></span>
            <span class="number">{{ chartDetail.completedTotal }}</span>
            <br />
            <br />
            <span>{{ translation['TotalCompl_2_53'] }}</span>
          </a-col>
          <a-col :span="12" class="text-right white-card">
            <span class="in-process"></span>
            <span class="number">{{ chartDetail.productionTotal }}</span>
            <br />
            <br />
            <span>{{ translation['InProdu_2_57'] }}</span>
          </a-col>
        </a-row>
        <a-row class="mt-6 m-3">
          <a-col :span="12" class="white-card">
            <span class="booked"></span>
            <span class="number">{{ chartDetail.total }}</span>
            <br />
            <br />
            <span>{{ translation['OveraBooke_2_59'] }}</span>
          </a-col>
          <a-col :span="12" class="text-right white-card">
            <span class="spoilage"></span>
            <span class="number">{{ chartDetail.spoilage }}</span>
            <br />
            <br />
            <span>{{ translation['Spoil_1_61'] }}</span>
          </a-col>
        </a-row>
      </a-card>
    </a-card>
  </div>
</template>
<script>
import PatientsChart from '~/components/root/home/PatientsChart'
import TreatmentTypeServices from '~/services/API/TreatmentTypeServices'
import StatisticsServices from '~/services/API/StatisticsServices'
export default {
  components: { PatientsChart },
  data() {
    return {
      dynamicData: [],
      loaded:false,
      labsData: [
        { id: 1, name: 'Berlin-Cellfuse' },
        { id: 2, name: 'Vienna-Cellfuse R&D' },
        { id: 3, name: 'Gaithersburg-Cellfuse USA' },
      ],
      chartDetail: {},
      smartChartDetail: {
        total: 22,
        completedTotal: 5,
        productionTotal: 10,
        spoilage: 7,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false,
        },
        tooltips: {
          enabled: false,
        },
        cutoutPercentage: 65,
      },
      defaultValue: 1,
      completedTotal: 0,
      productionTotal: 0,
      total: 0,
      spoilage: 0,
      chartData: {
        labels: [],
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      smartChartData: {
        labels: [],
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        datasets: [
          {
            backgroundColor: ['#28ced9', '#2255c2', '#f4b71a', '#fa6363'],
            data: [5, 10, 22, 7],
          },
        ],
      },
      treatmentTypes: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchTreatment()
    window.dispatchEvent(new Event('resize'))
  },
  methods: {
    fetchStats(id) {
      this.fetchTreatmentStats(id)
    },
    intializeData(detail) {
      this.chartData.datasets[0].data[0] = detail.completedTotal
      this.chartData.datasets[0].backgroundColor[0] = '#28ced9'
      this.chartData.datasets[0].data[1] = detail.productionTotal
      this.chartData.datasets[0].backgroundColor[1] = '#2255c2'
      this.chartData.datasets[0].data[2] = detail.total
      this.chartData.datasets[0].backgroundColor[2] = '#f4b71a'
      this.chartData.datasets[0].data[3] = detail.spoilage
      this.chartData.datasets[0].backgroundColor[3] = '#fa6363'
    },
    fetchTreatmentStats(id) {
      this.loaded=false
      StatisticsServices.treatment(id).then((response) => {
        this.chartDetail = response.data
        this.intializeData(this.chartDetail)
        this.loaded=true
      })
    },
    fetchTreatment() {
      TreatmentTypeServices.get()
        .then((response) => {
          this.treatmentTypes = response.data
        })
        .then(() => {
          this.fetchTreatmentStats(this.treatmentTypes[0].id)
        })
    },
  },
}
</script>
