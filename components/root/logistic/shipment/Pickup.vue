<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
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
                rules: [{ required: true, message: 'Please input Handled by' }],
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
              'receiveName',
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
              'date',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            :format="DEFAULT_DATE_TIME_FORMATE"
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
              'location',
              {
                rules: [
                  { required: true, message: 'Please input Pickup location!' },
                ],
              },
            ]"
            placeholder="Pickup location"
          /> </a-form-item
      ></a-col>
    </a-form>
  </div>
</template>
<script>
import { _getTodayMoment } from '~/services/Helpers/MomentHelpers'
import { DEFAULT_DATE_TIME_FORMAT } from '~/services/Constant/DateTime'
export default {
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'pickupShipment',
      }),
      formLayout: 'vertical',
      DEFAULT_DATE_TIME_FORMAT,
    }
  },
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    },
    _getTodayMoment,
  },
}
</script>
