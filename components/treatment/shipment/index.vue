<template>
  <a-skeleton :loading="isEmpty(schedule)">
    <a-row :gutter="16">
      <a-col :span="12">
        <pickup-detail :scheduling="schedule" :shipment="pickupShipment" />
      </a-col>
      <a-col :span="12">
        <delivery-detail :scheduling="schedule" :shipment="deliveryShipment"
      /></a-col>
    </a-row>
  </a-skeleton>
</template>
<script>
import withFetch from '~/mixins/with-fetch'
import shipmentHelpers from '~/mixins/shipment-helpers'
import pickupDetail from '~/components/treatment/shipment/pickup/Detail'
import deliveryDetail from '~/components/treatment/shipment/delivery/Detail'
import SchedulingServices from '~/services/API/SchedulingServices'
import { isEmpty } from '~/services/Helpers'

export default {
  components: { pickupDetail, deliveryDetail },
  mixins: [withFetch, shipmentHelpers],
  props: {
    treatment: { type: Object, required: true },
  },
  data() {
    return {
      entity: {},
      pickupShipment: {},
      deliveryShipment: {},
      schedule: null,
    }
  },
  methods: {
    fetch(id) {
      SchedulingServices.getDetailByTreatment(this.treatment.id)
        .then((response) => {
          this.schedule = response.data
        })
        .then(() => {
          this.markShipmentFlags()
        })
    },
    isEmpty,
  },
}
</script>
