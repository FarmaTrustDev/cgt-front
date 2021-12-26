<template>
  <page-layout :loading="loading" title="Treatments">
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
    title: 'Id',
    dataIndex: 'enrollmentNumber',
    key: 'enrollmentNumber',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Age',
    dataIndex: 'dob',
    key: 'dob',
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
    }
  },
  methods: {},
}
</script>
