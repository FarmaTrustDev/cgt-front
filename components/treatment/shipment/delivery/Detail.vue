<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <div v-if="!isEmpty(shipment)">
        <dl class="ant-row common-detail">
          <dt>Is Received:</dt>
          <dd class="text-success">
            <a-icon type="check-circle" />
            Done
          </dd>
          <dt>Received by:</dt>
          <dd>{{ shipment.receiverName }}</dd>
          <dt>Received Date:</dt>
          <dd>{{ getMomentByStandardFormat(shipment.deliveryAt) }}</dd>
          <dt>Receiving Note:</dt>
          <dd>{{ shipment.notes }}</dd>
        </dl>
      </div>
      <alert v-else message="Sample has not been Delivered by the logistic" />
    </a-card>
  </div>
</template>

<script>
import { isEmpty } from '~/services/Utilities'
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
import alert from '~/components/alert'
export default {
  components: { alert },
  props: {
    heading: { default: 'Shipping Details', require: true, type: String },
    shipment: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: { isEmpty, getMomentByStandardFormat },
}
</script>
