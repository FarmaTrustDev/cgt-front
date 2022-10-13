<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-select
          v-decorator="[
            'treatmentTypeId',
            {
              initialValue: entity.treatmentTypeId,
              rules: [
                {
                  required: true,
                  message: 'Please select your Treatment Type!',
                },
              ],
            },
          ]"
          :disabled="isCreated"
          :loading="typeLoading"
          placeholder="Select Treatment Type"
          style="width: 100%"
          size="large"
          class="default-select"
        >
          <a-select-option v-for="type in treatmentType" :key="type.id">
            {{ type.name }}
          </a-select-option>
        </a-select></a-form-item
      >

      <a-form-item>
        <a-select
          v-decorator="[
            'HospitalsId',
            {
              initialValue: entity.hospitalsId,
              rules: [
                {
                  required: true,
                  message: 'Please select your Hospital!',
                },
              ],
            },
          ]"
          :loading="hospitalLoading"
          mode="multiple"
          placeholder="Select Hospital"
          style="width: 100%"
          size="large"
          class="default-select"
        >
          <a-select-option v-for="hospital in hospitals" :key="hospital.id">
            {{ hospital.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <FormActionButton :loading="btnLoading" :is-created="isCreated" />
    </a-form>

    <span v-if="isCreated">
      <a-divider>{{translation.AssocScree_2_489}}</a-divider>

      <CategoryTabs v-if="entity.id" @getScreenTempStatusTab="getScreenTempStatus" :template-id="entity.id"/>
      <a-col :span="12" v-if="!active" class="mt-15">
       <a-form-item> 
        <a-checkbox v-decorator="['checkBox']" @change="checkChanged">
          <b>Confirm with hospital</b>
        </a-checkbox>
       </a-form-item>
      </a-col>
      <a-col :span="12" v-if="!active" class="mt-25 text-right">
        <a-button :loading="submitBtnLoading" type="primary" @click="sendEmail(entity.hospitalsId, entity.globalId)">Submit</a-button>
      </a-col>
      </span>
  </div>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
import OrganizationServices from '~/services/API/OrganizationServices'
import UserServices from '~/services/API/UserServices'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
import { HOSPITAL_ALIAS } from '~/services/Constant'
import CategoryTabs from '~/components/root/manufacturer/screening/categories/Tabs'
import withCrud from '~/mixins/with-crud'
import { success } from '~/services/Helpers/notifications'
export default {
  components: { CategoryTabs },
  mixins: [withCrud],
  data() {
    return {
      screeningTemplate: {},
      entityId: null,
      isCreated: false,
      loading: false,
      submitBtnLoading : false,
      treatmentType: {},
      entity: {},
      typeLoading: true,
      hospitalLoading: true,
      btnLoading: false,
      fetchTreatmentTypess:true,
      form: this.$form.createForm(this, {
        name: 'screening',
      }),
      hospitals: [],
      formLayout: 'vertical',
      apiService: ScreeningTemplateServices,
      gotoLink: '/manufacturer/administration/screening',
      active:false,
      fetchStatus:true,
      checked:false,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
    user() {
      return this.$store.getters.getUser
    },
  },   
  mounted() {
    this.fetchOrganization()
    this.getActiveWithOutScreening()
    
  },
  updated() {
    if (this.isCreated && this.fetchTreatmentTypess) {
      this.fetchTreatmentTypess = false
      this.getTreatmentTypes()
    }
    if(this.entity.id!==undefined && this.fetchStatus){
      this.fetchStatus=false
      this.getScreeningTempStatus(this.entity.id)
    }
  },    
  methods: {
    getActiveWithOutScreening() {
      this.typeLoading = true
      TreatmentService.getActiveWithOutScreening()
        .then((response) => {
          this.treatmentType = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
    getTreatmentTypes() {
      if (this.isCreated) {
        this.fetchTreatmentTypes({ Ids: [this.entity.treatmentTypeId] })
      } else {
        this.getActiveWithOutScreening()
      }
    },
    fetchTreatmentTypes(params = {}) {
      TreatmentService.get(params).then((response) => {
        this.treatmentType = response.data
      })
    },
    getScreeningTempStatus(id) {
      this.loading = true
      ScreeningTemplateServices.getScreeningTempStatus(id)
        .then((response) => {
          this.active = response.data
        })
        .finally(() => {
          this.loading = false
        }) 
    },
    getScreenTempStatus() {
      this.getScreeningTempStatus(this.entity.id)
    },  
    fetchOrganization() {
      this.hospitalLoading = true
      OrganizationServices.get({ organizationTypeAlias: HOSPITAL_ALIAS })
        .then((response) => {
          this.hospitals = response.data
        })
        .finally(() => (this.hospitalLoading = false))
    },
    checkChanged(e){
      this.checked=e.target.checked;
    },
    sendEmail(data, tempId){
      this.submitBtnLoading = true
      this.active = true
      if(this.checked){
        UserServices.sendEmailToHospitals({hospitalsId: data, globalId: tempId}).then((response)=>{
          success(this, { message: 'Email sent successfully' })
        })
        ScreeningTemplateServices.submitScreeningRequest(this.entity.id).then((response)=>{
          success(this, { message: response.message })
        })
        this.submitBtnLoading = false
      }else{
        ScreeningTemplateServices.submitScreeningRequest(this.entity.id).then((response)=>{
          success(this, { message: response.message })
        })
        this.submitBtnLoading = false
      }
      
    }
  },
}
</script>
