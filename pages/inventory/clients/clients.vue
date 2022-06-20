<template>
  <div class="">
    <div>
        <div>
            <a-row>
                <a-col :span="4">
                    <figure>
                        <img
                            :src="
                            getImageUrl(
                                'web/inventory/storage/hub/clients/1.png'
                            )
                            "
                            height="90px"
                            width="250px"
                        />
                        <figcaption></figcaption>
                    </figure>
                </a-col>
                <a-col :span="16">
                    <a-row>
                    <a-col :span="5" style="font-weight:bold">Client:</a-col>
                    <a-col :span="11">Novartis</a-col>
                    </a-row>
                    <a-row>
                    <a-col :span="5" style="font-weight:bold">Contact Name:</a-col>
                    <a-col :span="11">Lucas Sinclair</a-col>
                    </a-row>
                    <a-row>
                    <a-col :span="5" style="font-weight:bold">Contact Number:</a-col>
                    <a-col :span="11">+44 1286 132475</a-col>
                    </a-row>
                    <a-row>
                    <a-col :span="5" style="font-weight:bold">Address:</a-col>
                    <a-col :span="11">The WestWorks, 195 Wood Ln, London W12 7FQ</a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
                    
    <a-table
      class="rounded-table"
      :columns="newTasksColumns"
      :data-source="newTasksData"
      :should-fetch="false"
    >
      <template slot="print" slot-scope="print">
        <a-button
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          @click="openViewModal(print)"
          >Print Label</a-button
        >
      </template>
      <template slot="confirm" slot-scope="confirm, index">
        <a-button
          :class="confirm ? 'blue': 'gray'"
          size="small"
          @click="handleClick(confirm,index)"
          >Confirm placement</a-button
        >
      </template>
    </a-table>
    <a-modal
      :visible="showModal"
      :title="translation.Docum_1_507"
    >
      <img class="img-responsive" :src="getImageUrl(qrUrl)" />
      <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>     
      </template>
</a-modal>


  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
// import { newSampleData } from '../treatment/index.vue'
// import { isEmpty } from '~/services/Utilities'
// import { isNumber } from '~/services/Helpers'

// import { newSampleData } from '../treatment/index.vue'
export default {
  components: {},
  mixins: [routeHelpers, imagesHelper],
  setup() {},
  data() {
    return {
      showModal: false,
      clicked:false,
      greenDisk : 'g',
      blueDisk : 'b',
      qrUrl: 'Uploads/DocumentURL/shipping notice.jpg',
      newTasksColumns: [
        {
          title: `Sample ID`,
          dataIndex: 'sampleId',
          key: 'sampleId',
        },
        {
          title: `Product Description`,
          dataIndex: 'sampleName',
          key: 'sampleName',
        },
        {
          title: `Product Location`,
          dataIndex: 'client',
          key: 'client',
        },
        {
          title: `Storage Documents`,
          dataIndex: 'fridge',
          key: 'fridge',
        },
        {
          title: `Expiry Date`,
          dataIndex: 'position',
          key: 'position',
          scopedSlots: {
            customRender: 'position',
          },
        },
        {
          title: `Product Quality`,
          dataIndex: 'print',
          key: 'print',
          scopedSlots: { customRender: 'print' },
        },
        {
          title: `Shipping Address`,
          dataIndex: 'shippingAddress',
          key: 'shippingAddress',
          scopedSlots: { customRender: 'confirm' },
        },
        {
          title: `Project Manager`,
          dataIndex: 'confirm',
          key: 'confirm',
          scopedSlots: { customRender: 'confirm' },
        },        
      ],
      newTasksData: [
        {
          sampleId: 'DAC7993',
          sampleName: 'Platelet Lycate ',
          client: 'Baystate Clinic',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:0,
        },
        {
          sampleId: 'DAC7986',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:1,
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:2,
        },
        {
          sampleId: 'DAC7996',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:3,
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:4,
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:5,
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:6,
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
          confirm: false,
          index:7,
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    handleModal(show) {
      this.showModal = show
    },
    openViewModal(id) {
      this.showModal = true
    },
    handleClick(confirm,index){
      for(let i = 0; i < this.newTasksData.length; i++){
        if(this.newTasksData[i].index===index.index)
          this.newTasksData[i].confirm=!this.newTasksData[i].confirm
      }
    },
    printWindow(){
      window.print()
    },
  },
}
</script>
