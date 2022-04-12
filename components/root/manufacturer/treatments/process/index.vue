<template>
  <div>
    <manufactureCollection
      :treatment="treatment"
      show-complete-btn="manufacturerCollectionStatus"
      @completeAllBag="completeAllBag"
    />
  </div>
</template>
<script>
import manufactureCollection from '~/components/treatment/collections/manufacturer'
import TreatmentServices from '~/services/API/TreatmentServices'
export default {
  components: { manufactureCollection },
  props: {
    treatment: { type: Object, required: true },
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
