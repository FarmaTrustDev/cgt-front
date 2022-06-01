<template>
  <div class="consent-page">
    <h3 class="page-title">{{translation.PatieConse_2_685}}</h3>

    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <Upload
        :disabled="treatment.id != null"
        :default-file-list="treatment.consentFiles"
        :extensions="allowedExtensions"
        @handleChange="handleChange"
      />
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'consent',
            {
              rules: [
                {
                  required: true,
                  message: `${translation.Consecheck_4_840}`,
                },
              ],
              initialValue: treatment.consent,
              valuePropName: 'checked',
            },
          ]"
          @change="checkChecked($event)"
          :disabled="treatment.consent"
        >
          {{translation.PatieConse_4_465}}
        </a-checkbox>
      <h1 v-if="checkBoxError" style="color:#f00; font-weight:bold">
        {{translation.Consecheck_4_840}}
      </h1>
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
      <FormActionButton :loading="loading" :text="translation.SaveConse_4_695" :disabled="!isEmpty(treatment.id)" />
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
      checkBoxError: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.patientId = this.$route.params.id
    // @todo if the patient Id does not exist move to enrollment screen
  },

  methods: {
    handleChange(info) {
      console.log(info)
      this.fileList = info
    },
    checkChecked(e) {
      if (e.target.checked) {
        this.checkBoxError = false
      }
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
          this.$emit('getNextTab', 'Screening')
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
          if (values.consent === true) {
            this.create(values)
          } else {
            this.checkBoxError = true
            this.loading = false
          }
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
