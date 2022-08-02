<template>
  <div>
    <a-card v-if="!isEmpty(shipment)" :bordered="false" class="default-card">
      <article class="article">
        <h6 class="heading pl-0">Sample Shipping Details</h6>
      </article>
      <dl class="ant-row common-detail">
        <dt>{{ translation.DispaDate_2_316 }}:</dt>
        <dd>{{ scheduling.collectionDateDeliveryDate }}</dd>
        <dt>{{ translation.CarriStatu_2_320 }}</dt>
        <dd>-</dd>
        <dt>{{ translation.EstimArriv_3_322 }}</dt>
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    getMomentByStandardFormat,
    isEmpty,
  },
}
</script>
<style scoped>
.common-detail > dt {
  width: 50%;
  display: inline;
  font-weight: bold;

  /* color: black; */
}
.common-detail > dd {
  display: inline-block;
  width: 50%;
  text-align: right;
  color: black;
  font-weight: bold;
}
</style>
