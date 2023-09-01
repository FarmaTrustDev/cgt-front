<template>
    <div>
        <h1 class="title">Patient Details</h1>
        <!-- <h3> Confirm Patient Details </h3> -->
        <a-card>
            <a-row class="white-card-smart-lab">
              <a-col :span="5" class="text-muted" >First Name: </a-col><a-col :span="7"><h3>{{patientDetail.firstName}}</h3></a-col>
              <a-col :span="5" class="text-muted" >Last Name: </a-col><a-col :span="7"><h3>{{patientDetail.lastName}}</h3></a-col>
            </a-row>
          <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Email: </a-col><a-col :span="7"><h3>{{patientDetail.email}}</h3></a-col>
            <a-col :span="5" class="text-muted" >Phone No: </a-col><a-col :span="7"><h3>{{patientDetail.phone}}</h3></a-col>
          </a-row>
          <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >DOB: </a-col><a-col :span="7"><h3>{{_getFormatMoment(getMomentByStandardFormat(patientDetail.dOB)).format('DD/MM/YYYY')}}</h3></a-col>
            <a-col :span="5" class="text-muted" >Gender: </a-col><a-col :span="7"><h3>{{patientDetail.gender === 1 ? 'Male' : patientDetail.gender === 2 ? 'Female': 'N/A'}}</h3></a-col>
          </a-row>
          <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Blood Type: </a-col><a-col :span="7"><h3>{{patientDetail.bloodType !== null ? patientDetail.bloodType : 'N/A'}}</h3></a-col>
            <a-col :span="5" class="text-muted" >Height: </a-col><a-col :span="7"><h3>{{patientDetail.height}}</h3></a-col>
          </a-row>
            <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Weight: </a-col><a-col :span="7"><h3>{{patientDetail.weight !== null ? patientDetail.weight: 'N/A'}}</h3></a-col>
            <a-col :span="5" class="text-muted" >Allergies: </a-col><a-col :span="7"><h3>{{patientDetail.allergies !== null ? patientDetail.allergies !== '' ? patientDetail.allergies: 'N/A': 'N/A'}}</h3></a-col>
          </a-row>
                <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Problem: </a-col><a-col :span="7"><h3>{{patientDetail.problem !== null ? patientDetail.problem !== '' ? patientDetail.problem: 'N/A' : 'N/A'}}</h3></a-col>
            <a-col :span="5" class="text-muted" >Medication: </a-col><a-col :span="7"><h3>{{patientDetail.medication !== null ? patientDetail.medication !== '' ?  patientDetail.medication: 'N/A' : 'N/A'}}</h3></a-col>
          </a-row>
                <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Post Code: </a-col><a-col :span="7"><h3>{{patientDetail.postCode}}</h3></a-col>
            <a-col :span="5" class="text-muted" >City: </a-col><a-col :span="7"><h3>{{patientDetail.city}}</h3></a-col>
          </a-row>
                <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Street: </a-col><a-col :span="7"><h3>{{patientDetail.street}}</h3></a-col>
            <a-col :span="5" class="text-muted" >County: </a-col><a-col :span="7"><h3>{{patientDetail.county}}</h3></a-col>
            <!-- <a-col :span="4" class="text-muted" >Email: </a-col><a-col :span="4">{{patientDetail.Email}}</a-col> -->
          </a-row>
          <a-row class="white-card-smart-lab">
            <a-col :span="5" class="text-muted" >Address: </a-col><a-col :span="7"><h3>{{patientDetail.address}}</h3></a-col>
          </a-row>
        </a-card>
      </div>
      </template>
      <script> 
    import {_getFormatMoment, getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
      export default {
        props:{
          patientDetail: {type: Object, required: true}
        },
        data()
        {
          return {
            loading: false,
          }
        },
        methods: {
          getMomentByStandardFormat,
          _getFormatMoment,
      },
      }
      </script>
      <style scoped>
        .ant-col-6{
      color: black;
        }
        .ant-col-5 {
        font-size: larger;
    }
    h1, h2, h3, h4, h5, h6 {
        color: black;
    }
      </style>