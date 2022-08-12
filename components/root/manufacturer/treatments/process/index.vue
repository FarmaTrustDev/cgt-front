<template>
  <div>
    <manufactureCollection
      v-if="
        treatment.phaseId >= TREATMENT_PHASES.MANUFACTURER_SAMPLE_COLLECTION.id
      "
      :treatment="treatment"
      show-complete-btn="manufacturerCollectionStatus"
      @completeAllBag="completeAllBag"
    />
    <alert v-else :message="translation.Collenot_4_572" />
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
