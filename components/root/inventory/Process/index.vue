<template>
  <div class="collection-processing-steps">
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
              :checked-children="translation.yes_1_654"
              :un-checked-children="translation.no_1_656"
            />

            <a-icon
              v-else
              class="text-success"
              style="font-size: 16px"
              type="check"
            ></a-icon>
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
              :placeholder="translation.Enternote_3_546"
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

        <template slot="email" slot-scope="name, row">
          <InstantUpload
            :saved-list="row.uploads"
            :action="bagService.uploads(row.id)"
            :show-button="false"
          >
            <a-button slot="button" type="">
              <a-icon type="upload" /> Upload
            </a-button>
          </InstantUpload>
        </template>
        <template slot="action" slot-scope="name, row">
          <a-button
            :disabled="row.isCollected || btnLoading"
            shape="round"
            icon="sync"
            @click="handleCollectionSubmit(row)"
          />
        </template>
      </a-table>
    </a-form>
    <a-form-item class="mt-15">
      <FormActionButton @click="submit" :disabled="buttonEnable" />
    </a-form-item>
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
    <a-modal
      :width="1200"
      :footer="null"
      :visible="showQuarantine"
      title="Select quarantine storage:"
      @cancel="handleQuarantineModal(false)"
    >
      <!-- <showQuarantine /> -->
      <div>
        <Quarantine @submit="handleQuarantineSubmit" />
      </div>
    </a-modal>
  </div>
</template>
<script>
import BagCollectionServices from '~/services/API/BagCollectionServices'
import notifications from '~/mixins/notifications'
import Email from '~/components/treatment/collections/bag/Email'
import Quarantine from '~/components/inventory/quarantine'
import InstantUpload from '~/components/upload/InstantUpload'
import { QUARANTINE_STORAGE } from '~/services/Constant'
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: { Email, InstantUpload, Quarantine },
  mixins: [notifications, routeHelpers],
  props: {
    collections: { required: true, type: Array },
    bagId: { required: true, type: String },
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
          title: 'Sign',
          scopedSlots: { customRender: 'email' },
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
      showQuarantine: false,
      buttonEnable: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    submit() {
      this.goto('/inventory/storage/tasks')
    },
    handleCollectionSubmit(collection) {
      const fields = this.form.getFieldsValue()

      const values = fields.collection[`id-${collection.id}`]

      if (collection.alias === QUARANTINE_STORAGE && values.collect) {
        this.handleQuarantineModal(true)
        // this.$emit('updateId', collection.id)
        return false
      }
      this.buttonEnable = false
      this.btnLoading = true
      if (values) {
        this.success('Update Successfully')
        this.$emit('updateId', collection.id)
        // BagCollectionServices.update(collection.id, values)
        //   .then((response) => {
        //     this.success("Update Successfully")
        //     this.$emit('fetchBags')
        //     this.btnLoading = false
        //   })
        //   .catch(() => {
        //     this.btnLoading = false
        //   })
        this.btnLoading = false
      }
    },
    handleEmailModal(show, data) {
      if (show) {
        this.body = `${data.name} has been completed against  by Bag ${this.bagId} `
        // console.log(message)
      }
      this.showEmailModal = show
    },
    handleQuarantineModal(show) {
      this.showQuarantine = show
    },
    handleQuarantineSubmit() {
      this.handleQuarantineModal(false)
      this.buttonEnable = true
    },
  },
}
</script>
