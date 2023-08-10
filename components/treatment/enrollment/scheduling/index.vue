<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
        <Form v-if="!isScheduled" :form="form" :treatment="treatment" :rejection="rejection" />
        <Detail v-else  :entity="entity" />
      </a-form>
    </a-spin>

    <a-modal
      :visible="selectionModal"
      ok-text="Ok"
      :footer="null"
      @cancel="handleSelectionOk()"
      @ok="handleSelectionOk()"
    >
        <h3><strong>{{patientName}} {{patientPUID}}</strong></h3>
        <h3>Estimated treatment date is {{ _getFormatMoment(getMomentByStandardFormat(startDate)).format('DD MMMM YYYY') }}</h3>
        <h3>Please select available personnel: </h3>
        <a-row v-for="user in userData" :key="user.id" class="col-height">
          <a-col :span="12">
            <input type="checkbox" v-model="selectedUsers" :value="user.id" style="margin-right:15px; margin-top: 15px;">
            <img class="img-responsive" :src="getImageUrl(getImageFineURL(user.userProfileImageUrl))" width="40" height="30" style="margin-right:15px" />
            {{ user.name }}
          </a-col>
          <a-col :span="6" style="margin-top: 10px;">
            {{ user.roleName }}
          </a-col>
        </a-row>
        <center>
        <footer>
          <a-button class="ant-btn ant-btn-primary" @click="handleSelectionOk()" style="padding: 5px 50px">Confirm</a-button>
        </footer>
      </center>
    </a-modal>
    <a-modal
      :visible="visibleModalPopUp"
      ok-text="Ok"
      :footer="null"
      @cancel="handlePopUpOk()"
      @ok="handlePopUpOk()"
    >
      <center>
        <h2><strong>Appointment Summary</strong></h2>
        <h3 style="color: #1943AE;"><strong>{{patientPUID}} - {{patientName}}</strong></h3>
      </center>
        <a-row>
          <a-col :span="15">
            <a-row class="row-height"><a-col :span="10"><strong>Date: </strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(dated)).format('DD MMMM YYYY') }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Time:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(dated)).format('hh:mm:ss') }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Room:</strong></a-col><a-col :span="14">A2</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Treatment:</strong></a-col><a-col :span="14">{{treatmentTypeName}}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Partner:</strong></a-col><a-col :span="14">{{ partner }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Container Date:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(containerDate)).format('DD MMMM YYYY hh:mm') }}</a-col></a-row>
          </a-col>
          <a-col :span="9">
              <a-col v-for="user in filteredUsers" :key="user.id"><img class="img-responsive" :src="getImageUrl(getImageFineURL(user.userProfileImageUrl))" width="40" height="30" style="margin-right:15px" />{{ user.name }}</a-col>
          </a-col>
        </a-row>
        <center>
        <footer>
          <a-button
            class="ant-btn ant-btn-primary"
            @click="handlePopUpOk()"
            style="padding: 5px 50px"
            >Got it!</a-button
          >
        </footer>
      </center>
    </a-modal>    
  </div>
</template>
<script>
import Form from '~/components/treatment/enrollment/scheduling/Form'
import Detail from '~/components/treatment/enrollment/scheduling/Detail'
import withCrud from '~/mixins/with-crud'
import SchedulingServices from '~/services/API/SchedulingServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Utilities'
import imagesHelper from '~/mixins/images-helper'
import {_getFormatMoment, getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
import UserServices from '~/services/API/UserServices'
export default {
  components: { Form, Detail },
  mixins: [withCrud,imagesHelper],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
    rejection: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
      apiService: SchedulingServices,
      fetchIdFromParams: false,
      entity: {},
      values:{},
      isScheduled: false,
      loading: false,
      dated:'',
      containerDate:'',
      startDate:'',
      partner:'',
      url:'',
      selectionModal:false,
      visibleModalPopUp: false,
      userData:[],
      selectedUsers: [],
      patientName:'',
      treatmentTypeName:'',
      patientPUID:'',
      treatments:{},
    }
  },
  computed:{
    user() {
      return this.$store.getters.getUser
    },
    filteredUsers() {
      return this.userData.filter(user => this.selectedUsers.includes(user.id));
    }
  },
  mounted() {
    this.validateIsCreated()
    this.getUrl()
    this.getUsers()
    // this.getBasicInfo()
  },
  methods: {
    getMomentByStandardFormat,
    _getFormatMoment,
    getUrl(){
      this.url=this.user.userProfileImageUrl.replace(/['"]+/g, '')
    },
    getBasicInfo(){
      if(!isEmpty(this.treatment.patient)){
        this.patientName=this.treatment.patient.name
        this.patientPUID=this.treatment.patient.enrollmentNumber
        this.treatmentTypeName=this.treatment.treatmentTypeName
        this.selectionModal = true
      }else{
        console.log(this.$route.query)
        this.fetch(this.$route.query.treatment_id)
      }
    },
    getImageFineURL(url){
      if(url==null)
      {
        url="Uploads/default/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg"
      }
      return url.replace(/['"]+/g, '')
    },
    fetch(treatmentId) {
      TreatmentServices.detail(treatmentId)
        .then((response) => {
          console.log(response)
          this.patientName=response.data.patient.name
          this.patientPUID=response.data.patient.enrollmentNumber
          this.treatmentTypeName=response.data.treatmentTypeName
          this.selectionModal = true
          // this.updateTreatment(response.data)
        })
        .catch(this.error)
        .finally(() => {
          // this.loading = false
        })
    },
    updateTreatment(treatment) {
      this.treatments = treatment
    },
    getUsers(){
      UserServices.getUser(
        this.user.organizationId,
        this.user.organizationTypeId
      )
        .then((response) => {
          this.userData = response.data
        })
        .finally(() => (this.loading = false))
    },
    validateIsCreated() {
      this.loading = true
      if (
        !isEmpty(this.treatment) &&
        this.treatment.id &&
        this.treatment.isSchedule
      ) {
        this.fetchScheduling(this.treatment.id)
      } else {
       // this.checkCreated()
      }
      this.loading = false
    },
    afterFetch() {
      if (this.treatment.isSchedule) {
        this.fetchScheduling(this.treatment.id)
      }

      // this.validateIsCreated()
    },
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.dated=values.collectionDate
          this.containerDate=values.pickupDateTime
          this.partner=values.manufacturerName
          this.startDate=values.deliveryArrivalDate
          // console.log(values)
          this.values=values
          this.showSelectionPopUp()
          // this.upsert(values)
        } else {
          this.loading = false
        }
      })
      // this.loading = false
    },
    fetchScheduling(id) {
      SchedulingServices.getByTreatment(id).then((response) => {
        const entity = response.data
        if (!isEmpty(entity)) {
          this.entity = entity
          this.isScheduled = true
        }
      })
    },
    afterCreate(values) {
      this.gotoPatient()
    },
    afterUpdate(values) {
      this.gotoPatient()
    },
    gotoPatient() {
      this.goto('/hospital/patients')
    },
    showPopUp(){
      this.visibleModalPopUp = true
    },
    showSelectionPopUp(){
      this.getBasicInfo()
      // this.selectionModal = true
    },
    handlePopUpOk() {
      this.visibleModalPopUp = false
      this.upsert(this.values)
    },
    handleSelectionOk(){
      this.selectionModal=false
      this.showPopUp()
    },
  },
}
</script>
<style scoped>
.row-height {
  height: 25px;
}
.col-height {
  height: 60px;
}
</style>
