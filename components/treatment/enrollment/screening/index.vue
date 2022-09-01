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
import TreatmentServices from '~/services/API/TreatmentServices'
export default {
  components: { Create, CollectedList },
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      categories: null,
      isCreated: null,
      getTreatmentByParamId: [],
      treatmentParamId: {},
      loading: false,
    }
  },
  mounted() {
    this.isScreeningCompleted()
  },
  methods: {
    isScreeningCompleted() {
      this.treatmentParamId = this.$route.query.treatment_id
        this.fetch(this.treatmentParamId)
    },
    fetchTreatmentScreening(treatment) {
      ScreeningCategoryServices.getByTreatmentId(treatment.id)
        .then((response) => {
          this.categories = response.data
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    getNextTab(data) {
      this.$emit('getNextTab', data)
    },
    getTreatment(data) {
      this.$emit('getTreatment', data)
    },
      fetch(treatmentId) {
      TreatmentServices.detail(treatmentId)
        .then((response) => {
          this.getTreatmentByParamId = response.data
          if(this.getTreatmentByParamId.screeningStatus === true)
          {
            this.isCreated = true
            this.fetchTreatmentScreening(this.getTreatmentByParamId)
          }
        })
        .catch(this.error)
        .finally(() => {
        })
    }
  },  
}
</script>
