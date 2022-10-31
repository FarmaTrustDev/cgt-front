<template>
  <div >
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h6 class="heading pl-0">{{translation.SamplShipp_3_517}}</h6>
      </article>
      <dl v-if="!isEmpty(shipment)" class="ant-row common-detail">
        <div class="ant-col-24 d-flex">
        <dt class="float-left">{{ translation.DispaDate_2_316 }}:</dt>
        <dd class="float-right">{{ scheduling.collectionDateDeliveryDate }}</dd>
        </div>
        <div class="ant-col-24 d-flex">
        <dt class="float-left">{{ translation.CarriStatu_2_320 }}</dt>
        <dd class="float-right">-</dd>
        </div>
        <div class="ant-col-24 d-flex">
        <dt class="float-left">Estimated Arrival Date:</dt>
        <dd class="float-right">{{getDateFormat(scheduling.deliveryDate)}}</dd>
        </div>
      </dl>
      <alert v-else :message="translation.Samplhas_8_571" />
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
    getDateFormat(date) {
      return moment(String(date)).format('DD/MM/YYYY')
    },
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
  width: 25%;
  text-align: right;
  color: black;
  font-weight: bold;
}
</style>
