<template>
  <div class="home-page">
    <a-card class="grey-card" :bordered="false">
      <a-row>
        <!-- left side tabs -->
        <a-col :span="9">
          <div class="home-tab">
            <a href="javascript:;" @click="goto(`/Logistic`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                {{translation.Check_1_454}} <strong class="strong">{{translation['new_1_276']}} {{translation['Patie_1_184']}} </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab with-arrow">
            <a href="javascript:;" @click="goto(`/users`)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg" width="120" height="100"
              />
              <h4 class="heading-home">
                {{translation.Manag_1_455}} <strong class="strong">{{translation.ManagUsers_2_17}} </strong>
              </h4>
            </a>
          </div>
        </a-col>
        <!-- #end left side tabs -->
        <a-col :span="2"></a-col>
        <a-col :span="3"></a-col>

        <a-col :span="9">
          <TimeCard />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import TimeCard from '~/components/datetime/TimeCard'
export default {
  components: { TimeCard },
  mixins: [routeHelpers, userDetail],
  data() {
    return {}
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
