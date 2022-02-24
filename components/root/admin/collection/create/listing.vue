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
const column = [
  {
    title: 'Treatment Name',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
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
      column,
      loading: false,
      ManufacturerTreatmentServices,

      borderCard: false,
    }
  },
  methods: {},
}
</script>
