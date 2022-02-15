<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page"
    :create="false"
  >
    <template slot="content">
      <detail @fetchTreatment="fetchMethod" :treatment="entity" />
    </template>
  </page-layout>
</template>

<script>
import detail from '~/pages/hospital/details'
import PageLayout from '~/components/layout/PageLayout'
import withFetch from '~/mixins/with-fetch'
import TreatmentServices from '~/services/API/TreatmentServices'
import { EVENT_FETCH_TREATMENT_DETAIL } from '~/services/Constant/Events'

export default {
  components: { detail, 'page-layout': PageLayout },
  mixins: [withFetch],
  middleware: 'auth',
  data() {
    return {
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
    }
  },
  mounted() {
    this.registerFetchTreatment()
  },
  beforeDestroy() {
    this.$nuxt.$off(EVENT_FETCH_TREATMENT_DETAIL)
  },
  methods: {
    afterFetch(data) {
      // console.log(data)
    },
    fetchTreatment(id) {
      TreatmentServices.detail(id).then((treatment) => {
        this.entity = treatment.data
      })
    },
    registerFetchTreatment() {
      const fetchTreatment = this.fetchTreatment
      this.$nuxt.$on(EVENT_FETCH_TREATMENT_DETAIL, (id) => {
        fetchTreatment(id)
      })
    },
  },
}
</script>
