<template>
  <a-card :bordered="false" class="default-card">
    <div v-if="treatment.isHold" class="text-center">
      <h2 class="pb-5">
        The treatment is on pause state. At
        {{
          actionResult.createdAt !== null
            ? getDateTime(actionResult.createdAt)
            : 'N/A'
        }}
      </h2>
      <h3>Reason : {{ actionResult.notes }}</h3>
    </div>
    <!-- <a-alert
      v-if="treatment.isHold"
      :message="
        'The treatment is on pause state.  At ' +
        moment(actionResult.createdAt).format('do MMMM YYYY hh:mm')
      "
      :description="'Reason: ' + actionResult.notes + ' '"
      type="success"
    ></a-alert> -->
    <div v-if="treatment.isCancel" class="text-center">
      <h2 class="pb-5">
        The treatment is cancel pause state. At
        {{
          actionResult.createdAt !== null
            ? getDateTime(actionResult.createdAt)
            : 'N/A'
        }}
      </h2>
      <h3>Reason : {{ actionResult.notes }}</h3>
    </div>
    <!-- <a-alert
      v-if="treatment.isCancel"
      :message="
        'The treatment is on cancel state.  At ' +
        moment(actionResult.createdAt).format('do MMMM YYYY hh:mm')
      "
      :description="'Reason: ' + actionResult.notes + ' '"
      type="success"
    ></a-alert> -->
    <div v-if="!treatment.isSchedule && treatment.phaseId < 3">
      <alert message="Treatment has not been scheduled yet." />
    </div>
    <div v-else-if="treatment.isSchedule && treatment.phaseId < 4">
      <alert
        message="Manufacturer has not approved the treatment request yet."
      />
    </div>
    <div v-else-if="!isEmpty(bags)">
      <a-tabs
        :active-key="activeTab"
        type="card"
        class="bags_section"
        @change="onTabChange"
      >
        <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
          <Steps class="view-screen" :bag="bag" :treatment="treatment" />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div v-else class="text-center">
      <h2 class="pb-5">{{ translation.Creatsampl_7_489 }}</h2>
    </div>
  </a-card>
</template>
<script>
import moment from 'moment'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import TreatmentLogServices from '~/services/API/TreatmentLogServices'
import Steps from '~/components/treatment/view/Steps'
import { isEmpty } from '~/services/Utilities'
import alert from '~/components/alert'

export default {
  components: {
    Steps,
    alert,
  },
  props: {
    treatment: { required: true, type: Object },
    // bags: { required: true, type: Object },
  },
  data() {
    return {
      moment,
      activeTab: null,
      showCompleteBag: true,
      bags: null,
      actionResult: {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchBags()
    this.getTreatmentAction()
  },
  methods: {
    fetchBags() {
      TreatmentBagServices.get({ treatmentId: this.treatment.id }).then(
        (bags) => {
          this.bags = bags.data

          if (!isEmpty(this.bags)) {
            this.onTabChange(this.bags[0].id)
          }
        }
      )
    },
    getTreatmentAction() {
      TreatmentLogServices.GetLastActionByTreatmentId(this.treatment.id).then(
        (response) => {
          this.actionResult = response.data
        }
      )
    },
    getDateTime(date) {
      return moment(date).format('do MMMM YYYY hh:mm')
    },
    isEmpty,
    onTabChange(bagId) {
      this.activeTab = bagId
    },
  },
}
</script>
