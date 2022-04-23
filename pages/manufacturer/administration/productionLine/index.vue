<template>
  <page-layout :loading="loading" title="Screenings">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="LabServices"
        :action-link="ActionLink"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import LabServices from '~/services/API/LabServices'
const ActionLink = '/manufacturer/administration/screening'
const column = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  components: { 'page-layout': PageLayout, standardTable },
  data() {
    return {
      loading: false,
      column,
      LabServices,
      ActionLink,
    }
  },
  methods: {},
}
</script>
