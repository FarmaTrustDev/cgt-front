<template>
<div>
    <h1 class="title">Patient Details</h1>
    <h3> Confirm Patient Details </h3>
    <a-card>
      <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >First Name: </a-col><a-col :span="6">{{patientDetail.firstName}}</a-col>
        <a-col :span="6" class="text-muted" >Last Name: </a-col><a-col :span="6">{{patientDetail.lastName}}</a-col>
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Email: </a-col><a-col :span="6">{{patientDetail.Email}}</a-col>
        <a-col :span="6" class="text-muted" >Phone No: </a-col><a-col :span="6">{{patientDetail.phone}}</a-col>
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >DOB: </a-col><a-col :span="6">{{getDateFormat(patientDetail.dOB)}}</a-col>
        <a-col :span="6" class="text-muted" >Gender: </a-col><a-col :span="6">{{patientDetail.gender === 1 ? 'Male' : patientDetail.gender === 2 ? 'Female': 'N/A'}}</a-col>
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Blood Type: </a-col><a-col :span="6">{{patientDetail.bloodType !== null ? patientDetail.bloodType : 'N/A'}}</a-col>
        <a-col :span="6" class="text-muted" >Height: </a-col><a-col :span="6">{{patientDetail.height}}</a-col>
      </a-row>
        <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Weight: </a-col><a-col :span="6">{{patientDetail.weight}}</a-col>
        <a-col :span="6" class="text-muted" >Allergies: </a-col><a-col :span="6">{{patientDetail.allergies}}</a-col>
      </a-row>
            <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Problem: </a-col><a-col :span="6">{{patientDetail.problem}}</a-col>
        <a-col :span="6" class="text-muted" >Medication: </a-col><a-col :span="6">{{patientDetail.medication}}</a-col>
      </a-row>
            <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Post Code: </a-col><a-col :span="6">{{patientDetail.postCode}}</a-col>
        <a-col :span="6" class="text-muted" >City: </a-col><a-col :span="6">{{patientDetail.City}}</a-col>
      </a-row>
            <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Street: </a-col><a-col :span="6">{{patientDetail.street}}</a-col>
        <a-col :span="6" class="text-muted" >County: </a-col><a-col :span="6">{{patientDetail.County}}</a-col>
        <!-- <a-col :span="4" class="text-muted" >Email: </a-col><a-col :span="4">{{patientDetail.Email}}</a-col> -->
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="6" class="text-muted" >Address: </a-col><a-col :span="6">{{patientDetail.address}}</a-col>
      </a-row>
    </a-card>
  </div>
  </template>
  <script> 
    import moment from 'moment'
  export default {
    props:{
      patientDetail: {type: Object, required: true}
    },
    data()
    {
      return {
        loading: false,
        moment,
      }
    },
    methods: {
    getDateFormat(date) {
      return moment(String(date)).format(' DD/MM/YYYY')
    },
  },
  }
  </script>
  <style scoped>
    .ant-col-6{
  color: black;
    }
  </style>