<template>
    <div>
      <a-spin :spinning="loading">
      <h3 class="page-title">My Schedule</h3>
      <div class="grey-card">
        <!-- <div v-if="loading" class="loading-overlay">
          <div class="loading-spinner"></div>
        </div> -->
        <calendar
        :handle-date-click="fetchEvents"
        :disabled-date="disabledDate"
        @getEventClick="getEventClick"
        ></calendar>
      </div>
    </a-spin>
      <a-modal
      :visible="selectionModal"
      ok-text="Ok"
      :width="550"
      :footer="null"
      @cancel="handleSelectionCancel()"
      @ok="handleSelectionOk()"
    >
        <h3><strong>{{changes.patientName}} {{changes.patientPUID}}</strong></h3>
        <h3>Appointment on {{ _getFormatMoment(getMomentByStandardFormat(startDate)).format('DD MMMM YYYY') }} at {{ tim }}</h3>
        <h3>Please select from the following personnels: </h3>
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
        <a-row>
            <footer>
                <center>
                    
                    <a-button class="ant-btn" @click="handleSelectionCancel()">Cancel</a-button>
                    <a-button :disabled="isEmpty(selectedUsers)" class="ant-btn ant-btn-primary" @click="handleSelectionOk()">Confirm</a-button>
                </center>
            </footer>
        </a-row>
      
    </a-modal>
    <a-modal
      :visible="visibleModalPopUp"
      ok-text="Ok"
      :width="700"
      :footer="null"
      @cancel="handlePopUpCancel()"
      @ok="handlePopUpOk()"
    >
      <center>
        <h2><strong>Confirm Changes</strong></h2>
        <h3 style="color: #1943AE;"><strong>{{changes.patientPUID}} - {{changes.patientName}}</strong></h3>
      </center>
        <a-row>
          <a-col :span="15">
            <a-row class="row-height"><a-col :span="10"><strong>Date: </strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(startDate)).format('DD MMMM YYYY') }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Time:</strong></a-col><a-col :span="14">{{ tim }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Room:</strong></a-col><a-col :span="14">A2</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Treatment:</strong></a-col><a-col :span="14">{{changes.treatmentTypeName}}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Partner:</strong></a-col><a-col :span="14">{{ changes.partner }}</a-col></a-row>
            <a-row class="row-height"><a-col :span="10"><strong>Container Date:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(changes.containerDate)).format('DD MMMM YYYY hh:mm') }}</a-col></a-row>
          </a-col>
          <a-col :span="9">
              <a-col v-for="user in filteredUsers" class="col-height" :key="user.id"><img class="img-responsive" :src="getImageUrl(getImageFineURL(user.userProfileImageUrl))" width="40" height="50" style="margin-right:15px" />{{ user.name }}</a-col>
          </a-col>
        </a-row>
        <center>
        <footer>
          <a-button
            class="ant-btn"
            @click="handlePopUpCancel()"
            style="padding: 5px 50px"
            >Go Back</a-button
          >
          <a-button
            class="ant-btn ant-btn-primary"
            @click="handlePopUpOk()"
            style="padding: 5px 50px"
            >Confirm</a-button
          >
        </footer>
      </center>
    </a-modal>     
    
    
    <a-modal
        :visible="visibleBasicModalPopUp"
        ok-text="Ok"
        :width="700"
        :footer="null"
        :closable="false"
        @cancel="handleBasicPopUpCancel()"
        @ok="handleBasicPopUpOk()"
        >
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="21">
                <a-card class="white-card" :bordered="false">
                  <a-row>
                    <a-col :span="6"
                      ><span class="dated-time-schedule">
                        {{ slotTime }}</span
                      >
                    </a-col>
                    <a-col :span="10">
                      <div class="dateTimeBox">
                        <span class="daysName"><strong>{{
                          _getFormatMoment(dated).format('dddd')
                        }}</strong></span>
                        <br />
                        <span class="TodaysDate"><strong>{{
                          _getFormatMoment(dated).format('Do MMM YYYY')
                        }}</strong></span>
                      </div>
                    </a-col>
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="15">
                <a-card class="grey-card">
                  <a-card class="white-card">
                    <a-row class="row-height"><a-col :span="10"><strong>Patient: </strong></a-col><a-col :span="14">{{patientPUID}} - {{patientName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Room:</strong></a-col><a-col :span="14">{{roomName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Treatment:</strong></a-col><a-col :span="14">{{treatmentTypeName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Partner:</strong></a-col><a-col :span="14">{{ partner }}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Container Date:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(containerDate)).format('Do MMM YYYY') }}</a-col></a-row>
                    <a-row class="row-height">
                      <a-col :span="24">
                        <center>
                          <a-button
                            class="ant-btn ant-btn-primary"
                            @click="handleBasicPopUpOk()"
                            style="padding: 2px 10px"
                          >Find New Time</a-button>
                        </center>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-card>
              </a-col>
            <a-col :span="9">
                <a-col v-for="user in filterUsers" :key="user.id" class="col-height"><img class="img-responsive" :src="getImageUrl(getImageFineURL(user.userProfileImageUrl))" width="40" height="30" style="margin-right:15px" />{{ user.name }}</a-col>
            </a-col>
          </a-row>
      </a-modal> 
<!--         <a-modal
        :visible="visibleModalPopUp"
        ok-text="Ok"
        :width="700"
        :footer="null"
        :closable="false"
        @cancel="handlePopUpCancel()"
        @ok="handlePopUpOk()"
        >
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="21">
                <a-card class="white-card" :bordered="false">
                  <a-row>
                    <a-col :span="6"
                      ><span class="dated-time-schedule">
                        {{ _getFormatMoment(containerDate).format('HH:mm') }}</span
                      >
                    </a-col>
                    <a-col :span="10">
                      <div class="dateTimeBox">
                        <span class="daysName"><strong>{{
                          _getFormatMoment(containerDate).format('dddd')
                        }}</strong></span>
                        <br />
                        <span class="TodaysDate"><strong>{{
                          _getFormatMoment(containerDate).format('Do MMM YYYY')
                        }}</strong></span>
                      </div>
                    </a-col>
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="15">
                <a-card class="grey-card">
                  <a-card class="white-card">
                    <a-row class="row-height"><a-col :span="10"><strong>Patient: </strong></a-col><a-col :span="14">{{patientPUID}} - {{patientName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Room:</strong></a-col><a-col :span="14">{{roomName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Treatment:</strong></a-col><a-col :span="14">{{treatmentTypeName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Partner:</strong></a-col><a-col :span="14">{{ partner }}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>Container Date:</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(containerDate)).format('Do MMM YYYY') }}</a-col></a-row>
                    <a-row class="row-height">
                      <a-col :span="24">
                        <center>
                          <a-button
                            class="ant-btn ant-btn-primary"
                            @click="handlePopUpOk()"
                            style="padding: 2px 10px"
                          >Find New Time</a-button>
                        </center>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-card>
              </a-col>
            <a-col :span="9">
                <a-col v-for="user in filteredUsers" :key="user.id" class="col-height"><img class="img-responsive" :src="getImageUrl(getImageFineURL(user.userProfileImageUrl))" width="40" height="30" style="margin-right:15px" />{{ user.name }}</a-col>
            </a-col>
          </a-row>
      </a-modal> --> 
    </div>
  </template>
  <script>
  import moment from 'moment'
  import calendar from '~/components/calendars/index'
  import AppointmentServices from '~/services/API/AppointmentServices'
  import DoctorServices from '~/services/API/DoctorServices'
  import imagesHelper from '~/mixins/images-helper'
  import UserServices from '~/services/API/UserServices'
  import { isEmpty } from '~/services/Utilities'
  import routeHelpers from '~/mixins/route-helpers'
  import {
    _getFormatMoment,
    getMomentByStandardFormat,
    _disabledPreviousDate,
  } from '~/services/Helpers/MomentHelpers'
  export default {
    components: { calendar },
    mixins: [imagesHelper,routeHelpers],
    props: {
      form: {
        type: Object,
        default: () => ({}),
      },
      changes: { type: Object, default: () => {} },
    },
  
    data() {
      return {
        isCreated: false,
        loading: false,
        visibleModal: false,
        entity: {},
        events: [],
        manufacturerTreatment: {},
        moment,
        patientName:'',
        treatmentTypeName:'',
        patientPUID:'',
        dated:'',
        roomName:'',
        containerDate:'',
        partner:'',
        visibleBasicModalPopUp:false,
        visibleModalPopUp: false,
        availAbleEvents:[],
        combinedEvents:[],
        startDate:'',
        url:'',
        selectionModal:false,
        tim:'',
        userData:[],
        selectedUsers: [],
        filterUsers:[],
        changeEventData:{},
        treatments:{},
        emailIds:[],
        id:'',
        slotTime:'',
        isCollection:true,
        day:'',
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
      filteredUsers() {
        return this.userData.filter(user => this.selectedUsers.includes(user.id));
      }
    },
    mounted() {
        // this.handlePatient()
        // this.fetchEvents()
    },
    methods: {
      disabledDate: _disabledPreviousDate,
      isEmpty,
      async fetchEvents(arg, callback) {
        this.loading = true
        const appoint = await AppointmentServices.get({ ...arg})
        const coll = await AppointmentServices.getCollection({ ...arg})    
        const dt= new Date(this.changes.dated)
        const tm=_getFormatMoment(getMomentByStandardFormat(this.changes.dated)).format('HH:mm')
        const docData = await DoctorServices.getDoctorWithDays()
        const avail= await AppointmentServices.doctorData({...arg, doctorDTOs: docData.data, startDate: dt, startTime:tm})
        this.combinedEvents=[...appoint.data, ...avail.data, ...coll.data]
        callback(this.combinedEvents)
        this.loading = false 
      },
      _getFormatMoment,
      /* getDoctorsWithDays(changeData){
        console.log(changeData)
        const dt= new Date(changeData.dated)
        const tm=_getFormatMoment(getMomentByStandardFormat(changeData.dated)).format('HH:mm')
        DoctorServices.getDoctorWithDays().then((response)=>{
            AppointmentServices.doctorData({doctorDTOs: response.data, startDate: dt, startTime:tm}).then((secondResponse)=>{
                // console.log(secondResponse.data)
                this.availAbleEvents=secondResponse.data
            })
        })
      },
       handlePatient(){
        if (this.$route.query) {
            this.changeEventData = this.$route.query[0]
            // this.getDoctorsWithDays(this.changeEventData)
        }
      }, */
      getMomentByStandardFormat,
      getEventClick(detail) {
        console.log(detail)
        if(detail.event._def.extendedProps.globalId!=='00000000-0000-0000-0000-000000000000'){
          this.patientName=detail.event._def.extendedProps.patientName
          this.treatmentTypeName=detail.event._def.extendedProps.treatmentTypeName
          this.patientPUID=detail.event._def.extendedProps.patientId
          if(detail.event._def.extendedProps.isCollection===true){
            this.dated=detail.event._def.extendedProps.collectionDate
            this.slotTime=detail.event._def.extendedProps.collectionTime
            this.isCollection=true
          }else{
            this.dated=detail.event._def.extendedProps.appointmentDate
            this.slotTime=detail.event._def.extendedProps.appointmentTime
            this.isCollection=false
          }
          this.roomName=detail.event._def.extendedProps.roomName
          this.containerDate=detail.event._def.extendedProps.containerDate
          this.partner=detail.event._def.extendedProps.clientName
          this.day=detail.event._def.extendedProps.dayId
          this.filterUsers=detail.event._def.extendedProps.userDetailResponses
          this.changeEventData=[
            {
              patientName: this.patientName, 
              treatmentTypeName:this.treatmentTypeName,
              patientPUID:this.patientPUID,
              dated:this.dated,
              slotTIme:this.slotTIme,
              isCollection:this.isCollection,
              day:this.day,
              roomName:this.roomName,
              partner:this.partner,
              containerDate:this.containerDate,
              id:detail.event._def.publicId
            }
          ]
          this.visibleBasicModalPopUp=true
        }else{
          this.loading=true
          this.startDate=detail.event._def.extendedProps.appointmentDate
          this.tim=detail.event._def.title.split(' ')[0]
          // this.id=detail.event._def.publicId
          this.showSelectionPopUp()
        }
        /* this.patientName=detail.event._def.extendedProps.patientName
        this.treatmentTypeName=detail.event._def.extendedProps.treatmentTypeName
        this.patientPUID=detail.event._def.extendedProps.patientId
        this.dated=detail.event._def.extendedProps.appointmentDate
        this.roomName=detail.event._def.extendedProps.roomName
        this.containerDate=detail.event._def.extendedProps.appointmentDate
        this.partner=detail.event._def.extendedProps.clientName
        this.filteredUsers=detail.event._def.extendedProps.userDetailResponses
         this.changeEventData=[
          {
            patientName: this.patientName, 
            treatmentTypeName:this.treatmentTypeName,
            patientPUID:this.patientPUID,
            dated:this.dated,
            roomName:this.roomName,
            partner:this.partner,
            containerDate:this.containerDate,
          }
        ] */
        // this.visibleModalPopUp=true
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
    /* getBasicInfo(){
      if(!isEmpty(this.treatment.patient)){
        this.patientName=this.treatment.patient.name
        this.patientPUID=this.treatment.patient.enrollmentNumber
        this.treatmentTypeName=this.treatment.treatmentTypeName
        // this.selectionModal = true
      }else{
        console.log(this.$route.query)
        this.fetch(this.$route.query.treatment_id)
      }
    }, */
      getUsers(data){
      this.emailIds = []
      data.data.forEach((element) => {
            if (element.daysDTO.workingDays.length > 0) {
              this.emailIds.push(element.email);
            }
          });
      const dt= new Date(this.startDate)
      // const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')    
      UserServices.getUserByEmails({emails: this.emailIds, appointmentDate: dt, appointmentTime: this.tim})
        .then((response) => {
          this.userData = response.data
        })
        .finally(() => (this.loading = false)) 
    },      
    showPopUp(){
        this.visibleModalPopUp = true
    },
    async showSelectionPopUp(){
      // this.getBasicInfo()
      console.log(this.startDate)
      const dt= new Date(this.startDate)
      // const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      await this.getDoctors(dt.getDay() === 0 ? 7 : dt.getDay(),this.tim)
      // await this.getUsers()
      this.loading=false
      this.selectionModal = true
      // this.getUsers
      // this.selectionModal = true
    },
    handlePopUpOk() {
      this.visibleModalPopUp = false
      const dt= new Date(this.startDate)
      // console.log(this.startDate)
      // const tm=_getFormatMoment(getMomentByStandardFormat(this.startDate)).format('HH:mm')
      AppointmentServices.update(
        {
          personnelIds:this.selectedUsers,
          appointmentDate:this.startDate, 
          appointmentTime:this.tim,
          dayId:dt.getDay() ===0 ? 7 : dt.getDay(),
          roomName:'A2',
          id:this.changes.id,
          isCollection:this.changes.isCollection
        }, this.changes.id
        ).then((response)=>{
          this.goto('/hospital/schedule')
      })
    },
    handlePopUpCancel() {
      this.visibleModalPopUp = false
      this.selectionModal=true
      this.selectedUsers=[]
      // this.upsert(this.values)
    },
    handleSelectionOk(){
      this.selectionModal=false
      this.showPopUp()
    },
    handleSelectionCancel(){
      this.selectionModal=false
      this.selectedUsers=[]
      // this.showPopUp()
    },
    handleBasicPopUpCancel() {
        this.visibleBasicModalPopUp = false
      },
      handleBasicPopUpOk() {
        this.visibleBasicModalPopUp = false
        this.goto('/hospital/schedule/changeSchedule', this.changeEventData)
      },       
      getImageFineURL(url){
        if(url==null)
        {
          url="Uploads/default/11bf4d92-7774-411b-b240-5bb8bc60ebf8.jpeg"
        }
        return url.replace(/['"]+/g, '')
      },
      handleOk() {
        this.visibleModal = false
      },
    },
  }
  </script>
  <style scoped>
  .row-height {
    height: 30px;
  }
  .col-height {
    height: 35px;
    margin-left: 20px;
    margin-top: 15px;
  }
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
  