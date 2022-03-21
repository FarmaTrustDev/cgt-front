<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <LogisticLookup />

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Sample Collection Date" class="pb-0">
            <a-input
              v-decorator="[
                `treatmentId`,
                {
                  initialValue: treatment.id,
                },
              ]"
              type="hidden"
            />

            <a-input
              v-decorator="[
                `hospitalId`,
                {
                  initialValue: treatment.hospitalId,
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                `patientId`,
                {
                  initialValue: treatment.patientId,
                },
              ]"
              type="hidden"
            />
            <a-date-picker
              v-decorator="[
                'collectionDate',
                {
                  rules: [
                    {
                      required: true,
                      message:
                        'Please select your Delivery Arrival Date!',
                    },
                  ],
                },
              ]"
              :format="dateFormat"
              :disabled-date="disabledDate"
              style="width: 100%"
              size="large"
              @change="collectionDateChange"
            >
            </a-date-picker> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="Sample Collection Date" class="pb-0">
            <a-date-picker
              v-decorator="[
                'deliveryDate',
                {
                  rules: [
                    {
                      required: true,
                      message:
                        'Please select your Delivery Arrival Date!',
                    },
                  ],
                },
              ]"
              :disabled="true"
              :disabled-date="disabledDate"
              :format="dateFormat"
              style="width: 100%"
              size="large"
            >
            </a-date-picker> </a-form-item
        ></a-col>
      </a-row>
      <a-form-item>
        <FormActionButton :loading="loading" custom-text="Submit" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import LogisticLookup from '~/components/lookups/LogisticLookup'
import SchedulingServices from '~/services/API/SchedulingServices'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import { getMomentByStandardFormat, _disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
import notifications from '~/mixins/notifications'
export default {
  components: { LogisticLookup },
  mixins: [notifications],
  props: {
    treatment: { type: Object, required: true },
  },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'scheduling',
      }),
      dateFormat: STANDARD_UK_DATE_FORMAT,
    }
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    collectionDateChange(value, date) {
      this.form.setFieldsValue({
        deliveryDate: getMomentByStandardFormat(date).add(2, 'day'),
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          SchedulingServices.createForManufacturer(values)
            .then((response) => {
              this.success(response.message)
            })
            .catch(this.error)
        }
      })
    },
  },
}
</script>
