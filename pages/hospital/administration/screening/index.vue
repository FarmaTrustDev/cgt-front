<template>
  <page-layout
    :loading="loading"
    :create="false"
    title="Screening Question"
    class="container"
  >
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ScreeningTemplateServices"
        :action-link="ActionLink"
        :isHospital="true"
        :button-name="translation.ProceAdmin_2_569"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
const ActionLink = '/hospital/administration/screening'
export default {
  components: { 'page-layout': PageLayout, standardTable },
  data() {
    return {
      loading: false,
      column: [
        {
          title: `${this.$store.getters.getTranslation.Manuf_1_89}`,
          dataIndex: 'manufacturer',
          key: 'hospitals',
          scopedSlots: { customRender: 'nameTags' },
        },
        {
          title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
          dataIndex: 'treatmentType.name',
          key: 'treatmentType.Name',
        },
        {
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'active',
          key: 'active',
          scopedSlots: { customRender: 'active' },
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'btn',
          scopedSlots: { customRender: 'btn' },
        },
      ],
      ScreeningTemplateServices,
      ActionLink,
    }
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[0].title=newValues.Manuf_1_89
        this.column[1].title=newValues.TreatType_2_67
        this.column[2].title=newValues.Statu_1_202
        this.column[3].title=newValues.Actio_1_220
      }
    }
  },  
  methods: {},
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
