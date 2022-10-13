<template>
  <page-layout :loading="loading" title="Production Line">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ProductionLineServices"
        :action-link="ActionLink"
        :button-name="`Admin`"
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
    title: 'S.no',
    dataIndex: 'id',
    scopedSlots: {customRender : 'screeningId'},
  },
  {
    title: `${this.$store.getters.getTranslation.Name_1_138}`,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    dataIndex: 'btn',
    scopedSlots: { customRender: 'btn' },
  },
]
,
      ProductionLineServices,
      ActionLink,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[1].title=newValues.Name_1_138
        this.column[2].title=newValues.Actio_1_220
      }
    }
  },  
  methods: {},
}
</script>
