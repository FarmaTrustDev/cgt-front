<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <dl class="ant-row common-detail">
        <dt>{{translation.IsRecei_2_328}}:</dt>
        <dd class="text-success">
          <a-icon
            v-if="!isEmpty(shipment)"
            
            type="check-circle"
          />
          {{translation.Done_1_340}}
        </dd>
        <dt>{{translation['Receiby:_2_330']}}:</dt>
        <dd>{{ shipment.receiverName }}</dd>
        <dt>{{translation['ReceiDate:_2_332']}}:</dt>
        <dd>{{ getMomentByStandardFormat(shipment.deliveryAt) }}</dd>
        <dt>{{translation['ReceiNote:_2_334']}}:</dt>
        <dd>{{ shipment.notes }}</dd>
      </dl>
    </a-card>
  </div>
</template>

<script>
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  methods: { isEmpty, getMomentByStandardFormat },
}
</script>
