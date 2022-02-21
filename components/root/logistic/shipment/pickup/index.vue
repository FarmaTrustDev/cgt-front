<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="Handled by*:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'senderName',
                {
                  rules: [
                    { required: true, message: 'Please input Handled by' },
                  ],
                },
              ]"
              placeholder="Handled by"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            label="Collected by*:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'LogisticUserName',
                {
                  rules: [
                    { required: true, message: 'Please input Collected by!' },
                  ],
                },
              ]"
              placeholder="Handled by"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            label="Pickup Date Time:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-date-picker
              v-decorator="[
                'pickupAt',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Date of Birth!',
                    },
                  ],
                },
              ]"
              :format="DEFAULT_DATE_TIME_FORMAT"
              style="width: 100%"
              size="large"
              :show-time="{ defaultValue: _getTodayMoment() }"
            >
            </a-date-picker> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            label="Pickup location*:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-textarea
              v-decorator="[
                'origin',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Pickup location!',
                    },
                  ],
                },
              ]"
              placeholder="Pickup location"
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
import { _getTodayMoment } from '~/services/Helpers/MomentHelpers'
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
        name: 'pickupShipment',
      }),
      formLayout: 'vertical',
      DEFAULT_DATE_TIME_FORMAT,
    }
  },
  methods: {
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          ShipmentServices.pickupCreate(this.scheduling.id, values)
            .then((response) => {
              this.success(response.message)
            })
            .catch(this.error)
        }
      })
    },
    _getTodayMoment,
  },
}
</script>
