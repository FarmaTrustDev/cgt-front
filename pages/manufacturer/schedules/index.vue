<template>
  <page-layout :loading="loading" :title="translation.Treat_1_29" class="specific-card-x container manf-schedule">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ManufacturerTreatmentServices"
        :action-link="ActionLink"
        :button-name = "translation['ManagAvail_2_77']"
        
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
    dataIndex: 'btn',
    scopedSlots: { customRender: 'btn' },
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
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[0].title=newValues.Treat_1_29
        this.column[1].title=newValues.Price_1_73
        this.column[2].title=newValues.Descr_1_69
        this.column[3].title=newValues.Actio_1_220
      }
    }
  },    
  methods: {},
}
</script>
