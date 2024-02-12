<template>
  <div>
    <div> <FormActionButton
        v-if="isPatientExist"    
      @click="enableForm()"
          :text="translation.Edit_1_450"
        /></div>
    <a-spin :spinning="loading">
      <PatientDetail v-if="isPatientExist" :patient-detail="patient"/>
    <a-form v-else :form="form" :layout="formLayout" @submit="onSubmit">
      
      <FormFields   :form="form" :is-created="isCreated" :patient="patient" :country-iso="countryIso"  @getPhoneNumber ="getPhoneNumber" />
      <a-form-item class="pr-2 mt-15">
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          :text="translation.SavePatie_4_665"
        />
        <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
      </a-form-item>
    </a-form>


    <a-form v-if="isPartnerRequired" :form="formPartner" :layout="formLayout" @submit="onSubmitPartner">
      
      <FormFields   :form="formPartner" :is-created="false" :patient="patient" :country-iso="countryIso"  @getPhoneNumber ="getPhoneNumber" />
      <a-form-item class="pr-2 mt-15">
        <FormActionButton
          :is-created="false"
          :loading="loading"
          :text="translation.SavePatie_4_665"
        />
        <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
      </a-form-item>
    </a-form>

    <a-modal :visible="isFemale" :footer="null" @cancel="handlePartnerCancel()" @ok="handlePartnerOk()">


      <center>
        <h3>Do you want to register partner?</h3>
        <!-- <p>There are some errors in your submission. Please correct them.</p> -->
        <footer>
          <a-button
              class="ant-btn"
              style="padding: 5px 50px"
              @click="handlePartnerCancel()"
              >No</a-button
            >
            <a-button
              class="ant-btn ant-btn-primary"
              style="padding: 5px 50px"
              @click="handlePartnerOk()"
              >Yes</a-button
            >  
        </footer>
      </center>



    </a-modal>

    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
    <a-modal
      :visible="visibleModal"
      :ok-text="translation.Ok_1_663"
      :footer="null"
      @cancel="handleValidationOk()"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
          <span class="line-left line"></span>
          <span class="line-right line"></span>
        </span>
          <!-- <img
            :src="getImageUrl('Icons/cross-letter.jpg')"
            width="40%"
            height="40%"
          /> -->
        </p>
        <h3>{{ translation.Thereare_10_522 }}</h3>
        <!-- <p>There are some errors in your submission. Please correct them.</p> -->
        <footer>
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="handleValidationOk()"
            ><b>{{translation.Ok_1_663}}</b></a-button
          >
        </footer>
      </center>
    </a-modal>
    <a-modal :visible="visiblePatientDetailModal" :ok-text="translation.Confi_1_646" :cancel-text="translation.cance_1_296" width="800px" @cancel="submitModalResponse(false)" @ok="submitModalResponse(true)" >
      <PatientConfirmModel :patient-detail="patientDetail" />
    </a-modal>
    </a-spin>
  </div>
</template>
<script>
import FormFields from '~/components/patient/enrollment/FormFields'
import Signature from '~/components/signature'
import PatientDetail from '~/components/patient/enrollment/PatientDetails'
import PatientConfirmModel from  '~/components/patient/enrollment/ConfirmDetails'
import notifications from '~/mixins/notifications'
import PatientServices from '~/services/API/PatientServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Helpers'
export default {
  components: { FormFields, PatientDetail,PatientConfirmModel, Signature },
  mixins: [notifications, routeHelpers, nullHelper, imagesHelper],
  data() {
    return {
      loading: false,
      successResponse: '',
      visibleModal: false,
      visibleSignature:false,
      formLayout: 'vertical',
      patient: {},
      entityId: null,
      isPartnerRequired:false,
      isCreated: false,
      isPatientExist: false,
      treatmentData: {},
      isFemale:false,
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      formPartner: this.$form.createForm(this, {
        name: 'patientPartnerEnrollment',
      }),
      patientDetail: {},
      visiblePatientDetailModal: false,
      patientPhone: '',
      countryIso : '',
      signature:false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
    this.patientExist()
  },
  updated() {},
  methods: {
    enableForm(){
      this.loading = true
      this.isPatientExist = false
      this.loading = false
    },
    handlePartnerCancel(){
      // this.isPartnerRequired=false
      this.isFemale=false
    },
    handlePartnerOk(){
      this.isPartnerRequired=true
      this.isFemale=false
    },
    patientExist(){
      const patientId = this.$route.params.id
      if(patientId !== 'create' && patientId !== 'enrollment')
      {
        this.isPatientExist = true
        this.fetch(patientId);
      }
    },
    checkCreated() {
      const patientId = this.$route.params.id

      if (this.isGuid(patientId)) {
        this.entityId = patientId

        this.fetch(patientId)
      }
    },
    getPhoneNumber(e)
    {
      this.patientPhone = e
    },
    fetch(id) {
      this.loading = true
      PatientServices.getById(id)
        .then((response) => {
          const myString = response.data.phone
          if(!isEmpty(myString)){
            const result = myString.match(/\((.*)\)/)
            this.countryIso = result !== null ? result[1] : null
            const index = myString.indexOf(")");  
            const ph = myString.substr(index + 1);
            response.data.phone = ph.split(" ").join("");
          }
          this.patient = response.data
          // this.patientPhone = '(' + this.countryIso + ')'
          this.isCreated = true
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.phone = '(' + values.countryCode  + ') '+  values.phone
          this.patientDetail = values
          this.visibleDetialModal(true)
          // this.upsert(values)
        } else {
          this.visibleModal = true
          this.loading = false
        }
      })
    },
    submitModalResponse(e)
    {
      if(e === true)
      {
        this.visibleSignature=true
        // this.loading = false
        // this.upsert(this.patientDetail)
        this.visiblePatientDetailModal = false
      }
      else{
        this.loading = false
        this.visibleDetialModal(e)
      }
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleValidationOk(){
      this.visibleModal = false
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.patientDetail)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    upsert(values) {
      this.loading = true
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    update(values) {
      PatientServices.update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          // this.goto(`/hospital/patients/${response.data.globalId}?view=Consent`)
          this.$emit('getNextTab', 'Consent')
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    create(values) {
      PatientServices.create(values)
        .then((response) => {
          if (response.data.globalId != null) {
            if(response.data.gender===2){
              this.isFemale=true 
            }else{
            const formData = new FormData()
            formData.append('patientId', response.data.globalId)
            TreatmentServices.create(formData)
              .then((res) => {
                // if(res.data.gender===2){
                  // alert('hello')
                  // this.isFemale=true                
                // }else{
                  this.sendData(res.data.globalId)
                  this.goto(
                    `/hospital/patients/${response.data.globalId}?view=Consent`,
                    { treatment_id: res.data.globalId }
                  )
                // }
              })
              .catch(this.error)
              .finally(() => (this.loading = false))
              this.success('Patient enrolled successfully')
              this.$emit('getNextTab', 'Consent')
            }
            
          }

        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    sendData(data) {
      this.$emit('getTreatment', data)
    },
    visibleDetialModal(e)
    {
      this.visiblePatientDetailModal = e
    },
  },
}
</script>
