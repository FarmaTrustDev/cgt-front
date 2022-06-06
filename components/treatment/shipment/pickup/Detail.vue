<template>
  <div>
    <a-card :bordered="false" class="default-card">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <div v-if="!isEmpty(shipment)">
      <a-row>
        <a-col :span="8">
          Logistics Provider:
        </a-col>
        <a-col :span="8">
          {{ scheduling.logisticName }}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="8">
          Sample Collection Date:
        </a-col>
        <a-col :span="8">
          {{ scheduling.collectionDate }}
        </a-col>        
      </a-row>          
      <a-row>
        <a-col :span="8">
          Expected Delivery Date:
        </a-col>
        <a-col :span="8">
          {{ getMomentByStandardFormat(scheduling.deliveryDate) }}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="8">
          Estimated Arrival Date:
        </a-col>
        <a-col :span="8">
          {{ getMomentByStandardFormat(scheduling.deliveryDate) }}
        </a-col>        
      </a-row>                    
      <a-row>
        <a-col :span="8">
          Handled by:
        </a-col>
        <a-col :span="8">
          {{ shipment.senderName }}
        </a-col>        
      </a-row> 
      <a-row>
        <a-col :span="8">
          Collected by:
        </a-col>
        <a-col :span="8">
          {{ shipment.logisticUserName }}
        </a-col>        
      </a-row>
      <a-row>
        <a-col :span="8">
          Pickup At:
        </a-col>
        <a-col :span="8">
          {{ getMomentByStandardFormat(shipment.pickupAt) }}
        </a-col>        
      </a-row>      
      <a-row>
        <a-col :span="8">
          Pickup Location:
        </a-col>
        <a-col :span="8">
          {{ shipment.origin }}
        </a-col>        
      </a-row>
      </div>
      <alert v-else message="Sample has not been picked by the logistic" />
    </a-card>
  </div>
</template>

<script>
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
import { isEmpty } from '~/services/Utilities'
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
    scheduling: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: {
    getMomentByStandardFormat,
    isEmpty,
  },
}
</script>
