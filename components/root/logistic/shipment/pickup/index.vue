<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            :label="translation['Handlby:_2_384']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'senderName',
                {
                  rules: [
                    { required: true, message: 'Required' },
                  ],
                },
              ]"
              :placeholder="translation['Handlby:_2_384']"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            :label="translation['Colleby:_2_390']"
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
              :placeholder="translation['Colleby:_2_390']"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            :label="translation['PickuDate:_2_386']"
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
                      message: 'Please select your Pickup Date!',
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
            :label="translation.PickuLocat_2_792"
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
              :placeholder="translation.PickuLocat_2_792"
            /> </a-form-item
        ></a-col>
        <a-col :span="24"
          ><FormActionButton :loading="loading" :custom-text="translation['Save&_3_453']"
        /></a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import {
  _getTodayMoment,
  // _disabledPreviousDate,
  _disablePrevDateFromYesterday
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
        name: 'pickupShipment',
      }),
      formLayout: 'vertical',
      DEFAULT_DATE_TIME_FORMAT,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    disabledDate: _disablePrevDateFromYesterday,
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          ShipmentServices.pickupCreate(this.scheduling.id, values)
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
