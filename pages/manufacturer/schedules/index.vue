<template>
  <page-layout :loading="loading" :title="translation.Treat_1_29">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ManufacturerTreatmentServices"
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
    dataIndex: 'treatmentTypeName',
    key: 'treatmentTypeName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
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
      ManufacturerTreatmentServices,
      ActionLink,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {},
}
</script>
