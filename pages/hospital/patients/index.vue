<template>
  <div>
    <div class="page-header">
      <h3 class="page-title pl-5 float-left">Patient List</h3>
      <a-button
        type="primary"
        class="mrm-5 float-right"
        @click="goto('patients/enrollment')"
        >Add New Patient</a-button
      >
      <a-input
        ref="userNameInput"
        placeholder="Search"
        class="float-right page-search-input"
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
      />
    </div>
  </div>
</template>
<script>
import standardTable from '~/components/common/StandardTable'
import PatientServices from '~/services/API/PatientServices'
import routeHelpers from '~/mixins/route-helpers'

const column = [
  {
    title: 'Patient ID',
    dataIndex: 'enrollmentNumber',
    key: 'enrollmentNumber',
  },
  {
    title: 'Patient Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
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
  mixins: [routeHelpers],
  data() {
    return {
      column,
      loading: false,
      PatientServices,
      ActionLink,
      borderCard: false,
    }
  },
  methods: {},
}
</script>
