<template>
  <div class="container" style="width: 50%; margin: 0">
    <article class="article">
      <h4 class="heading pl-0">{{ translation.ShippDetai_2_314 }}</h4>
    </article>
    <a-card :bordered="false" class="default-card grey-card">
      <dl class="ant-row common-detail">
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
            {{ moment(String(shipment.deliveryAt)).format('dddd DD MM YYYY') }}
          </dd>
        </div>
        <div class="ant-col-24 d-flex">
          <dt>{{ translation['ReceiNote:_2_334'] }}</dt>
          <dd>{{ shipment.notes }}</dd>
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
  methods: { isEmpty, getMomentByStandardFormat },
}
</script>
<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.grey-card > .ant-card-body > .common-detail {
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
}
</style>
