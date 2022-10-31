<template>
  <div class="container logistic-shipping-detail">
    <article class="article">
      <h4 class="heading pl-0">Delivery {{ translation.ShippDetai_2_314 }}</h4>
    </article>
    <a-card :bordered="false" class="default-card grey-card ship-cards-body">
        <dl class="ant-row common-detail">
          <h2 class="heading">Shipping Details</h2>
          <div class="ant-col-24 d-flex">
            <dt>Dispatch Date:</dt>
            <dd>{{getDateFormat(scheduling.pickupDateTime)}}</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>Carrier Status:</dt>

            <dd v-if="!isEmpty(shipment)">Completed</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation.EstimArriv_3_322 }}</dt>
            <dd>{{getDateFormat(scheduling.deliveryDate)}}</dd>
          </div>
        </dl>
      <dl class="ant-row common-detail">
        <h2 class="heading">Treatment Receive</h2>
        <div class="ant-col-24 d-flex">
          <dt>{{ translation.IsRecei_2_328 }}</dt>
          <dd class="text-success">
            <a-icon v-if="!isEmpty(shipment)" type="check-circle" />
            {{ translation.Done_1_340 }}
          </dd>
        </div>
        <div class="ant-col-24 d-flex">
          <dt>{{ translation['Receiby:_2_330'] }}</dt>
          <dd>{{ shipment.receiverName }}</dd>
        </div>
        <div class="ant-col-24 d-flex">
          <dt>{{ translation['ReceiDate:_2_332'] }}</dt>
          <dd>
            {{ moment(String(shipment.deliveryAt)).format('DD/MM/YYYY') }}
          </dd>
        </div>
        <div class="ant-col-24 d-flex">
          <dt>{{ translation['ReceiNote:_2_334'] }}</dt>
          <dd>{{ shipment.receivingNote }}</dd>
        </div>
      </dl>
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
        scheduling: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return {
      moment,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: { isEmpty, getMomentByStandardFormat,
      getDateFormat(date) {
      return moment(String(date)).format('DD/MM/YYYY')
    },
  },
}
</script>
<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
div.d-flex {
  line-height: 1.7rem;
}
.d-flex > dt {
  font-weight: 700 !important;
}
.d-flex > dd{
  color: #000 ;
}
.grey-card > .ant-card-body > .common-detail {
  background-color: #fff;
  border-radius: 20px;
  padding: 13px;
  padding-bottom: 25px !important;
  width: 47.7%;
  margin: auto;
  margin-top: 0 !important;
}
</style>
