<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <div v-if="!isEmpty(shipment)">
      <a-row>
        <a-col :span="12" class="mt-15">
          <span class="text-muted">{{translation.IsRecei_2_328}}</span>
        </a-col>
        <a-col :span="12"  class="mt-15">
          {{translation.Done_1_340}}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="12" class="mt-15">
          <span class="text-muted">{{translation['Receiby:_2_330']}}</span>
        </a-col>
        <a-col :span="12" class="mt-15">
          {{ shipment.receiverName }}
        </a-col>        
      </a-row>          
      <a-row>
        <a-col :span="12" class="mt-15">
          <span class="text-muted">{{translation['ReceiDate:_2_332']}}</span>
        </a-col>
        <a-col :span="12" class="mt-15">
          {{ _getFormatMoment(getMomentByStandardFormat(shipment.deliveryAt)).format('DD/MM/YYYY') }}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="12" class="mt-15">
          <span class="text-muted">{{translation['ReceiNote:_2_334']}}</span>
        </a-col>
        <a-col :span="12" class="mt-15">
          {{ shipment.notes }}
        </a-col>        
      </a-row>
      </div>
      <alert v-else message="Sample has not been Delivered by the logistic" />
    </a-card>
  </div>
</template>

<script>
import { isEmpty } from '~/services/Utilities'
import { _getFormatMoment, getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: { isEmpty, getMomentByStandardFormat, _getFormatMoment, },
}
</script>
