<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            :label="translation['Receiby:_2_330']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'ReceiverName',
                {
                  rules: [
                    { required: true, message: 'Please input Receiver by' },
                  ],
                },
              ]"
              placeholder="Received by"
            /> </a-form-item
        ></a-col>

        <a-col :span="12">
          <a-form-item
            :label="translation['PickuDate:_2_386']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-date-picker
              v-decorator="[
                'deliveryAt',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Delivery At!',
                    },
                  ],
                },
              ]"
              :format="STANDARD_UK_DATE_FORMAT"
              :disabled-date="disabledDate"
              style="width: 100%"
              size="large"
              :show-time="{ defaultValue: _getTodayMoment() }"
            >
            </a-date-picker> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            :label="translation['ReceiNote:_2_334']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-textarea
              v-decorator="[
                'ReceivingNote',
                {
                  rules: [],
                },
              ]"
              placeholder="Receive note"
            /> </a-form-item
        ></a-col>
        <a-col :span="24"
          ><FormActionButton :loading="loading" :custom-text="translation['Save&_3_453']"
        /></a-col>
      </a-row>
    </a-form>
    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
      >
        <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
  </div>
</template>
<script>
import {
  _getTodayMoment,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import ShipmentServices from '~/services/API/ShipmentServices'
import notifications from '~/mixins/notifications'
import Signature from '~/components/signature'
export default {
  components: { Signature },
  mixins: [notifications],
  props: {
    scheduling: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, {
        name: 'deliveryShipment',
      }),
      formLayout: 'vertical',
      STANDARD_UK_DATE_FORMAT,
      visibleSignature:false,
      deliveryData:{},
      
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.deliveryData=values
          this.visibleSignature = true
          /* ShipmentServices.deliveryCreate(this.scheduling.id, values)
            .then((response) => {
              this.success('Submitted successfully')
              this.$emit('onCreate', response)
            })
            .catch(this.error) */
        }
      })
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.delivery()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    delivery(){
      ShipmentServices.deliveryCreate(this.scheduling.id, this.deliveryData)
        .then((response) => {
          this.success('Submitted successfully')
          this.$emit('onCreate', response)
        })
        .catch(this.error)
    },
    _getTodayMoment,
  },
}
</script>
