<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <LogisticLookup />
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Sample Collection Date" class="pb-0">
            <a-date-picker
              v-decorator="[
                'collectionDate',
                {
                  rules: [
                    {
                      required: true,
                      message:
                        'Please select your Delivery Arrival Date Birth!',
                    },
                  ],
                },
              ]"
              :format="dateFormat"
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
                        'Please select your Delivery Arrival Date Birth!',
                    },
                  ],
                },
              ]"
              :disabled="true"
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
import { STANDARD_UK_DATE_FORMATE } from '~/services/Constant/DateTime'
import { getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
export default {
  components: { LogisticLookup },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'scheduling',
      }),
      dateFormat: STANDARD_UK_DATE_FORMATE,
    }
  },
  methods: {
    collectionDateChange(value, date) {
      this.form.setFieldsValue({
        deliveryDate: getMomentByStandardFormat(date).add(2, 'day'),
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    },
  },
}
</script>
