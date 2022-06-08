<template>
  <div>
    <a-form :form="form" layout="horizontal">
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="collections"
        :pagination="false"
        :loading="loading"
        class="square-table"
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
              :checked-children="translation.yes_1_654"
              :un-checked-children="translation.no_1_656"
            />

            <a-icon v-else type="check"></a-icon>
          </a-form-item>
        </template>
        <template slot="notes" slot-scope="name, row">
          <a-form-item>
            <a-input
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][notes]`,
                {
                  initialValue: row.notes,
                },
              ]"
              :placeholder="translation.Enternote_3_546+':'"
            />
            <span v-else>{{ row.notes }}</span>
            <a-input
              v-decorator="[
                `collection[id-${row.id}][id]`,
                {
                  initialValue: row.id,
                },
              ]"
              type="hidden"
            />
          </a-form-item>
        </template>

        <template slot="uploader" slot-scope="name, row">
          <InstantUpload
            :saved-list="row.uploads"
            :action="bagService.uploads(row.id)"
          />
        </template>
        <template slot="action" slot-scope="name, row">
          <a-button
            :disabled="row.isCollected || btnLoading"
            shape="round"
            icon="sync"
            @click="handleCollectionSubmit(row)"
          />
          <a-button
            v-if="row.isCollected"
            type="primary"
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
  },
  data() {
    return {
      columns:[
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
  computed:{
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
            this.$emit('fetchBags')
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
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
