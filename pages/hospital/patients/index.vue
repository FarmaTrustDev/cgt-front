<template>
  <div>
    <div class="page-header clearfix">
      <h3 class="page-title pl-5 float-left">{{ translation.patient_list }}</h3>
      <a-button
        type="primary"
        class="mrm-5 float-right"
        @click="goto('patients/create')"
        >{{translation['AddNew_3_631']}}</a-button
      >
      <a-input
        ref="userNameInput"
        placeholder="Search"
        class="float-right page-search-input"
        @change="searchPatent"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </div>
    <div class="patient-page">
      <standardTable
        :columns="column"
        :api-service="PatientServices"
        :action-link="ActionLink"
        :rounded="true"
        :patient="true"
        :params="{ active: true }"
        @getFetch="getFetch"
        @fetchParent="fetch"
      />
    </div>
  </div>
</template>
<script>
import standardTable from '~/components/common/StandardTable'
import PatientServices from '~/services/API/PatientServices'
import routeHelpers from '~/mixins/route-helpers'
import translationHelpers from '~/mixins/translation-helpers'
const column = [
  {
    title: 'PUID',
    dataIndex: 'enrollmentNumber',
    key: 'PUID',
    width: 110,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
    },
  },
  {
    title: 'Patient Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    scopedSlots: {
      customRender: 'name',
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
    },
  },
  {
    title: 'Type',
    dataIndex: 'treatmentTypeId',
    key: 'treatmentTypeId',
    width: 100,
    scopedSlots: { customRender: 'treatmentTypeNameRender' },
  },
  {
    // title: 'Treatment Status',
    dataIndex: 'treatment_status',
    key: 'treatment_status',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'treatment_status' },
    width: '65%',
    class: 'treatment-status-col',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'patientAction' },
  },
]
const ActionLink = '/hospital/patients'
export default {
  components: { standardTable },
  mixins: [routeHelpers, translationHelpers],
  middleware: 'auth',
  data() {
    return {
      column,
      loading: false,
      PatientServices,
      ActionLink,
      borderCard: false,
      fetchPatientService: {},
    }
  },
  /* computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  }, */ 
  methods: {
    getFetch(fetch) {
      this.fetchPatientService = fetch
    },
    fetch(params) {
      this.fetchPatientService(params)
    },
    searchPatent(e) {
      const search = e.target.value
      this.fetch({ puid: search, name: search, TreatmentTypeName: search })
    },
  },
}
</script>
