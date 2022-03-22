<template>
  <div class="home-page">
    <h1 class="title"><strong>My Dashboard</strong></h1>
    <a-card class="grey-card" :bordered="false">
      <a-row>
        <!-- left side tabs -->
        <a-col :span="9">
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/hospital/patients/create`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
              />
              <h4 class="heading-home">
                Check <strong class="strong">New Patient </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/hospital/patients`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
              />
              <h4 class="heading-home">
                Enroll <strong class="strong">Patient Status </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab with-arrow">
            <a href="javascript:;" @click="goto(`/users`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
              />
              <h4 class="heading-home">
                Manage <strong class="strong">Users </strong>
              </h4>
            </a>
          </div>
        </a-col>
        <!-- #end left side tabs -->
        <a-col :span="2"></a-col>
        <a-col :span="3"></a-col>
        <a-col :span="9">
          <a-card :bordered="false" class="home-stats-head">
            <a-card class="stats" :bordered="false">
              <a-row>
                <a-select
                  show-search
                  placeholder="Select Treatment Type"
                  option-filter-prop="children"
                  class="search-dropdown"
                >
                  <!-- //@todo Zulkarznain bhai task fetch from   api -->
                  <a-select-option selected value="jack">
                    Kymriah
                  </a-select-option>
                  <a-select-option value="lucy"> Yescarta </a-select-option>
                  <a-select-option value="tom"> Zolgenzma </a-select-option>
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
                  <span>100</span>
                  <br />
                  <span>Total Patients</span>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12" class="white-card">
                  <span class="completed"></span>
                  <span class="number">20</span>
                  <br />
                  <br />
                  <span>Total Completed</span>
                </a-col>
                <a-col :span="12" class="text-right white-card">
                  <span class="in-process"></span>
                  <span class="number">75</span>
                  <br />
                  <br />
                  <span>In Production</span>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12" class="white-card">
                  <span class="booked"></span>
                  <span class="number">20</span>
                  <br />
                  <br />
                  <span>Overall Booked</span>
                </a-col>
                <a-col :span="12" class="text-right white-card">
                  <span class="spoilage"></span>
                  <span class="number">20</span>
                  <br />
                  <br />
                  <span>Spoilage</span>
                </a-col>
              </a-row>
            </a-card>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import PatientsChart from '~/components/root/home/PatientsChart'
import UserServices from '~/services/API/UserServices'
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: { PatientsChart },
  mixins: [routeHelpers],
  data() {
    return {
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
            backgroundColor: ['#28ced9', '#2255c2', '#f4b71a', '#fa6363'],
            data: [1, 5, 3, 5],
          },
        ],
      },
    }
  },
  mounted() {},
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
    trigeer() {
      UserServices.test().then()
      // connection.invoke('AddTask', {
      //   id: 2,
      //   description: 'starting some thing',
      //   done: false,
      // })
    },
  },
}
</script>
