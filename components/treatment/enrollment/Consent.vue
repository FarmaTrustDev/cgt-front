<template>
  <div class="consent-page">
    <h3 class="page-title">{{ translation.PatieConse_2_685 }}</h3>

    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <Upload
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
          {{ translation.PatieConse_4_465 }}
        </a-checkbox>
        <h1 v-if="checkBoxError" style="color: #f00; font-weight: bold">
          {{ translation.Consecheck_4_840 }}
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
      <FormActionButton
        v-if="isInConsentPhase(treatment)"
        :loading="loading"
        :text="translation.SaveConse_4_695"
      />
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
// Not adding with crud because file attachment should be with  FormData
import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import Upload from '~/components/upload'
import Signature from '~/components/signature'
import { isEmpty } from '~/services/Utilities'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
import { TREATMENT_PHASES } from '~/services/Constant/Phases'
export default {
  components: { Upload, Signature },
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
      treatId: '',
      TREATMENT_PHASES,
      visibleSignature:false,
      consentDetail:{},
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
    isInConsentPhase() {
      return (
        isEmpty(this.treatment) ||
        this.treatment.phaseId <= TREATMENT_PHASES.SCREENING.id // because of workaround not using consent , consent cscreening k phase pe kam karhe hai 
      )
    },
    handleChange(info) {
      this.fileList = info
      // console.log(this.fileList)
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
        // console.log(files)
        formData.append('files', files)
      })
      // console.log(formData)
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

    updateConcent(values) {
      this.loading = true
      const formData = new FormData()
      for (const key in values) {
        formData.append(key, values[key])
      }

      this.fileList.forEach((files) => {
        formData.append('files', files)
      })

      TreatmentServices.updateConcent(formData)
        .then((response) => {
          this.success(response.message)
          this.$emit('getTreatment', response.data)
          this.$emit('getNextTab', 'Screening')
          this.goto(this.$route.path, { treatment_id: response.data.globalId })
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    getTreatmentId(treatmentid) {
      this.treatId = treatmentid
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.consentDetail)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.consent === true) {
            this.visibleSignature=true
            this.consentDetail=values
            // if(this.treatment.id==null)
            /* const param = this.$route.query
            if (!isEmpty(param.treatment_id)) {
              this.getTreatmentId(param.treatment_id)
            }
            if (this.$route.query.treatment_id == null) {
              this.create(values)
            } else {
              const treatGlobalId = this.$route.query.treatment_id
              values.globalId = treatGlobalId
              this.updateConcent(values)
              // this.goto(this.$route.path, { treatment_id: response.data.globalId })
            } */
          } else {
            this.checkBoxError = true
            this.loading = false
          }
        } else {
          this.loading = false
        }
      })
    },
    upsert(values) {
      const param = this.$route.query
      if (!isEmpty(param.treatment_id)) {
        this.getTreatmentId(param.treatment_id)
      }
      if (this.$route.query.treatment_id == null) {
        this.create(values)
      } else {
        const treatGlobalId = this.$route.query.treatment_id
        values.globalId = treatGlobalId
        this.updateConcent(values)
        // this.goto(this.$route.path, { treatment_id: response.data.globalId })
      }
    },
  },
}
</script>
<style scoped>
.ant-tooltip {
    display: none;
    position: relative;
}
.ant-tooltip-placement-top, .ant-tooltip-placement-topLeft, .ant-tooltip-placement-topRight {
    padding-bottom: 8px;
    display: none !important;
}
</style>