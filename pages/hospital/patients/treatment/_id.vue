<template>
  <page-layout
    :title="translation.TreatStatu_2_748"
    class="patient-page container"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card treat-body">
        <detail :treatment="entity" @fetchTreatment="fetchMethod" />
        <div class="grey-card treatment_tabs m-0 pt-0" style="padding: 0">
          <TreatmentView
            v-if="!isEmpty(entity.patient) && entity.screeningStatus"
            :loading="loading"
            :treatment="entity"
          />
          <a-card v-else class="text-center default-card p-0">
            <h2 class="pb-5">{{translation.Treattype_7_477}}</h2>
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
  components: { detail, 'page-layout': PageLayout, 
  TreatmentView
   },
  mixins: [withFetch],
  middleware: 'auth',
  data() {
    return {
      loading: false,
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
      bags: null,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
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
      this.loading = true
      TreatmentServices.detail(id).then((treatment) => {
        this.entity = treatment.data
      })
      this.loading = false
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
