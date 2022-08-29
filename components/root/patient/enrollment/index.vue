<template>
  <div>
    <a-skeleton :loading="loading" class="green-on-update">
      <a-tabs tab-position="left" :active-key="activeTab" @change="tabChange">
        <a-tab-pane key="enrollment">
          <div
            slot="tab"
            class="tab-title main"
            :class="isCompleted(isCreated)"
          >
            {{ translation['PatieDetai_2_673'] }}
          </div>
          <enrollment
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="getTreatmentGlobalId"
          />
        </a-tab-pane>
        <a-tab-pane key="Consent" :disabled="!isCreated">
          <div
            slot="tab"
            class="tab-title main"
            :class="isCompleted(isCreated)"
          >
            {{ translation['Conse_1_677'] }}
          </div>
          <consent
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane
          key="Screening"
          :disabled="
            !isEmpty(treatment) &&
            treatment.phaseId > TREATMENT_PHASES.CONSENT.id
          "
        >
          <div
            slot="tab"
            :class="
              isCompleted(
                !isEmpty(treatment) &&
                  treatment.phaseId >= TREATMENT_PHASES.SCREENING.id
              )
            "
            class="tab-title main"
          >
            {{ translation['Scree_1_679'] }}
            <pre></pre>
          </div>
          <screening
            :treatment="treatment"
            @getNextTab="getNextTab"
            @getTreatment="updateTreatment"
          />
        </a-tab-pane>
        <a-tab-pane key="Scheduling" :disabled="!isScreeningDone">
          <div
            slot="tab"
            class="tab-title main"
            :class="isCompleted(treatment.screeningStatus)"
          >
            {{ translation['Sched_1_681'] }}
          </div>
          <scheduling
            v-if="!isEmpty(treatment)"
            :treatment="treatment"
            :rejection="rejectedData"
          />
        </a-tab-pane>
      </a-tabs>
    </a-skeleton>
  </div>
</template>

<script>
import enrollment from '~/components/patient/enrollment/Form'
import consent from '~/components/treatment/enrollment/Consent'
import screening from '~/components/treatment/enrollment/screening'
import scheduling from '~/components/treatment/enrollment/scheduling'
import { isEmpty } from '~/services/Utilities'
import TreatmentServices from '~/services/API/TreatmentServices'
import PatientServices from '~/services/API/PatientServices'
import notifications from '~/mixins/notifications'
import tabsHelpers from '~/mixins/tabs-helpers'
import nullHelper from '~/mixins/null-helpers'
import { TREATMENT_PHASES } from '~/services/Constant/Phases.js'
export default {
  components: {
    enrollment,
    consent,
    scheduling,
    screening,
  },
  mixins: [notifications, tabsHelpers, nullHelper],
  data() {
    return {
      activeTab: 'enrollment',
      treatment: {},
      isCreated: false,
      visible: false,
      rejectedData: [],
      haveTreatment: false,
      loading: true,
      isScreeningDone: false,
      TREATMENT_PHASES,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.isTreatmentCreate()
    this.handleActiveTab()
    this.isPatientCreated()
  },
  methods: {
    handleActiveTab() {
      if (this.$route.query.view) {
        this.activeTab = this.$route.query.view
      }
    },
    isPatientCreated() {
      const globalId = this.$route.params.id

      if (this.isGuid(globalId)) {
        this.entityId = globalId
        this.fetchPatient(globalId)
      }
    },
    fetchPatient(id) {
      this.loading = true
      PatientServices.getById(id)
        .then((response) => {
          this.patient = response.data
          this.isCreated = true
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    isTreatmentCreate() {
      const query = this.$route.query
      this.loading = true
      if (!isEmpty(this.$route.query) && !isEmpty(query.treatment_id)) {
        this.fetch(query.treatment_id)
      } else {
        this.loading = false
      }
    },
    fetch(treatmentId) {
      this.loading = true
      TreatmentServices.detail(treatmentId)
        .then((response) => {
          this.updateTreatment(response.data)
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
      TreatmentServices.schedule(treatmentId, 1)
        .then((response) => {
          this.rejectedData = response.data
          // eslint-disable-next-line eqeqeq
          if (this.rejectedData.length != 0) {
            this.visible = true
          }
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
    updateTreatment(treatment) {
      this.treatment = treatment
      if (treatment.phaseId !== 1) {
        this.isScreeningDone = true
      }
    },
    getTreatmentGlobalId(treatment) {
      this.treatment = treatment
    },
    tabChange(key) {
      this.activeTab = key
    },
    getNextTab(key) {
      this.tabChange(key)
    },
    // isCompleted(flag) {
    //   return flag ? 'ant-tabs-tab-completed' : ''
    // },
    handleCancel() {
      this.visible = false
    },
  },
}
</script>
