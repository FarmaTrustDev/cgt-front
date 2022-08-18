<template>
  <div>
    <a-card v-if="!isEmpty(shipment)" :bordered="false"  >
      
      <th>QrUrl</th>
      <th>Puid</th>
      <tr v-for="(bag, index) in scheduling.treatmentBag" :key="index">
        <td><img :src="getImageUrl(bag.qrUrl)" width="65px" /></td>
        <td>{{bag.puid}}</td>
      </tr>
    </a-card>
    <a-card v-if="!isEmpty(shipment)" :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ translation.ShippDetai_2_314 }}</h4>
      </article>
      <dl class="ant-row common-detail">
        <dt>{{translation.LogisProvi_2_380}}</dt>
        <dd>{{ scheduling.logisticName }}</dd>
        <dt>{{translation['SamplColle_3_518']}}:</dt>
        <dd>{{ getDateFormat(scheduling.collectionDate) }}</dd>
        <dt>{{translation['ExpecDeliv_3_388']}}</dt>
        <dd>{{ getDateFormat(scheduling.deliveryDate) }}</dd>
        <dt>{{ translation.EstimArriv_3_322 }}</dt>
        <dd>{{ getDateFormat(scheduling.deliveryDate) }}</dd>
      </dl>

      <dl class="ant-row common-detail">
        <dt>{{translation['Handlby:_2_384']}}</dt>
        <dd>{{ shipment.senderName }}</dd>
        <dt>{{translation['Colleby:_2_390']}}</dt>
        <dd>{{ shipment.logisticUserName }}</dd>
        <dt>{{translation['PickuDate:_2_386']}}</dt>
        <dd>{{ moment(String(shipment.pickupAt)).format('dddd DD MM YYYY hh:mm') }}</dd>
        <dt>{{translation['PickuLocat_2_792']}}</dt>
        <dd>{{ shipment.origin }}</dd>
      </dl>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Utilities'
export default {
  mixins:[imagesHelper],
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
    return { moment, 
    url: null
    }
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
    getUrl(url)
    {
      this.url = url
      return this.url
    }
  },
}
</script>
