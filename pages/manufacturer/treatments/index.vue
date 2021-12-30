<template>
  <page-layout :loading="loading" title="Treatments">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="SchedulingServices"
        :action-link="ActionLink"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import SchedulingServices from '~/services/API/SchedulingServices'
const column = [
  {
    title: 'Patient Id',
    dataIndex: 'patientEnrollmentId',
    key: 'patientEnrollmentId',
  },
  {
    title: 'Treatment Type',
    dataIndex: 'treatmentType.name',
    key: 'TreatmentName',
  },
  {
    title: 'Organization',
    dataIndex: 'hospital.name',
    key: 'OrganizationName',
  },
  {
    title: 'Collection - Delivery Date',
    dataIndex: 'collectionDateDeliveryDate',
    key: 'collectionDateDeliveryDate',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
const ActionLink = '/manufacturer/schedules'
export default {
  components: { 'page-layout': PageLayout, standardTable },
  data() {
    return {
      column,
      loading: false,
      SchedulingServices,
      ActionLink,
    }
  },
  methods: {},
}
</script>
