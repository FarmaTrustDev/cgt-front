<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>

      <a-form-item label="Consent">
        <a-checkbox
          v-decorator="[
            'consent',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select at least one activity type',
                },
              ],
              initialValue: treatment.consent,
              valuePropName: 'checked',
            },
          ]"
          :disabled="treatment.consent"
        >
          Patient Consent Form Registered
        </a-checkbox>
        <a-input
          v-decorator="[
            `patientId`,
            {
              rules: [
                { required: true, message: 'Please input your Patient Id!' },
              ],
              initialValue: patientId,
            },
          ]"
          type="hidden"
        />
      </a-form-item>
      <FormActionButton :disabled="treatment.id" />
    </a-form>
  </div>
</template>
<script>
// Not adding with crud because file attachment should be with  FormData
import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
export default {
  mixins: [notifications, routeHelpers, nullHelper],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      patientId: null,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      loading: false,
    }
  },
  mounted() {
    this.patientId = this.$route.params.id
    // @todo if the patient Id does not exist move to enrollment screen
  },

  methods: {
    handleChange(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    create(values) {
      TreatmentServices.create(values)
        .then((response) => {
          this.success(response.message)
          this.$emit('getTreatment', response.data)
          this.$emit('getNextTab', 3)
          this.goto(this.$route.path, { treatment_id: response.data.globalId })
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.create(values)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
