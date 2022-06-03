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

const ActionLink = '/manufacturer/schedules'
export default {
  components: { 'page-layout': PageLayout, standardTable },
  data() {
    return {
      column:[
  {
    title: `${this.$store.getters.getTranslation.Treat_1_29}`,
    dataIndex: 'treatmentTypeName',
    key: 'treatmentTypeName',
  },
  {
    title: `${this.$store.getters.getTranslation.Price_1_73}`,
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: `${this.$store.getters.getTranslation.Descr_1_69}`,
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
],
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
