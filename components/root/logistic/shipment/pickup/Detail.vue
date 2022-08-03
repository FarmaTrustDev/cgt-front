<template>
  <div>
    <a-card v-if="!isEmpty(shipment)" :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <dl class="ant-row common-detail">
        <dt>Logistics Provider</dt>
        <dd>{{ scheduling.logisticName }}</dd>
        <dt>Sample Collection Date:</dt>
        <dd>{{ getDateFormat(scheduling.collectionDate) }}</dd>
        <dt>Expected Delivery Date</dt>
        <dd>{{ getDateFormat(scheduling.deliveryDate) }}</dd>
        <dt>{{ translation.EstimArriv_3_322 }}</dt>
        <dd>{{ getDateFormat(scheduling.deliveryDate) }}</dd>
      </dl>

      <dl class="ant-row common-detail">
        <dt>Handled by:</dt>
        <dd>{{ shipment.senderName }}</dd>
        <dt>Collected by:</dt>
        <dd>{{ shipment.logisticUserName }}</dd>
        <dt>Pickup At</dt>
        <dd>{{ moment(String(shipment.pickupAt)).format('dddd DD MM YYYY') }}</dd>
        <dt>Pickup Location:</dt>
        <dd>{{ shipment.origin }}</dd>
      </dl>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
import { isEmpty } from '~/services/Utilities'
export default {
  props: {
    heading: { default: 'Shipping Details', require: true, type: String },
    shipment: {
      default: () => {},
      require: true,
      type: Object,
    },
    scheduling: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return { moment }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    getMomentByStandardFormat,
    isEmpty,
    getDateFormat(date) {
      return moment(String(date)).format('dddd DD MM YYYY')
    },
  },
}
</script>
