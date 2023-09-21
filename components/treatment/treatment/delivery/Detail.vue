<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading ">{{translation.TreatRecei_2_326}}</h4>
      </article>
      <dl v-if="!isEmpty(shipment)" class="ant-row common-detail">
        <a-row>
          <a-col :span="12">
            <span>{{ translation.IsRecei_2_328 }}</span>
          </a-col>
          <a-col :span="12">
            <span class="text-success" style="color: green">
              <a-icon
                v-if="!isEmpty(shipment)"
                type="check-circle"
                style="color: green"
              />
              {{ translation.Done_1_340 }}
            </span>
          </a-col>
        </a-row>
        <a-row class="mt-15">
          <a-col :span="12">{{ translation['Receiby:_2_330'] }}</a-col>
          <a-col :span="12">{{ shipment.receiverName }}</a-col>
        </a-row>
        <a-row class="mt-15">
          <a-col :span="12">{{ translation['ReceiDate:_2_332'] }}</a-col>
          <a-col :span="12">{{ getDateFormat(shipment.deliveryAt) }}</a-col>
        </a-row>
        <a-row class="mt-15">
          <a-col :span="12">{{ translation['ReceiNote:_2_334'] }}</a-col>
          <a-col :span="12">{{ shipment.receivingNote }}</a-col>
        </a-row>
         <!-- moment(String(shipment.deliveryAt)).format('DD/MM/YYYY') -->
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
