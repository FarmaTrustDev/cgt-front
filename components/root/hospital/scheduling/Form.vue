<template>
    <div>
      
      <h3 class="page-title">{{translation.MySched_2_859}}</h3>
      <div class="grey-card">
        <calendar
          :handle-date-click="fetchEvents"
          :disabled-date="disabledDate"
          @getEventClick="getEventClick"
        ></calendar>
      </div>
        <a-modal
        :visible="visibleModalPopUp"
        :ok-text="translation.Ok_1_663"
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
                    <a-row class="row-height"><a-col :span="10"><strong>{{translation.Patie_1_184}}: </strong></a-col><a-col :span="14">{{patientPUID}} - {{patientName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>{{translation['Room:_1_865']}}</strong></a-col><a-col :span="14">{{roomName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>{{translation.Treat_1_863}}</strong></a-col><a-col :span="14">{{treatmentTypeName}}</a-col></a-row>
                    <a-row class="row-height"><a-col :span="10"><strong>{{translation.Partn_1_864}}</strong></a-col><a-col :span="14">{{ partner }}</a-col></a-row>
                    <a-row class="row-height" v-if="isCollection"><a-col :span="10"><strong>{{translation['ContaDate:_2_867']}}</strong></a-col><a-col :span="14">{{ _getFormatMoment(getMomentByStandardFormat(dated)).format('Do MMM YYYY') }}</a-col></a-row>
                    <a-row class="row-height">
                      <a-col :span="24">
                        <center>
                          <a-button
                            class="ant-btn ant-btn-primary"
                            @click="handlePopUpOk()"
                            style="padding: 2px 10px"
                          >{{translation.FindNew_3_868}}</a-button>
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
      </a-modal> 
    </div>
  </template>
  <script>
  import moment from 'moment'
  import calendar from '~/components/calendars/index'
  import AppointmentServices from '~/services/API/AppointmentServices'
  import imagesHelper from '~/mixins/images-helper'
  import routeHelpers from '~/mixins/route-helpers'
  import {
    _getFormatMoment,
    getMomentByStandardFormat,
    _disabledPreviousDate,
  } from '~/services/Helpers/MomentHelpers'
  export default {
    components: { calendar },
    mixins: [routeHelpers,imagesHelper],
    props: {
      form: {
        type: Object,
        default: () => ({}),
      },
    },
  
    data() {
      return {
        isCreated: false,
        loading: false,
        visibleModal: false,
        entity: {},
        events: [],
        filteredUsers:[],
        manufacturerTreatment: {},
        moment,
        patientName:'',
        treatmentTypeName:'',
        patientPUID:'',
        dated:'',
        roomName:'',
        containerDate:'',
        partner:'',
        visibleModalPopUp: false,
        changeEventData:[],
        combinedEvents:[],
        isCollection:true,
        slotTime:'',
        day:'',
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    methods: {
      disabledDate: _disabledPreviousDate,
      async fetchEvents(arg, callback) {
        this.loading = true
        const appoint = await AppointmentServices.get({ ...arg}) 
        const coll= await AppointmentServices.getCollection({...arg})
        this.combinedEvents=[...appoint.data, ...coll.data]
        callback(this.combinedEvents)
        this.loading = false
        /* AppointmentServices.get({
          ...arg
        })
          .then((Appointment) => {
            // console.log(Appointment.data)
            callback(Appointment.data)
          })
          .catch(this.error)
          .finally(() => (this.loading = false)) */
      },
      _getFormatMoment,
      getMomentByStandardFormat,
      getEventClick(detail) {
        console.log(detail)
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
        this.filteredUsers=detail.event._def.extendedProps.userDetailResponses
        this.changeEventData=[
          {
            patientName: this.patientName, 
            treatmentTypeName:this.treatmentTypeName,
            patientPUID:this.patientPUID,
            dated:this.dated,
            slotTime:this.slotTime,
            isCollection:this.isCollection,
            roomName:this.roomName,
            partner:this.partner,
            dayId:this.day,
            containerDate:this.containerDate,
            id:detail.event._def.publicId
          }
        ]
        this.visibleModalPopUp=true
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
      handlePopUpCancel() {
        this.visibleModalPopUp = false
      },
      handlePopUpOk() {
        this.visibleModalPopUp = false
        this.goto('/hospital/schedule/changeSchedule', this.changeEventData)
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
  </style>
  