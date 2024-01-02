<template>
<div>
    <h1 class="title">{{translation.PatieDetai_2_673}}</h1>
    <!-- <h3> Confirm Patient Details </h3> -->
    <a-card>
        <a-row class="white-card-smart-lab">
          <a-col :span="5" class="text-muted" >{{translation['FirstName:_2_838']}} </a-col><a-col :span="7"><h3>{{patientDetail.firstName}}</h3></a-col>
          <a-col :span="5" class="text-muted" >{{translation['LastName:_2_839']}} </a-col><a-col :span="7"><h3>{{patientDetail.lastName}}</h3></a-col>
        </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation.Email_1_840}} </a-col><a-col :span="7"><h3>{{patientDetail.email}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation['PhoneNo:_2_841']}} </a-col><a-col :span="7"><h3>{{patientDetail.phone}}</h3></a-col>
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation['DOB:_1_842']}} </a-col><a-col :span="7"><h3>{{_getFormatMoment(getMomentByStandardFormat(patientDetail.dob)).format('DD/MM/YYYY')}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation['Gende_1_843']}}</a-col><a-col :span="7"><h3>{{patientDetail.gender === 1 ? 'Male' : patientDetail.gender === 2 ? 'Female': 'N/A'}}</h3></a-col>
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation['BloodType:_2_844']}} </a-col><a-col :span="7"><h3>{{patientDetail.bloodType !== null ? patientDetail.bloodType : 'N/A'}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation['Heigh_1_845']}} </a-col><a-col :span="7"><h3>{{patientDetail.height}}</h3></a-col>
      </a-row>
        <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation.Weigh_1_846}} </a-col><a-col :span="7"><h3>{{patientDetail.weight !== null ? patientDetail.weight: 'N/A'}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation.Aller_1_847}} </a-col><a-col :span="7"><h3>{{patientDetail.allergies !== null ? patientDetail.allergies !== '' ? patientDetail.allergies: 'N/A': 'N/A'}}</h3></a-col>
      </a-row>
            <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation.Probl_1_848}} </a-col><a-col :span="7"><h3>{{patientDetail.problem !== null ? patientDetail.problem !== '' ? patientDetail.problem: 'N/A' : 'N/A'}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation.Medic_1_849}} </a-col><a-col :span="7"><h3>{{patientDetail.medication !== null ? patientDetail.medication !== '' ?  patientDetail.medication: 'N/A' : 'N/A'}}</h3></a-col>
      </a-row>
            <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation['PostCode:_2_850']}} </a-col><a-col :span="7"><h3>{{patientDetail.postCode}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation['City:_1_851']}} </a-col><a-col :span="7"><h3>{{patientDetail.city}}</h3></a-col>
      </a-row>
            <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation.Stree_1_852}} </a-col><a-col :span="7"><h3>{{patientDetail.street}}</h3></a-col>
        <a-col :span="5" class="text-muted" >{{translation.Count_1_853}}</a-col><a-col :span="7"><h3>{{patientDetail.county}}</h3></a-col>
        <!-- <a-col :span="4" class="text-muted" >Email: </a-col><a-col :span="4">{{patientDetail.Email}}</a-col> -->
      </a-row>
      <a-row class="white-card-smart-lab">
        <a-col :span="5" class="text-muted" >{{translation.PostaAddre_2_450}} </a-col><a-col :span="7"><h3>{{patientDetail.address}}</h3></a-col>
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
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
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