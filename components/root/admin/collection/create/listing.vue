<template>
  <standardTable
    :columns="column"
    :api-service="ManufacturerTreatmentServices"
    :fetch-from="ManufacturerTreatmentServices.getTreatmentTypes"
    :action-link="actionLink"
    :button-name="translation.ProceAdmin_2_569"
  />
</template>
<script>
import standardTable from '~/components/common/StandardTable'
import ManufacturerTreatmentServices from '~/services/API/ManufacturerTreatmentServices'

// const ActionLink = '/manufacturer/administration/collections/treatment'
export default {
  components: { standardTable },
  props: {
    actionLink: {
      default: '',
      type: String,
      require: true,
    },
  },
  data() {
    return {
      column:[
  {
    title: `${this.$store.getters.getTranslation.ProceStep_2_486}`,
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    dataIndex: 'btn',
    scopedSlots: { customRender: 'btn' },
  },
],
      loading: false,
      ManufacturerTreatmentServices,
      borderCard: false,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  }, 
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[0].title=newValues.ProceStep_2_486
        this.column[1].title=newValues.Actio_1_220
      }
    }
  },   
  methods: {},
}
</script>
