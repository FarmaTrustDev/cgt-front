<template>
  <div class="consent-page">
    <h3 class="page-title">Patient Consent</h3>

    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <Upload :extensions="allowedExtensions" @handleChange="handleChange" />
      <a-form-item>
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
      <FormActionButton :loading="loading" :disabled="!isEmpty(treatment.id)" />
    </a-form>
  </div>
</template>
<script>
// Not adding with crud because file attachment should be with  FormData
import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import Upload from '~/components/upload'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
export default {
  components: { Upload },
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
      fileList: [],
      allowedExtensions: DOCUMENT_EXTENSIONS,
    }
  },
  mounted() {
    this.patientId = this.$route.params.id
    // @todo if the patient Id does not exist move to enrollment screen
  },

  methods: {
    handleChange(info) {
      this.fileList = info
    },
    create(values) {
      const formData = new FormData()
      for (const key in values) {
        formData.append(key, values[key])
      }

      this.fileList.forEach((files) => {
        formData.append('files', files)
      })

      TreatmentServices.create(formData)
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
