<template>
  <a-skeleton :loading="loading">
    <Create
      v-if="isCreated"
      :treatment="treatment"
      :loading="loading"
      @getNextTab="getNextTab"
      @getTreatment="getTreatment"
    />
    <CollectedList  v-else :loading="loading" :treatment-type-name ="treatmentTypeName" :categories="categories" />
  </a-skeleton>
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
      isCreated: false,
      getTreatmentByParamId: [],
      treatmentParamId: {},
      loading: false,
      treatmentTypeName: ''
    }
  },
    watch:{
    treatment(newData, oldData)
    {
      if(newData !== oldData)
      {
        this.isScreeningCompleted()
      }
    }
  },
  mounted() {
    this.isScreeningCompleted()
  },
  methods: {
    isScreeningCompleted() {
      this.loading = true
      this.treatmentParamId = this.$route.query.treatment_id
        this.fetch(this.treatmentParamId)
        this.loading = false
    },
    fetchTreatmentScreening(treatment) {
      ScreeningCategoryServices.getByTreatmentId(treatment.id)
        .then((response) => {
          this.categories = response.data
          this.treatmentTypeName = this.categories[0].treatmentTypeName
        })
        .catch(this.error)
        
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
            this.isCreated = false
            this.fetchTreatmentScreening(this.getTreatmentByParamId)
          }
          else{
            this.isCreated = true
          }
        })
        .catch(this.error)
        .finally(() => {
        })
    }
  },  
}
</script>
