<template>
  <div>
    <a-card :bordered="false" class="default-card pick-info">
      <article class="article">
        <h4 class="heading pl-0">{{ heading }}</h4>
      </article>
      <div v-if="!isEmpty(shipment)">
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Logistics Provider</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{ scheduling.logisticName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Sample Collection Date:</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{
              _getFormatMoment(
                getMomentByStandardFormat(scheduling.collectionDate)
              ).format('DD/MM/YYYY')
            }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Expected Delivery Date:</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{
              _getFormatMoment(
                getMomentByStandardFormat(scheduling.deliveryDate)
              ).format('DD/MM/YYYY')
            }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">{{ translation.EstimArriv_3_322 }}</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{
              _getFormatMoment(
                getMomentByStandardFormat(scheduling.deliveryDate)
              ).format('DD/MM/YYYY')
            }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Handled by:</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{ shipment.senderName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Collected by:</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{ shipment.logisticUserName }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Pickup At:</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{
              _getFormatMoment(
                getMomentByStandardFormat(shipment.pickupAt)
              ).format('DD/MM/YYYY')
            }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" class="mt-15">
            <span class="text-muted">Pickup Location:</span>
          </a-col>
          <a-col :span="12" class="mt-15 text-right">
            {{ shipment.origin }}
          </a-col>
        </a-row>
      </div>
      <alert v-else message="Sample has not been picked by the logistic" />
    </a-card>
  </div>
</template>

<script>
import {
  _getFormatMoment,
  getMomentByStandardFormat,
} from '~/services/Helpers/MomentHelpers'
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    getMomentByStandardFormat,
    _getFormatMoment,
    isEmpty,
  },
}
</script>
