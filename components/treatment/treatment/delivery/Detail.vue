<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading ">{{translation.TreatRecei_2_326}}</h4>
      </article>
      <dl v-if="!isEmpty(shipment)" class="ant-row common-detail">
        <dt>{{ translation.IsRecei_2_328 }}</dt>
        <dd class="text-success" style="color: green">
          <a-icon
            v-if="!isEmpty(shipment)"
            type="check-circle"
            style="color: green"
          />
          {{ translation.Done_1_340 }}
        </dd>
        <dt>{{ translation['Receiby:_2_330'] }}</dt>
        <dd>{{ shipment.receiverName }}</dd>
        <dt>{{ translation['ReceiDate:_2_332'] }}</dt>
        <dd>{{ getDateFormat(shipment.deliveryAt) }}</dd>
         <!-- moment(String(shipment.deliveryAt)).format('DD/MM/YYYY') -->
        <dt>{{ translation['ReceiNote:_2_334'] }}</dt>
        <dd>{{ shipment.notes }}</dd>
      </dl>
      <alert v-else message="Sample has not been Delivered by the logistic" />
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { isEmpty } from '~/services/Utilities'
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
export default {
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: { isEmpty, getMomentByStandardFormat,
  getDateFormat(date) {
      return moment(String(date)).format('DD/MM/YYYY')
    }, },
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
