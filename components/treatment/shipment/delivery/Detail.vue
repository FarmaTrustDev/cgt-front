<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <div v-if="!isEmpty(shipment)">
      <a-row>
        <a-col :span="8">
          {{translation.IsRecei_2_328}}:
        </a-col>
        <a-col :span="8">
          {{translation.Done_1_340}}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="8">
          {{translation['Receiby:_2_330']}}:
        </a-col>
        <a-col :span="8">
          {{ shipment.receiverName }}
        </a-col>        
      </a-row>          
      <a-row>
        <a-col :span="8">
          {{translation['ReceiDate:_2_332']}}:
        </a-col>
        <a-col :span="8">
          {{ getMomentByStandardFormat(shipment.deliveryAt) }}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="8">
          {{translation['ReceiNote:_2_334']}}:
        </a-col>
        <a-col :span="8">
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
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
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
  methods: { isEmpty, getMomentByStandardFormat },
}
</script>
