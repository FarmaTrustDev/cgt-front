<template>
  <page-layout :loading="loading" :title="translation.Scree_1_679">
    <template slot="content">
      <standardTable
        :columns="column"
        :api-service="ScreeningTemplateServices"
        :action-link="ActionLink"
        :button-name="translation.ProceAdmin_2_569"
      />

    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import standardTable from '~/components/common/StandardTable'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
const ActionLink = '/manufacturer/administration/screening'
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
          title: `${this.$store.getters.getTranslation.Hospi_1_47}`,
          dataIndex: 'hospitals',
          key: 'hospitals',
            scopedSlots: { customRender: 'nameTags' },
        },
        {
          title: `${this.$store.getters.getTranslation.TreatType_2_67}`,
          dataIndex: 'treatmentType.name',
          key: 'treatmentType.Name',
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
        this.column[1].title=newValues.Hospi_1_47
        this.column[2].title=newValues.TreatType_2_67
        this.column[3].title=newValues.Actio_1_220
      }
    }
  },  
  methods: {},
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
