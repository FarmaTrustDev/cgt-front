<template>
  <div>
    <a-card v-if="!isEmpty(shipment)" :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">Sample Shipping Details</h4>
      </article>
      <dl class="ant-row common-detail">
        <dt>Dispatch Date:</dt>
        <dd>{{ scheduling.collectionDateDeliveryDate }}</dd>
        <dt>Carrier Status:</dt>
        <dd>-</dd>
        <dt>Estimated Arrival Date</dt>
        <dd>{{ getMomentByStandardFormat(scheduling.deliveryDate) }}</dd>
      </dl>
    </a-card>
  </div>
</template>

<script>
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
    return {}
  },
  methods: {
    getMomentByStandardFormat,
    isEmpty,
  },
}
</script>
