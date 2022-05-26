<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card">
        <detail :treatment="entity" @fetchTreatment="fetchMethod" />
        <div class="grey-card m-0 pt-0">
          <TreatmentView
            v-if="!isEmpty(entity.patient) && entity.screeningStatus"
            :treatment="entity"
          />
          <a-card v-else class="text-center default-card p-0">
            <h2 class="m-0">Treatment type has not been selected yet</h2>
          </a-card>
        </div>
      </div>
    </template>
  </page-layout>
</template>

<script>
import detail from '~/components/treatments/details'
import PageLayout from '~/components/layout/PageLayout'
import withFetch from '~/mixins/with-fetch'
import TreatmentServices from '~/services/API/TreatmentServices'

import { EVENT_FETCH_TREATMENT_DETAIL } from '~/services/Constant/Events'
import TreatmentView from '~/components/treatment/view'
export default {
  components: { detail, 'page-layout': PageLayout, TreatmentView },
  mixins: [withFetch],
  middleware: 'auth',
  data() {
    return {
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
      bags: null,
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
      // TreatmentServices.getCustody(this.entity.id, 1).then((treatment) => {})
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
    chainOfCustody() {},
  },
}
</script>
