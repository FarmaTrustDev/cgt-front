<template>
  <div>
    <span v-if="treatment.isHold === true | treatment.isCancel === true">
                <a-alert
            v-if="treatment.isHold == true"
            type="error"
            message="Treatment has been paused"
          />
          <a-alert
            v-if="treatment.isCancel == true"
            type="error"
            message="Treatment has been cancelled"
          />
    </span>
    <span v-else>
    <manufactureCollection
      v-if="
        treatment.phaseId >= TREATMENT_PHASES.MANUFACTURER_SAMPLE_COLLECTION.id
      "
      :treatment="treatment"
      show-complete-btn="manufacturerCollectionStatus"
      @completeAllBag="completeAllBag"
    />
    <alert v-else message="Shipment is not being shedule yet by the Clinic for this treatment.
     This treatment will be available once the hospital has done the shipment" />
  </span>
  </div>
</template>
<script>
import { TREATMENT_PHASES } from '~/services/Constant/Phases.js'
import manufactureCollection from '~/components/treatment/collections/manufacturer'
import TreatmentServices from '~/services/API/TreatmentServices'
import alert from '~/components/alert'
export default {
  components: { manufactureCollection, alert },
  props: {
    treatment: { type: Object, required: true },
  },
  data() {
    return { TREATMENT_PHASES }
  },
  computed: {
    translation() {
        return this.$store.getters.getTranslation
    },
  },  
  methods: {
    completeAllBag(bags) {
      TreatmentServices.markManufacturerCollection(this.treatment.id).then(
        (response) => {
          this.$emit('fetchTreatment', this.treatment.globalId)
          // this.$nuxt.$emit(
          //   EVENT_FETCH_TREATMENT_DETAIL,
          //   this.treatment.globalId
          // )
        }
      )
    },
  },
}
</script>
