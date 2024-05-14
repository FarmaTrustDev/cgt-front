<template>
  <a-skeleton :loading="loading">
    <Create
      v-if="!isCreated && !loading"
      :treatment="treatment"
      @getNextTab="getNextTab"
      @getTreatment="getTreatment"
    />
    <CollectedList
      v-else
      :loading="loading"
      :treatment-type-name="treatmentTypeName"
      :categories="categories"
    />
    
   
      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
      <a-modal
      :title="
        isAccepted ? 'Accept Scheduling Request' : 'Reject Scheduling Request'
      "
      :visible="showResponseModal"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :width="700"
      @ok="submitTreatmentResult"
      @cancel="handleModal(false)"
    >
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <Form :is-accepted="isAccepted" :data="selectedRow" />

        <FormActionButton
          :text="getButtonText()"
          :btn-type="getButtonType()"
          :is-created="false"
          :loading="loading"
          :disabled="clicked"
          ><span slot="extra" class="mr-5">
            <a-button @click="handleModal(false)" Reject Scheduling Request>{{
              translation.cance_1_296
            }}</a-button>
          </span></FormActionButton
        >
      </a-form>
    </a-modal>
    
  </a-skeleton>
  
</template>
<script>
import Create from '~/components/treatment/enrollment/screening/Create'
import Form from '~/components/root/manufacturer/treatments/request/Form'
import CollectedList from '~/components/treatment/enrollment/screening/CollectedList'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
import SchedulingServices from '~/services/API/SchedulingServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import Signature from '~/components/signature'
import userDetail from '~/mixins/user-detail'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { Create, CollectedList,Form,Signature },
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [userDetail],
  data() {
    return {
      categories: null,
      isCreated: false,
      getTreatmentByParamId: [],
      treatmentParamId: {},
      loading: false,
      treatmentTypeName: '',
      visibleSignature:false,
      confirmLoading: false,
      showResponseModal: false,
      isAccepted: false,
      selectedRow: {},
      data:{},
      clicked:false,
      form: this.$form.createForm(this, {
        name: 'screeningCategory',
      }),
      formLayout: 'vertical',
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  watch: {
    treatment(newData, oldData) {
      if (newData !== oldData) {
        this.isScreeningCompleted()
      }
    },
  },
  mounted() {
    this.isScreeningCompleted()
    if(this.user.roleName === 'PHARMA'){
      this.data = JSON.parse(this.$route.query.dta)
    }
  },
  
  methods: {
    isScreeningCompleted() {
      this.loading = true

      this.treatmentParamId = this.$route.query.treatment_id
      if (isEmpty(this.treatmentParamId)) {
        this.treatmentParamId = this.treatment.globalId
      }
      this.fetch(this.treatmentParamId)
      this.loading = false
    },
    fetchTreatmentScreening(treatment) {
      ScreeningCategoryServices.getByTreatmentId(treatment.id)
        .then((response) => {
          this.categories = response.data
          this.treatmentTypeName = this.categories[0].treatmentTypeName
        })
        .catch(this.error)
    },
    getNextTab(data) {
      this.$emit('getNextTab', data)
    },
    getTreatment(data) {
      this.$emit('getTreatment', data)
    },
    fetch(treatmentId) {
      TreatmentServices.detail(treatmentId)
        .then((response) => {
          this.getTreatmentByParamId = response.data
          if (this.getTreatmentByParamId.screeningStatus === true) {
            this.isCreated = true
            this.fetchTreatmentScreening(this.getTreatmentByParamId)
          }
        })
        .catch(this.error)
        .finally(() => {})
    },
    submitTreatmentResult() {
      alert("as")
    },
    onSubmit(e) {
      
      this.loading = true
      this.clicked = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitData = values
          this.visibleSignature = true
        }
      })
      this.loading = false
      this.clicked = false
    },
    upsert(values)
    {
      const data = this.selectedRow
          const performedAction = values.accepted === true ? 'accepted' : 'rejected'
          SchedulingServices.markScheduleRequest(data.id, values).then(
            (response) => {
              this.visibleSignature = false
              this.success('Request ' + performedAction)
              this.goto('/manufacturer/treatments')
            }
          )
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.submitData)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleModal(show) {
      if (!show) {
        this.isAccepted = false
      }
      this.showResponseModal = show
    },
    showConfirm(record, isAccepted) {
      this.isAccepted = isAccepted
      this.selectedRow = this.data
      this.handleModal(true)
    },
    getButtonText() {
      return this.isAccepted
        ? this.$store.getters.getTranslation.Accep_1_278
        : this.$store.getters.getTranslation.Rejec_1_280
    },
    getButtonType() {
      return this.isAccepted ? 'primary' : 'danger'
    },

  },
}
</script>
