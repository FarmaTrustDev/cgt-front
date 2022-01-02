<template>
  <div>
    <FormActionButton text="Add" @click="addCollection" />
    <standardTable :columns="column" :api-service="PatientServices">
    </standardTable>
    <a-modal
      :destroy-on-close="true"
      :visible="showModal"
      title="Add Process Step"
      :footer="null"
      @cancel="handlesShowModal(false)"
    >
      <FormField />
    </a-modal>
  </div>
</template>

<script>
import standardTable from '~/components/common/StandardTable'
import PatientServices from '~/services/API/PatientServices'
import FormField from '~/components/root/manufacturer/admin/collection/FormField'
const column = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    width: '90%',
  },
  {
    title: 'Action',
    scopedSlots: { customRender: 'upsertDropdown' },
  },
]
export default {
  components: { standardTable, FormField },
  data() {
    return {
      showModal: false,
      column,
      PatientServices,
      data: [],
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'hospitalCollection',
      }),
      gotoLink: '/manufacturer/administration/collection/hospital',
    }
  },
  mounted() {},
  methods: {
    handlesShowModal(show) {
      this.showModal = show
    },
    addCollection(a, b) {
      this.handlesShowModal(true)
      console.log(a, b)
    },
  },
}
</script>
