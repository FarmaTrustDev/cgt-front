<template>
  <div>
    <!-- // DEtail view -->
    <span>
      <!-- <span v-if="isAccepted"> {{ modalMessage }}</span> -->
      <a-descriptions>
        <a-descriptions-item :label="translation.PatieID_2_264">
          {{ data.patientEnrollmentNumber }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" :label="translation['Colle-_4_268']">
          {{ data.collectionDateDeliveryDate }}
        </a-descriptions-item>
        <a-descriptions-item :label="translation.Hospi_1_47">
          {{ data.hospital.name }}
        </a-descriptions-item>
      </a-descriptions>
    </span>
    <!-- // DEtail view -->

    <a-form-item>
      <a-input
        v-decorator="[
          `schedulingId`,
          {
            rules: [
              { required: true, message: 'Please input your Patient Id!' },
            ],
            initialValue: data.id,
          },
        ]"
        type="hidden"
      ></a-input>
      <a-checkbox
        v-decorator="[
          `accepted`,
          {
            rules: [
              { required: true, message: 'Please input your Patient Id!' },
            ],
            initialValue: isAccepted,
            valuePropName: 'checked',
          },
        ]"
        class="d-none"
      />
    </a-form-item>
    <a-form-item v-if="!isAccepted" :label="translation.Notefor_3_292">
      <a-textarea
        v-decorator="[
          `reason`,
          {
            rules: [],
          },
        ]"
        :placeholder="translation.Typenote_3_294"
      ></a-textarea
    ></a-form-item>
    <a-form-item v-if="isAccepted && isManufacturer()" :label="translation.ProduLine_3_921">
      <a-select
        v-decorator="[
          `productionLineId`,
          {
            rules: [],
          },
        ]"
        :placeholder="translation.ProduLine_2_449"
      >
        <a-select-option
          v-for="productionLine in productionLines"
          :key="productionLine.id"
          >{{ productionLine.name }}</a-select-option
        >
      </a-select>
    </a-form-item>
  </div>
</template>
<script>
import ProductionLineServices from '~/services/API/ProductionLineServices'
import userDetail from '~/mixins/user-detail'
export default {
  mixins: [userDetail],
  props: {
    data: { type: Object, required: true },
    isAccepted: { type: Boolean, required: true },
  },
  data() {
    return {
      modalMessage: 'Are you sure you want to accept this treatment?',
      productionLines: [],
    }
  },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  mounted() {
    this.fetchProductionLine()
  },
  methods: {
    fetchProductionLine() {
      console.log(this.data)
      ProductionLineServices.get().then((productionLine) => {
        this.productionLines = productionLine.data
      })
    },
  },
}
</script>
