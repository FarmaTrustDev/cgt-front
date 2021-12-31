<template>
  <page-layout :loading="loading" title="Patients List" :bordered="borderCard">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="PatientServices"
        :action-link="ActionLink"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import PatientServices from '~/services/API/PatientServices'
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
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  // {
  //   title: 'Treatment Type',
  //   dataIndex: 'treatment_type',
  //   key: 'treatment_type',
  // },
  {
    title: 'Treatment Status',
    dataIndex: 'treatment_status',
    key: 'treatment_status',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'treatment_status' },
    width: 200,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
const ActionLink = '/hospital/patients'
export default {
  components: { 'page-layout': PageLayout, standardTable },
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
