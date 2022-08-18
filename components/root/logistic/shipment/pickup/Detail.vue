<template>
  <div class="container">
    <a-card v-if="!isEmpty(shipment)" :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ translation.ShippDetai_2_314 }}</h4>
      </article>
      <div class="grey-card d-flex">
        <dl class="ant-row common-detail">
          <div class="ant-col-24 d-flex">
            <dt>{{ translation.LogisProvi_2_380 }}</dt>
            <dd>{{ scheduling.logisticName }}</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation['SamplColle_3_518'] }}:</dt>

            <dd>{{ getDateFormat(scheduling.collectionDate) }}</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation['ExpecDeliv_3_388'] }}</dt>
            <dd>{{ getDateFormat(scheduling.deliveryDate) }}</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation.EstimArriv_3_322 }}</dt>
            <dd>{{ getDateFormat(scheduling.deliveryDate) }}</dd>
          </div>
        </dl>

        <dl class="ant-row common-detail">
          <div class="ant-col-24 d-flex">
            <dt>{{ translation['Handlby:_2_384'] }}</dt>
            <dd>{{ shipment.senderName }}</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation['Colleby:_2_390'] }}</dt>
            <dd>{{ shipment.logisticUserName }}</dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation['PickuDate:_2_386'] }}</dt>
            <dd>
              {{ moment(String(shipment.pickupAt)).format('dddd DD MM YYYY') }}
            </dd>
          </div>
          <div class="ant-col-24 d-flex">
            <dt>{{ translation['PickuLocat_2_792'] }}</dt>
            <dd>{{ shipment.origin }}</dd>
          </div>
        </dl>
      </div>
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
<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
}
.grey-card > .common-detail {
  background-color: #fff;
  width: 49.7%;
  padding: 10px;
  border-radius: 20px;
}
</style>
