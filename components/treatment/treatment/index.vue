<template>
  <a-skeleton :loading="isEmpty(schedule)">
    <article class="article">
        <h4 class="heading pl-0">{{translation.TreatDeliv_2_1007}}</h4>
    </article>
    <a-row class="grey-card">
      <a-col :span="12">
        <pickup-detail :scheduling="schedule" :shipment="pickupShipment"
      /></a-col>
      <a-col :span="1"></a-col>
      <a-col :span="11">
        <delivery-detail :scheduling="schedule" :shipment="deliveryShipment"
      /></a-col>
    </a-row>
  </a-skeleton>
</template>
<script>
import withFetch from '~/mixins/with-fetch'
import shipmentHelpers from '~/mixins/shipment-helpers'
import pickupDetail from '~/components/treatment/treatment/pickup/Detail'
import deliveryDetail from '~/components/treatment/treatment/delivery/Detail'
import SchedulingServices from '~/services/API/SchedulingServices'

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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    fetch(id) {
      SchedulingServices.getDetailByTreatmentOut(this.treatment.id)
        .then((response) => {
          this.schedule = response.data
        })
        .then(() => {
          this.markShipmentFlags()
        })
    },
  },
}
</script>
