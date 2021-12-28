<template>
  <page-layout :loading="loading" title="Screenings">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ScreeningTemplateServices"
        :action-link="ActionLink"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
const ActionLink = '/manufacturer/administration/screening'
const column = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Hospitals',
    dataIndex: 'hospitals',
    key: 'hospitals',
       scopedSlots: { customRender: 'nameTags' },
  },
  {
    title: 'Treatment Type',
    dataIndex: 'treatmentType.name',
    key: 'treatmentType.Name',
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
      ScreeningTemplateServices,
      ActionLink,
    }
  },
  methods: {},
}
</script>
