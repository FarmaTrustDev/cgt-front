<template>
  <div class="treatment-statistic">
    <a-card :bordered="false" class="home-stats-head">
      <a-card class="stats" :bordered="false">
        <a-row>
          <a-select
            show-search
            placeholder="Select Treatment Type"
            option-filter-prop="children"
            style="width: 100%"
            class="search-dropdown"
            @change="fetchStats"
            v-model="defaultValue"
          >
            <!-- //@todo Zulkarznain bhai task fetch from   api -->
            <a-select-option
              v-for="treatmentType in treatmentTypes"
              :key="treatmentType.id"             
            >
              <p style="margin-top:10px">{{ treatmentType.name }}</p>
            </a-select-option>
          </a-select>
        </a-row>
        <a-row>
          <a-col :span="6" class="chart-container">
            <PatientsChart
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
            <span>Total Patients</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="white-card">
            <span class="completed"></span>
            <span class="number">{{ chartDetail.completedTotal }}</span>
            <br />
            <br />
            <span>Total Completed</span>
          </a-col>
          <a-col :span="12" class="text-right white-card">
            <span class="in-process"></span>
            <span class="number">{{ chartDetail.productionTotal }}</span>
            <br />
            <br />
            <span>In Production</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="white-card">
            <span class="booked"></span>
            <span class="number">{{ chartDetail.total }}</span>
            <br />
            <br />
            <span>Overall Booked</span>
          </a-col>
          <a-col :span="12" class="text-right white-card">
            <span class="spoilage"></span>
            <span class="number">{{ chartDetail.spoilage }}</span>
            <br />
            <br />
            <span>Spoilage</span>
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
      chartDetail: {},
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
      defaultValue:1,
      completedTotal:0,
      productionTotal:0,
      total:0,
      spoilage:0,
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
      treatmentTypes: [],
    }
  },
  computed: {},
  mounted() {
    this.fetchTreatment()
  },
  methods: {
    fetchStats(id) {
      this.fetchTreatmentStats(id)
    },
    intializeData(detail){
      this.chartData.datasets[0].data[0]=detail.completedTotal
      this.chartData.datasets[0].backgroundColor[0]='#28ced9'
      this.chartData.datasets[0].data[1]=detail.productionTotal
      this.chartData.datasets[0].backgroundColor[1]='#2255c2'
      this.chartData.datasets[0].data[2]=detail.total
      this.chartData.datasets[0].backgroundColor[2]='#f4b71a'
      this.chartData.datasets[0].data[3]=detail.spoilage
      this.chartData.datasets[0].backgroundColor[3]='#fa6363'
    },
    fetchTreatmentStats(id) {
      StatisticsServices.treatment(id).then((response) => {
        this.chartDetail = response.data
        this.intializeData(this.chartDetail)
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
