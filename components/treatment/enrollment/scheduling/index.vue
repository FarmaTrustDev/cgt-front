<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
        <Form v-if="!isScheduled" :form="form" :treatment="treatment" :rejection="rejection" />
        <Detail v-else  :entity="entity" />
      </a-form>
    </a-spin>
    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
    <a-modal
      :visible="collTimeModal"
      :ok-text="translation.Ok_1_663"
      :footer="null"
      @cancel="handleCollTimeCancel()"
      @ok="handleCollTimeOk()"
    >
        
        <center>
          <h3><strong>{{patientName}} {{patientPUID}}</strong></h3>
          <h3>Please select Collection Time on {{ _getFormatMoment(getMomentByStandardFormat(collectionDate)).format('DD MMMM YYYY') }}</h3>
        </center>
        <a-row>
          <a-col v-for="tim in timeSlots" :span="6" :key="tim.id" class="col-height">
            <input type="radio" v-model="selectedCollectionTimeSlot" :value="tim.time_slot" style="margin-right:15px; margin-top: 15px;"> {{ tim.display }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <center>
            <a-button class="ant-btn" @click="handleCollTimeCancel()" style="padding: 5px 50px">Cancel</a-button>
            <a-button :disabled="isEmpty(selectedCollectionTimeSlot)" class="ant-btn ant-btn-primary" @click="handleCollTimeOk()" style="padding: 5px 50px">Next</a-button>
            </center>
          </a-col>
        </a-row>
    </a-modal>
    <a-modal
      :visible="timeModal"
      :ok-text="translation.Ok_1_663"
      :footer="null"
      @cancel="handleTimeCancel()"
      @ok="handleTimeOk()"
    >
        
        <center>
          <h3><strong>{{patientName}} {{patientPUID}}</strong></h3>
          <h3>Please select Time for Treatment Room A2 on {{ _getFormatMoment(getMomentByStandardFormat(dated)).format('DD MMMM YYYY') }}</h3>
        </center>
        <a-row>
          <a-col v-for="tim in timeSlots" :span="6" :key="tim.id" class="col-height">
            <input type="radio" v-model="selectedTimeSlot" :value="tim.time_slot" style="margin-right:15px; margin-top: 15px;"> {{ tim.display }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <center>
            <a-button class="ant-btn" @click="handleTimeCancel()" style="padding: 5px 50px">Cancel</a-button>
            <a-button :disabled="isEmpty(selectedTimeSlot)" class="ant-btn ant-btn-primary" @click="handleTimeOk()" style="padding: 5px 50px">Next</a-button>
            </center>
          </a-col>
        </a-row>
    </a-modal>
    <a-modal
      :visible="selectionModal"
      :ok-text="translation.Ok_1_663"
      :loading="loading"
      :footer="null"
      @cancel="handleSelectionCancel()"
      @ok="handleSelectionOk()"
    >
        <h3><strong>{{patientName}} {{patientPUID}}</strong></h3>
        <h3>Estimated Collection Date is {{ _getFormatMoment(getMomentByStandardFormat(collectionDate)).format('DD MMMM YYYY') }}</h3>
        <h3>Estimated Treatment Date is {{ _getFormatMoment(getMomentByStandardFormat(startDate)).format('DD MMMM YYYY') }}</h3>
        <h3>List of available personnel at : {{ this.selectedTimeSlot }} (Room A2)</h3>
        <a-spin :spinning="loading">
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
        </a-spin>
        <center>
        <footer>
          
          <a-button class="ant-btn" @click="handleSelectionCancel()" style="padding: 5px 50px">Back</a-button>
          <a-button :disabled="isEmpty(userData) || isEmpty(selectedUsers)" class="ant-btn ant-btn-primary" @click="handleSelectionOk()" style="padding: 5px 50px">{{translation.Confi_1_646}}</a-button>
          
        </footer>
      </center>
    </a-modal>
    <a-modal
      :visible="visibleModalPopUp"
      :ok-text="translation.Ok_1_663"
      :footer="null"
      :width="700"
      @cancel="handlePopUpCancel()"
      @ok="handlePopUpOk()"
    >
      <center>
        <h2><strong>Appointment Summary</strong></h2>
        <h3 style="color: #1943AE;"><strong>{{patientPUID}} - {{patientName}}</strong></h3>
      </center>
        <a-row>
          <a-col :span="15">
            <a-row class="row-height"><a-col :span="10"><strong>Collection Date: </strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(collectionDate)).format('DD MMMM YYYY') }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Treatment Date: </strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(dated)).format('DD MMMM YYYY') }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Time:</strong></a-col><a-col :span="14">{{ selectedTimeSlot }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Room:</strong></a-col><a-col :span="14">A2</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Treatment:</strong></a-col><a-col :span="14">{{treatmentTypeName}}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Partner:</strong></a-col><a-col :span="14">{{ partner }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Container Date:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(collectionDate)).format('DD MMMM YYYY hh:mm') }}</a-col></a-row>
          </a-col>
          <a-col :span="9">
              <a-col v-for="user in filteredUsers" :key="user.id"><img class="img-responsive" :src="getImageUrl(getImageFineURL(user.userProfileImageUrl))" width="40" height="30" style="margin-right:15px" />{{ user.name }}</a-col>
          </a-col>
        </a-row>
        <center>
        <footer>
          <a-button
            class="ant-btn"
            @click="handlePopUpCancel()"
            style="padding: 5px 50px"
            >Go Back</a-button>
            <a-button
            class="ant-btn ant-btn-primary"
            @click="handlePopUpOk()"
            style="padding: 5px 50px"
            >Ok</a-button>
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
import AppointmentServices from '~/services/API/AppointmentServices'
import DoctorServices from '~/services/API/DoctorServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Utilities'
import imagesHelper from '~/mixins/images-helper'
import { TIME_SLOTS } from '~/services/Constant'
import Signature from '~/components/signature'
// import TimeCard from '~/components/datetime/TimeCard'
import {_getFormatMoment, getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
import UserServices from '~/services/API/UserServices'
export default {
  components: { Form, Detail, Signature },
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
      emailIds:[],
      timeModal:false,
      selectedTimeSlot:[],
      selectedCollectionTimeSlot:[],
      timeSlots:TIME_SLOTS,
      collectionDate:'',
      collTimeModal:false,
      visibleSignature:false,
    }
  },
  computed:{
    user() {
      return this.$store.getters.getUser
    },
    filteredUsers() {
      return this.userData.filter(user => this.selectedUsers.includes(user.id));
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.validateIsCreated()
    this.getUrl()
    // this.getUsers()
    // this.getDoctorsWithDays()
    // this.getBasicInfo()
  },
  methods: {
    getMomentByStandardFormat,
    _getFormatMoment,
    getUrl(){
      if(!isEmpty(this.user.userProfileImageUrl)){
        this.url=this.user.userProfileImageUrl.replace(/['"]+/g, '')
      }
    },
    
    getDoctorsWithDays(){
      const dt= new Date(this.startDate)
      const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      DoctorServices.getDoctorWithDays().then((response)=>{
        AppointmentServices.doctorData({doctorDTOs: response.data, startDate: dt, startTime:tm}).then((secondResponse)=>{

        })
      })
    },
    async getDoctors(dayId, startTime) {
      try {
        const response = await DoctorServices.getWithDays(dayId, startTime);
        this.getUsers(response)
      } catch (error) {
        console.error("Error in getDoctors:", error);
      }
    },
    getBasicInfo(){
      if(!isEmpty(this.treatment.patient)){
        this.patientName=this.treatment.patient.name
        this.patientPUID=this.treatment.patient.enrollmentNumber
        this.treatmentTypeName=this.treatment.treatmentTypeName
        // this.selectionModal = true
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
    getUsers(data){
      this.emailIds = []
      data.data.forEach((element) => {
            if (element.daysDTO.workingDays.length > 0) {
              this.emailIds.push(element.email);
            }
          });
      const dt= new Date(this.startDate)
      const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')    
      UserServices.getUserByEmails({emails: this.emailIds, appointmentDate: dt, appointmentTime: tm})
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
          this.dated=values.deliveryArrivalDate
          this.containerDate=values.pickupDateTime
          this.partner=values.manufacturerName
          this.collectionDate=values.collectionDate
          this.startDate=values.deliveryArrivalDate
          this.values=values
          this.showTimeModa()
          // this.timeModal=true
          // this.showSelectionPopUp()
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
    async showSelectionPopUp(){
      // this.loading=true
      this.getBasicInfo()
      console.log(this.startDate)
      const dt= new Date(this.startDate)
      const tm=this.selectedTimeSlot
      await this.getDoctors(dt.getDay() === 0 ? 7 : dt.getDay(),tm)
      // await this.getUsers()
      // this.loading=false
      this.selectionModal = true
      // this.getUsers
      // this.selectionModal = true
    },
    handlePopUpOk() {
      this.visibleModalPopUp = false
      this.visibleSignature = true
      /* const dt= new Date(this.startDate)
      const dtCol= new Date(this.collectionDate)
      // console.log(this.startDate)
      // const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      AppointmentServices.create(
        {
          patientId:this.patientPUID,
          patientName:this.patientName,
          clientName:this.partner,
          treatmentTypeName:this.treatmentTypeName, 
          personnelIds:this.selectedUsers,
          appointmentDate:this.startDate, 
          appointmentTime:this.selectedTimeSlot,
          collectionDate:this.collectionDate,
          collectionTime:this.selectedCollectionTimeSlot,
          containerDate:this.containerDate,
          collectionPersonnels:this.selectedUsers,
          dayId:dt.getDay()===0? 7 : dt.getDay(),
          collectionDay:dtCol.getDay()===0? 7 : dtCol.getDay(),
          roomName:'A2',
        }
        ).then((response)=>{
          this.upsert(this.values)
        }) */
      
    },
    scheduling(){
      const dt= new Date(this.startDate)
      const dtCol= new Date(this.collectionDate)
      // console.log(this.startDate)
      // const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      AppointmentServices.create(
        {
          patientId:this.patientPUID,
          patientName:this.patientName,
          clientName:this.partner,
          treatmentTypeName:this.treatmentTypeName, 
          personnelIds:this.selectedUsers,
          appointmentDate:this.startDate, 
          appointmentTime:this.selectedTimeSlot,
          collectionDate:this.collectionDate,
          collectionTime:this.selectedCollectionTimeSlot,
          containerDate:this.containerDate,
          collectionPersonnels:this.selectedUsers,
          dayId:dt.getDay()===0? 7 : dt.getDay(),
          collectionDay:dtCol.getDay()===0? 7 : dtCol.getDay(),
          roomName:'A2',
        }
        ).then((response)=>{
          this.upsert(this.values)
        })
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.scheduling()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    showTimeModa(){
      this.collTimeModal=true
    },
    handleTimeOk(){
      this.timeModal=false
      this.loading=true
      this.showSelectionPopUp()
    },
    handleCollTimeOk(){
      this.collTimeModal=false
      this.timeModal=true
    },
    handleCollTimeCancel(){
      this.collTimeModal=false
    },
    handleTimeCancel(){
      this.timeModal=false
    },
    handlePopUpCancel() {
      this.visibleModalPopUp = false
      this.selectionModal=true
      // this.upsert(this.values)
    },
    handleSelectionOk(){
      this.selectionModal=false
      this.showPopUp()
    },
    handleSelectionCancel(){
      this.selectionModal=false
      this.showTimeModa()
      // this.showPopUp()
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
