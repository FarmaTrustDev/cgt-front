<template>
  <div>
    <Create
      v-if="!isCreated"
      :treatment="treatment"
      @getNextTab="getNextTab"
      @getTreatment="getTreatment"
    />
    <CollectedList v-else :categories="categories" />
  </div>
</template>
<script>
import Create from '~/components/treatment/enrollment/screening/Create'
import CollectedList from '~/components/treatment/enrollment/screening/CollectedList'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
export default {
  components: { Create, CollectedList },

  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { categories: null, isCreated: false }
  },
  mounted() {
    this.isScreeningCompleted()
  },
  methods: {
    isScreeningCompleted() {
      if (this.treatment.screeningStatus) {
        this.isCreated = true
        this.fetchTreatmentScreening(this.treatment)
      }
    },
    fetchTreatmentScreening(treatment) {
      ScreeningCategoryServices.getByTreatmentId(treatment.id).then(
        (response) => {
          this.categories = response.data
        }
      )
    },
    getNextTab(data) {
      this.$emit('getNextTab', data)
    },
    getTreatment(data) {
      this.$emit('getTreatment', data)
    },
  },
}
</script>
