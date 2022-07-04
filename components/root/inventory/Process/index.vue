<template>
  <div class="collection-processing-steps" style="margin-top:10px">
    <a-form :form="form" layout="horizontal">
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="collections"
        :pagination="false"
        :loading="loading"
        class="rounded-table"
      >
        <template slot="collected" slot-scope="name, row">
          <!-- {{ row }} -->
          <a-form-item class="mt-20">
            <a-switch
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][collect]`,
                {
                  initialValue: row.isCollected,
                  valuePropName: 'checked',
                  rules: [
                    {
                      required: !notesRequired[row.id],
                      message: '',
                    },
                  ],
                },
              ]"
              :checked-children="translation.yes_1_654"
              :un-checked-children="translation.no_1_656"
              @change="(value) => handleCheck(value, row.id)"
            />

            <a-icon
              v-else
              class="text-success"
              style="font-size: 1rem"
              type="check"
            ></a-icon>
          </a-form-item>
        </template>
        <template slot="notes" slot-scope="name, row">
          <a-form-item class="mt-20">
            <a-input
              v-if="!row.isCollected"
              v-decorator="[
                `collection[id-${row.id}][notes]`,
                {
                  initialValue: row.notes,
                  rules: [
                    {
                      required: !notesRequired[row.id],
                      message: '',
                    },
                  ],
                },
              ]"
              :placeholder="translation.Enternote_3_546"
              @blur="(e) => handleInput(row.id,e)"
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
              <a-icon type="upload" />
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

    <a-form-item class="mt-15">
      <FormActionButton
        :disabled="buttonEnable"
        text="Submit"
        @click="submit"
      />
    </a-form-item>
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


    <a-modal
      title="You have left option(s) 'No'."
      :visible="showQuaranitineModal"
      @cancel="handleErrorShowModal(false)"
    >
      <p v-if="inboundCheck">Do you want to quarantine the sample?</p>
      <template #footer>
        <a-button key="back" @click="handleErrorShowModal(false)">No</a-button>
        <a-button v-if="inboundCheck" key="submit" type="primary" :loading="loading" @click="handleErrorShowModal(false), handleQuarantineModal(true)">Yes</a-button>
      </template>      
    </a-modal>
    <a-modal
      :width="1200"
      :footer="null"
      :visible="showQuarantine"
      title="Select quarantine storage:"
      @cancel="handleQuarantineModal(false)"
    >
      <!-- <showQuarantine /> -->
      <a-form-item>
        <Quarantine text="Submit" @submit="handleQuarantineSubmit" />
      </a-form-item>
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
    activeTab: { type: String },
    typeId: { type: String },
  },
  data() {
    return {
      columns: [
        {
          title: `Questions`,
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
          title: 'Supporting Documents',
          scopedSlots: { customRender: 'email' },
        },
        /* {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          scopedSlots: { customRender: 'action' },
        }, */
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
      notesRequired: {},
      filledData:0,
      noteItem:[],
      showQuaranitineModal:false,
      inboundCheck:false,      
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    submit() {
      this.form.validateFields((err,values)=>{
        if(!err){
          // console.log(this.typeId)
          if ((this.typeId === 'inbound') || (this.typeId === 'quarantine')) {
            this.goto('/inventory/storage/ColorFridge?inbound=true')
          }
          if (this.typeId === 'outbound') {
            this.$emit('handleActiveTab', 'COURIER')
            // this.goto('/inventory/treatment/outboundProcess?view=COURIER')
          }
        }else{
          if(this.typeId==='inbound'){
            this.inboundCheck=true
            this.showQuaranitineModal=true
          }
          if(this.typeId!=='inbound'){
            this.error()
          }
          
          // console.log(this.typeId)
          // alert("You have missed the option(s) 'No'. Do you want to quarantine the sample?")
        }
      })
    },
    handleCollectionSubmit(collection) {
      // console.log(collection.alias)
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
    handleCheck(value, rowId,alias) {
      // console.log(alias)
      const notesRequired = this.notesRequired
      notesRequired[rowId] = value
      this.notesRequired = notesRequired
      if(value===true){
        this.filledData=this.filledData+1
      }else{
        this.filledData=this.filledData-1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      // this.sendData(this.filledData)
    },
    handleInput(rowId,e) {
      if(this.noteItem.includes(rowId)){
        this.noteItem.splice(this.noteItem.indexOf(rowId),1);
        this.filledData=this.filledData - 1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      if(!this.notesRequired[rowId] && e.target.value!==null){
        // console.log(this.noteItem)
        this.noteItem.push(rowId)
        this.filledData=this.filledData + 1
        // this.sendData(this.filledData)
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
    handleErrorShowModal(show){
      this.showQuaranitineModal=show
    },
    handleQuarantineSubmit() {
      this.handleQuarantineModal(false)
      this.buttonEnable = true
    },
    error() {
    this.$error({
      title: 'The checklist will not proceed with the No answer(s).Correct them.',
      // content: 'some messages...some messages...',
    });
    },
  },
}
</script>
