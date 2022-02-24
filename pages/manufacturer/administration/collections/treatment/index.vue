<template>
  <page-layout
    :create="false"
    :loading="loading"
    title="Treatment Collection Process"
    :bordered="borderCard"
  >
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ManufacturerTreatmentServices"
        :fetch-from="ManufacturerTreatmentServices.getTreatmentTypes"
        :action-link="ActionLink"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import ManufacturerTreatmentServices from '~/services/API/ManufacturerTreatmentServices'
const column = [
  {
    title: 'Treatment Name',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
const ActionLink = '/manufacturer/administration/collections/treatment'
export default {
  components: { 'page-layout': PageLayout, standardTable },
  data() {
    return {
      column,
      loading: false,
      ManufacturerTreatmentServices,
      ActionLink,
      borderCard: false,
    }
  },
  methods: {},
}
</script>
