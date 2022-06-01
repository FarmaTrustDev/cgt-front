<template>
  <standardTable
    :columns="column"
    :api-service="ManufacturerTreatmentServices"
    :fetch-from="ManufacturerTreatmentServices.getTreatmentTypes"
    :action-link="actionLink"
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
    title: `${this.$store.getters.getTranslation.Treat_1_29}`,
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
],
      loading: false,
      ManufacturerTreatmentServices,

      borderCard: false,
    }
  },
  methods: {},
}
</script>
