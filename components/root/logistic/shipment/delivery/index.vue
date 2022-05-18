<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="Received by*:"
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
            label="Pickup Date Time:"
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
              :format="DEFAULT_DATE_TIME_FORMAT"
              :disabled-date="disabledDate"
              style="width: 100%"
              size="large"
              :show-time="{ defaultValue: _getTodayMoment() }"
            >
            </a-date-picker> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            label="Receiving Notes:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-textarea
              v-decorator="[
                'ReceivingNotes',
                {
                  rules: [],
                },
              ]"
              placeholder="Receiving Notes:"
            /> </a-form-item
        ></a-col>
        <a-col :span="24"
          ><FormActionButton :loading="loading" custom-text="Save & Continue"
        /></a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import {
  _getTodayMoment,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
import { DEFAULT_DATE_TIME_FORMAT } from '~/services/Constant/DateTime'
import ShipmentServices from '~/services/API/ShipmentServices'
import notifications from '~/mixins/notifications'
export default {
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
      DEFAULT_DATE_TIME_FORMAT,
    }
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          ShipmentServices.deliveryCreate(this.scheduling.id, values)
            .then((response) => {
              this.success(response.message)
              this.$emit('onCreate', response)
            })
            .catch(this.error)
        }
      })
    },
    _getTodayMoment,
  },
}
</script>
