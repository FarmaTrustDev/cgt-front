<template>
  <page-layout
    :create="false"
    :loading="loading"
    title="Patients List"
    :bordered="borderCard"
  >
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
