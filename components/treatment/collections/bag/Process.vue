<template>
  <div>
    <a-form :form="form" layout="horizontal">
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="collections"
        :pagination="false"
        :loading="loading"
        class="square-table collect-sample-data"
      >
        <template slot="collected" slot-scope="name, row">
          <!-- {{ row }} -->
          <a-form-item>
            <a-switch
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][collect]`,
                {
                  initialValue: row.isCollected,
                  valuePropName: 'checked',
                },
              ]"
              size="large"
              class="toggle_record"
              :checked-children="translation.yes_1_654"
              :un-checked-children="translation.no_1_656"
            />

            <a-icon v-else type="check" class="icon-check"></a-icon>
          </a-form-item>
        </template>
        <template slot="notes" slot-scope="name, row">
          <a-form-item class="notes-body">
            <a-input
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][notes]`,
                {
                  initialValue: row.notes,
                },
              ]"
              placeholder="Notes"
            />
            <span v-else>{{ row.notes }}</span>
            <a-input
              v-decorator="[
                `collection[id-${row.id}][id]`,
                {
                  initialValue: row.id,
                },
              ]"
              disabled
            />
            <!-- type="hidden" -->

          </a-form-item>
        </template>

        <template slot="uploader" slot-scope="name, row">
          <InstantUpload
            :saved-list="row.uploads"
            :action="bagService.uploads(row.id)"
            class="upload-file"
          />
        </template>
        <template slot="action" slot-scope="name, row">
          <!-- shape="round" icon="sync" -->
          <button
            :disabled="row.isCollected || btnLoading"
            :loading="loading"
            class="btn-send ant-btn ant-btn-primary"
            type="primary"
            @click="handleCollectionSubmit(row)"
          >
            Confirm
          </button>
          <a-button
            v-if="row.isCollected"
            type="primary"
            class="btn-send-mail"
            @click="handleEmailModal(true, row)"
            >Send Email</a-button
          >
        </template>
      </a-table>
    </a-form>
    <a-modal
      title="Notify"
      :footer="null"
      :destroy-on-close="true"
      :visible="showEmailModal"
      @cancel="handleEmailModal(false)"
    >
      <email
        :content="{ body }"
        :bag-id="bagId"
        @closeModal="handleEmailModal"
      />
    </a-modal>
  </div>
</template>
<script>
import BagCollectionServices from '~/services/API/BagCollectionServices'
import notifications from '~/mixins/notifications'
import Email from '~/components/treatment/collections/bag/Email'
import InstantUpload from '~/components/upload/InstantUpload'

export default {
  components: { Email, InstantUpload },
  mixins: [notifications],
  props: {
    collections: { required: true, type: Array },
    bagId: { required: true, type: String },
    bagKeyId: { required: true, type: Number },
  },
  data() {
    return {
      
      columns: [
        {
          title: `${this.$store.getters.getTranslation.Detai_1_346}`,
          dataIndex: 'name',
          width: '30%',
        },
        {
          title: `${this.$store.getters.getTranslation.Check_1_454}`,
          dataIndex: 'collected',
          scopedSlots: { customRender: 'collected' },
        },
        {
          title: `${this.$store.getters.getTranslation.Notes_1_350}`,
          dataIndex: 'notes',
          scopedSlots: { customRender: 'notes' },
        },
        {
          title: 'Upload',
          scopedSlots: { customRender: 'uploader' },
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),
      btnLoading: false,
      showEmailModal: false,
      body: null,
      bagService: BagCollectionServices,
    }
  },
  computed: {
    // title() {
    //   return this.$store.getters.getTranslation.Notes_1_350.dataIndex
    // },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    handleCollectionSubmit(collection) {
      const fields = this.form.getFieldsValue()
      this.btnLoading = true
      const values = fields.collection[`id-${collection.id}`]
      if (values) {
        BagCollectionServices.update(collection.id, values)
          .then((response) => {
            this.success(response.message)
            this.btnLoading = false
            this.fetchBags(this.bagKeyId)
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    },
    fetchBags(bagKeyId) {
      this.$emit('fetchBags',bagKeyId)
      this.activeTab = bagKeyId
    },
    handleEmailModal(show, data) {
      if (show) {
        this.body = `${data.name} has been completed against  by Bag ${this.bagId} `
        // console.log(message)
      }
      this.showEmailModal = show
    },
  },
}
</script>
<style scoped>
.upload-file {
  margin: 8px 0;
  width: 55px;
  display: block;
}
.notes-body {
  /* width: 68%; */
  width: 180px;
  margin: auto;
  height: 55px;
  overflow: hidden;
  background: #ececec;
  border-radius: 28px;
  padding: 0 !important;
}
.icon-check {
  color: green;
}
</style>
