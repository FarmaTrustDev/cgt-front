<template>
    <div>
      <a-spin :spinning="loading">
        <a-form :form="form" layout="horizontal">
          <Form :form="form" :changes="changeEventData" />
        </a-form>
      </a-spin>  
      <!-- <a-modal
      :visible="selectionModal"
      ok-text="Ok"
      :footer="null"
      @cancel="handleSelectionCancel()"
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
          <a-button class="ant-btn" @click="handleSelectionCancel()" style="padding: 5px 50px">Cancel</a-button>
        </footer>
      </center>
    </a-modal>
    <a-modal
      :visible="visibleModalPopUp"
      ok-text="Ok"
      :footer="null"
      @cancel="handlePopUpCancel()"
      @ok="handlePopUpOk()"
    >
      <center>
        <h2><strong>Appointment Summary</strong></h2>
        <h3 style="color: #1943AE;"><strong>{{patientPUID}} - {{patientName}}</strong></h3>
      </center>
        <a-row>
          <a-col :span="15">
            <a-row class="row-height"><a-col :span="10"><strong>Date: </strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(dated)).format('DD MMMM YYYY') }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Time:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(dated)).format('hh:mm') }}</a-col></a-row>
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
          <a-button
            class="ant-btn"
            @click="handlePopUpCancel()"
            style="padding: 5px 50px"
            >Go Back</a-button
          >
        </footer>
      </center>
    </a-modal> -->        
    </div>
  </template>
  <script>
  import Form from '~/components/root/hospital/scheduling/changeForm'
  import imagesHelper from '~/mixins/images-helper'
  import AppointmentServices from '~/services/API/AppointmentServices'
  import DoctorServices from '~/services/API/DoctorServices'
  import UserServices from '~/services/API/UserServices'
  import { isEmpty } from '~/services/Utilities'
  import {_getFormatMoment, getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
  export default {
    components: { Form },
    mixins: [imagesHelper],
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
        changeEventData:{},
        treatments:{},
        emailIds:[],
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
        this.handlePatient()
        this.getUrl()
    },
    methods: {
      getMomentByStandardFormat,
      _getFormatMoment,
      handlePatient(){
        if (this.$route.query) {
            this.changeEventData = this.$route.query[0]
            // console.log(typeof this.changeEventData)
            // this.getDoctorsWithDays(this.changeEventData)
        }
      },
      getUrl(){
      this.url=this.user.userProfileImageUrl.replace(/['"]+/g, '')
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
    showPopUp(){
        this.visibleModalPopUp = true
    },
    async showSelectionPopUp(){
      this.getBasicInfo()
      console.log(this.startDate)
      const dt= new Date(this.startDate)
      const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      await this.getDoctors(dt.getDay() === 0 ? 7 : dt.getDay(),tm)
      // await this.getUsers()
      this.selectionModal = true
      // this.getUsers
      // this.selectionModal = true
    },
    handlePopUpOk() {
      this.visibleModalPopUp = false
      const dt= new Date(this.startDate)
      // console.log(this.startDate)
      const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      AppointmentServices.create(
        {
          patientId:this.patientPUID,
          patientName:this.patientName,
          clientName:this.partner,
          treatmentTypeName:this.treatmentTypeName, 
          personnelIds:this.selectedUsers,
          appointmentDate:this.startDate, 
          appointmentTime:tm,
          dayId:dt.getDay()===0? 7 : dt.getDay(),
          roomName:'A2'
        }
        ).then((response)=>{
        this.upsert(this.values)
      })
      
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
  