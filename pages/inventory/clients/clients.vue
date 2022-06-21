<template>
  <div class="">
    <div>
      <div>
        <!-- // make its component -->
        <a-row>
          <a-col :span="3">
            <figure>
              <img
                class="responsive_img"
                :src="getImageUrl('web/inventory/storage/hub/clients/6.png')"
              />
              <figcaption></figcaption>
            </figure>
          </a-col>

          <a-col :span="16">    
            <a-row>
              <a-col :span="5" style="font-weight: bold; line-height:20px">Client:</a-col>
              <a-col :span="11">Novartis</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">Contact Name:</a-col>
              <a-col :span="11">Lucas Sinclair</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">Contact Number:</a-col>
              <a-col :span="11">+44 1286 132475</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">Address:</a-col>
              <a-col :span="11"
                >The WestWorks, 195 Wood Ln, London W12 7FQ</a-col
              >
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
      style="white-space:pre"
    >
      <template slot="storageDocument" slot-scope="">
        <img :src="getImageUrl('web/inventory/storage/upload.jpeg')" @click="openViewModal" />
      </template>
<a-modal :visible="showModal" :title="translation.Docum_1_507">
          <img class="img-responsive" :src="getImageUrl(qrUrl)" />
          <template slot="footer">
            <a-button @click="handleModal(false)">Cancel</a-button>
            <a-button @click="printWindow()">Print</a-button>
          </template>
        </a-modal>      
    </a-table>
    <a-modal :visible="showModal" :title="translation.Docum_1_507">
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
      clicked: false,
      greenDisk: 'g',
      blueDisk: 'b',
      qrUrl: 'Uploads/DocumentURL/label1.jpg',
      newTasksColumns: [
        {
          title: `Sample ID`,
          dataIndex: 'sampleId',
          key: 'sampleId',
        },
        {
          title: `Product Description`,
          dataIndex: 'productDescription',
          key: 'productDescription',
        },
        {
          title: `Product Location`,
          dataIndex: 'productLocation',
          key: 'productLocation',
        },
        {
          title: `Storage Documents`,
          dataIndex: 'storageDocument',
          key: 'storageDocument',
          scopedSlots: { customRender: 'storageDocument' },
        },
        {
          title: `Expiry Date`,
          dataIndex: 'expiryDate',
          key: 'expiryDate',
        },
        {
          title: `Product Quality`,
          dataIndex: 'productQuality',
          key: 'productQuality',
        },
        {
          title: `Shipping Address`,
          dataIndex: 'shippingAddress',
          key: 'shippingAddress',
        },
        {
          title: `Project Manager`,
          dataIndex: 'projectManager',
          key: 'confirm',
        },
      ],
      newTasksData: [
        {
          sampleId: 'DAC12576',
          productDescription: 'Pluripotent stem cells \n (PSCs)',
          productLocation:'Zone A, Storage Suite 3',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Paige Turner',
        },
        {
          sampleId: 'DAC12577',
          productDescription: 'Aphaeresis',
          productLocation:'Zone B, Storage Suite 2',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Jacob Hales',
        },
        {
          sampleId: 'DAC12578',
          productDescription: 'Cancer Stem cells \n (CSCs)',
          productLocation:'Zone C, Storage Suite 3',
          expiryDate: '31/10/2023',
          productQuality: 'Medium',
          shippingAddress:'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Chris Murphy',
        },
        {
          sampleId: 'DAC12579',
          productDescription: 'Adult stem cells \n (ASCs)',
          productLocation:'Zone B, Storage Suite 3',
          expiryDate: '30/09/2022',
          productQuality: 'Medium',
          shippingAddress:'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Andrew Hales',
        },
        {
          sampleId: 'DAC12580',
          productDescription: 'Aphaeresis',
          productLocation:'Zone A, Storage Suite 2',
          expiryDate: '31/08/2023',
          productQuality: 'Optimum',
          shippingAddress:'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Frank Jones',
        },
        {
          sampleId: 'DAC12581',
          productDescription: 'Aphaeresis',
          productLocation:'Zone B, Storage Suite 3',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Paige Turner',
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
    handleClick(confirm, index) {
      for (let i = 0; i < this.newTasksData.length; i++) {
        if (this.newTasksData[i].index === index.index)
          this.newTasksData[i].confirm = !this.newTasksData[i].confirm
      }
    },
    printWindow() {
      window.print()
    },
  },
}
</script>
