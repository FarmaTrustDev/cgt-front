<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card">
        <profile-picture-and-detail :treatment="entity" />
        <a-card :bordered="false" class="mt-15 default-card">
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="Inbound Acceptance Details"> </a-tab-pane>
            <a-tab-pane key="2" tab="Manufacturing">
              <process :treatment="entity" @fetchTreatment="fetchTreatment" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="Outbound Shipment"> Content of Tab Pane 3 </a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import withFetch from '~/mixins/with-fetch'
import TreatmentServices from '~/services/API/TreatmentServices'
import ProfilePictureCard from '~/components/patient/profile/ProfileAndDetail'
import process from '~/components/root/manufacturer/treatments/process'
export default {
  components: {
    'page-layout': PageLayout,
    'profile-picture-and-detail': ProfilePictureCard,
    process,
  },
  mixins: [withFetch],
  middleware: 'auth',
  data() {
    return {
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
    }
  },
  mounted() {},
  methods: {
    afterFetch(data) {
      // console.log(data)
    },
    fetchTreatment(treatmentId) {
      this.fetch(treatmentId)
    },
  },
}
</script>
