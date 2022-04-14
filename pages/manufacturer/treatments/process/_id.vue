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
        <a-card :bordered="false" class="mt-15 default-card h-tabs">
          <a-tabs type="card">
            <a-tab-pane key="1" tab="Inbound Acceptance Details">
              <inbound-shipment :treatment="entity" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Manufacturing">
              <process :treatment="entity" @fetchTreatment="fetchTreatment" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="Outbound Shipment">
              <QrViewer :treatment="entity" />
              <scheduling-basic-request
                :treatment="entity"
                @fetchTreatment="fetchTreatment"
              />
            </a-tab-pane>
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
import QrViewer from '~/components/bags/Viewer'
import InboundShipment from '~/components/root/manufacturer/scheduling/shipment/Inbound'
import schedulingBasicRequest from '~/components/scheduling/request/BasicForm'
export default {
  components: {
    process,
    'page-layout': PageLayout,
    'profile-picture-and-detail': ProfilePictureCard,
    'inbound-shipment': InboundShipment,
    'scheduling-basic-request': schedulingBasicRequest,
    QrViewer,
  },
  mixins: [withFetch],
  middleware: 'auth',
  data() {
    return {
      loading: true,
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
    }
  },
  mounted() {},
  methods: {
    afterFetch(data) {
      this.loading = false
      // console.log(data)
    },
    fetchTreatment(treatmentId) {
      this.fetch(treatmentId)
    },
  },
}
</script>
