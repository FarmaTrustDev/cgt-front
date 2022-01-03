<template>
  <div>
    <a-spin :spinning="loading">
      <FormActionButton text="Add" @click="addCollection" />
      <standardTable
        v-if="showTable"
        :columns="column"
        :params="params"
        :api-service="CollectionServices"
        @getFetch="getFetchListing"
        @clickDelete="deleteClick"
        @clickUpdate="clickUpdate"
      >
      </standardTable>
      <a-modal
        :destroy-on-close="true"
        :visible="showModal"
        title="Add Process Step"
        :footer="null"
        @cancel="handlesShowModal(false)"
      >
        <a-form :form="form" layout="horizontal" @submit="onSubmit">
          <FormField
            :type="type"
            :collection="collection"
            :treatment-type="treatmentType"
            @handlesShowModal="handlesShowModal"
          />
          <FormActionButton :is-created="isCreated" />
        </a-form>
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
import withCrud from '~/mixins/with-crud'
// import CollectionServices from '~/services/API/CollectionServices'
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
  mixins: [nullHelper, withCrud],
  props: { type: { type: Number, require: true, default: null } },
  data() {
    return {
      loading: true,
      showModal: false,
      showTable: false,
      column,
      CollectionServices,
      data: [],
      formLayout: 'vertical',
      treatmentType: {},
      params: { type: COLLECTION_TYPE.hospital.id },
      fetchMethod: null,
      collection: {},
      form: this.$form.createForm(this, {
        name: 'CollectionForm',
      }),
      apiService: CollectionServices,
      fetchIdFromParams: false,
      entity: {},
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
            active: true,
          }
          this.showTable = true
          this.$emit('fetchTreatmentName', this.treatmentType.name)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    handlesShowModal(show) {
      if (!show) {
        this.collection = {}
        this.isCreated = false
      }
      this.showModal = show
    },
    addCollection() {
      this.handlesShowModal(true)
    },
    getFetchListing(method) {
      this.fetchMethod = method
    },
    deleteClick(record) {
      this.loadEntityExternally(record)
      this.onDelete()
    },
    clickUpdate(record) {
      this.handlesShowModal(true)
      this.collection = record
      this.loadEntityExternally(record)
    },
    afterCreate(response) {
      this.afterUpsert()
    },
    afterUpsert() {
      this.fetchMethod(this.params)
      this.collection = {}
      this.isCreated = false
      this.handlesShowModal(false)
    },
    afterUpdate(response) {
      this.afterUpsert()
    },
    afterDelete() {
      this.afterUpsert()
    },
  },
}
</script>
