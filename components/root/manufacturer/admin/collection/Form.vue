<template>
  <div>
    <a-spin :spinning="loading">
      <FormActionButton text="Add" @click="addCollection" />
      <standardTable
        v-if="showTable"
        :columns="column"
        :params="params"
        :api-service="CollectionServices"
        @getFetch="getFetch"
      >
      </standardTable>
      <a-modal
        :destroy-on-close="true"
        :visible="showModal"
        title="Add Process Step"
        :footer="null"
        @cancel="handlesShowModal(false)"
      >
        <FormField
          :treatment-type="treatmentType"
          @handlesShowModal="handlesShowModal"
        />
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
import { COLLECTION_TYPE } from '~/services/Constant'

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
  mixins: [nullHelper],
  data() {
    return {
      loading: true,
      showModal: false,
      showTable: false,
      column,
      CollectionServices,
      data: [],
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'hospitalCollection',
      }),
      gotoLink: '/manufacturer/administration/collection/hospital',
      treatmentType: {},
      params: { type: COLLECTION_TYPE.hospital.id },
      fetchMethod: null,
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
          this.params = {
            ...this.params,
            treatmentTypeId: this.treatmentType.id,
          }
          this.showTable = true
          this.$emit('fetchTreatmentName', this.treatmentType.name)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    handlesShowModal(show) {
      if (!show) {
        this.fetchMethod(this.params)
      }
      this.showModal = show
    },
    addCollection(a, b) {
      this.handlesShowModal(true)
    },
    getFetch(method) {
      this.fetchMethod = method
    },
  },
}
</script>
