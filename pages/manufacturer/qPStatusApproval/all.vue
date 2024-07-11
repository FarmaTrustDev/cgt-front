<template>
    <a-table :loading="loading" :columns="column" :data-source="data">
      <template slot="arrivalDate" slot-scope="arrivalDate">
            {{ arrivalDate.arrivalDate }} - {{ arrivalDate.expiryDate  }}
      </template>
      <template slot="status" slot-scope="status, record">
            {{ user.roleName === 'CDMO' ? record.cdmoqpStatus : record.cmcqpStatus }}
      </template>
    </a-table>
</template>
<script>
import SchedulingServices from '~/services/API/SchedulingServices'
import {
    _getPastMomentStandardFormatted,
    _getFutureMomentStandardFormatted,
  } from '~/services/Helpers/MomentHelpers'
import { SCHEDULING_STATUSES } from '~/services/Constant'
export default {
  data() {
    return {
      column: [
        {
          title: `${this.$store.getters.getTranslation.PatieID_2_264}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
          scopedSlots:{customRender: 'pUIDRender'}
        },
        {
          title: `Patient Name`,
          dataIndex: 'patient.name',
          key: 'patientName'
        },
        {
          title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
          dataIndex: 'treatmentType.name',
          key: 'TreatmentName',
          scopedSlots: { customRender: 'treatmentTypeNameRender' },
        },
        {
          title: `${this.$store.getters.getTranslation.Organ_1_166}`,
          dataIndex: 'hospital.name',
          key: 'OrganizationName',
        },
        {
          title: `${this.$store.getters.getTranslation['Colle-_4_268']}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status',
          },
        },
        
      ],
      loading: false,
      data: [],
      params: {
        manufacturerStatus: SCHEDULING_STATUSES.accepted.id,
        start: _getPastMomentStandardFormatted(2, 'month'),
        end: _getFutureMomentStandardFormatted(2, 'month'),
        active: true,
      },
    }
  },
  computed: {
    user(){
      return this.$store.getters.getUser
    },
  },
  watch:{
  },  
  mounted(){
    this.getAll()
  },
  methods: {
    getAll(params = {}){
      this.loading = true
      if(this.user.roleName === 'CDMO'){
        SchedulingServices.getCDMOQPAll({ ...this.params, ...params}).then((response) => {
            this.data = response.data
        }).catch(this.error).finally(this.loading = false)
      }else{
        SchedulingServices.getCMCQPAll({ ...this.params, ...params}).then((response) => {
            this.data = response.data
        }).catch(this.error).finally(this.loading = false)
      }
      /* QPStatusServices.getAll().then((response)=>{
        this.data = response.data
      }).catch(this.error).finally(this.loading = false) */
    }
  },
}
</script>