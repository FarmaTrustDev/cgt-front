<template>
  <div>    
    <Create
      v-if="isScreeningCompleted()"
      :treatment="treatment"
      @getNextTab="getNextTab"
      @getTreatment="getTreatment"
    />
    <CollectedList :loading="loading" v-else :categories="categories" />
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
    return { categories: null, isCreated: null, getTreatmentByParamId: {}, treatmentParamId : {}, loading : false }
  },
  mounted() {
    this.isScreeningCompleted()
  },
  methods: {
    isScreeningCompleted() {
      debugger
      this.treatmentParamId = this.$route.query.treatment_id
      if (this.treatment.screeningStatus) {
        this.isCreated = true
        this.fetchTreatmentScreening(this.treatment)
      }
      this.fetch(this.treatmentParamId)
      if(this.treatmentParamId !== null && this.getTreatmentByParamId.screeningStatus === true)
      {
        this.isCreated = true
        this.fetchTreatmentScreening(this.getTreatmentByParamId)
      }
      if(this.isCreated === true)
      {
        this.loading = true
         return true
      }
      else
      {
        return false
      }
    },
    fetch(treatmentParamId) {
      debugger
      TreatmentServices.detail(treatmentParamId)
        .then((response) => {
          this.getTreatmentByParamId = response.data
          console.log(this.getTreatmentByParamId)
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
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
      debugger
      this.$emit('getTreatment', data)
    },
  },
}
</script>
