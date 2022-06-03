<template>
  <page-layout :loading="loading" title="Production Line">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ProductionLineServices"
        :action-link="ActionLink"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import ProductionLineServices from '~/services/API/ProductionLineServices'
const ActionLink = '/manufacturer/administration/productionLine'

export default {
  components: { 'page-layout': PageLayout, standardTable },
  data() {
    return {
      loading: false,
      column:[
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: `${this.$store.getters.getTranslation.Name_1_138}`,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
,
      ProductionLineServices,
      ActionLink,
    }
  },
  methods: {},
}
</script>
