<template>
  <div>
    <a-spin :spinning="loading">
      <FormActionButton text="Add" @click="addCollection" />
      <standardTable :columns="column" :api-service="CollectionServices">
      </standardTable>
      <a-modal
        :destroy-on-close="true"
        :visible="showModal"
        title="Add Process Step"
        :footer="null"
        @cancel="handlesShowModal(false)"
      >
        <FormField :treatment-type="treatmentType" />
      </a-modal>
    </a-spin>
  </div>
</template>

<script>
import standardTable from '~/components/common/StandardTable'
import CollectionServices from '~/services/API/CollectionServices'
import TreatmentTypeServices from '~/services/API/TreatmentTypeServices'
import nullHelper from '~/mixins/null-helpers'
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
  mixins: [nullHelper],
  components: { standardTable, FormField },
  data() {
    return {
      loading: true,
      showModal: false,
      column,
      CollectionServices,
      data: [],
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'hospitalCollection',
      }),
      gotoLink: '/manufacturer/administration/collection/hospital',
      treatmentType: {},
    }
  },
  mounted() {
    this.checkCreated()
  },
  methods: {
    checkCreated() {
      const entityId = this.$route.params.id

      if (this.isGuid(entityId)) {
        this.fetchTreatmentType(entityId)
      }
    },
    fetchTreatmentType(entityId) {
      this.loading = true
      TreatmentTypeServices.getById(entityId)
        .then((response) => {
          this.treatmentType = response.data
          this.$emit('fetchTreatmentName', this.treatmentType.name)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    handlesShowModal(show) {
      this.showModal = show
    },
    addCollection(a, b) {
      this.handlesShowModal(true)
    },
  },
}
</script>
