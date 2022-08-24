<template>
  <page-layout :create="false" :loading="loading" :bordered="false">
  <div slot="content" class="container">
      <Header :url="'web/inventory/storage/hub/clients/'+clientId+'.png'" :clientNames="clientName" :client="client" :show-button="false" />
    <a-table
      class="rounded-table"
      :columns="newTasksColumns"
      :data-source="newTasksData"
      :should-fetch="false"
      style="white-space:pre"
    >
      <template slot="storageDocument" slot-scope="">
        <img :src="getImageUrl('/Icons/Union.svg')" @click="openViewModal" />
      </template>
      <a-modal :visible="showModal" :title="translation.Docum_1_507">
          <img class="img-responsive" :src="getImageUrl(qrUrl)" />
          <template slot="footer">
            <a-button @click="handleModal(false)">Cancel</a-button>
            <a-button @click="printWindow()">Print</a-button>
          </template>
        </a-modal>
      </a-table>
      <a-modal
        :visible="showModal"
        ok-text="Print"
        cancel-text="Cancel"
        @ok="printWindow()"
        @cancel="handleModal(false)"
        :title="translation.Docum_1_507"
      >
        <img class="img-responsive" :src="getImageUrl(qrUrl)" />
        <!-- <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>
      </template> -->
      </a-modal>
    </div>
  </page-layout>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import Header from '~/components/inventory/clients/header.vue'
import PageLayout from '~/components/layout/PageLayout'

// import { newSampleData } from '../treatment/index.vue'
// import { isEmpty } from '~/services/Utilities'
// import { isNumber } from '~/services/Helpers'

// import { newSampleData } from '../treatment/index.vue'
export const clientData = [
  {
    title: 'Adaptimmune',
    value: 'Adam Holioc',
    key:1,
  },
  {
    title: 'TCR',
    value: 'Andrew Symond',
    key:2,
  },
  {
    title: 'gsk',
    value: 'Mc GIll',
    key:3,
  },
  {
    title: 'ANTHONY',
    value: 'Richardson',
    key:4,
  },  
  {
    title: 'Kite',
    value: 'Viv Richard',
    key:5,
  },
  {
    title: 'Novartis',
    value: 'Shaun Pollak',
    key:6,
  },  
]

export default {
  components: { Header, PageLayout },
  mixins: [routeHelpers, imagesHelper],
  setup() {},
  data() {
    return {
      showModal: false,
      clicked: false,
      greenDisk: 'g',
      blueDisk: 'b',
      clientId:null,
      clientData,
      clientName:'',
      client:'',
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
          productLocation: 'Zone A, Storage Suite 3',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Paige Turner',
        },
        {
          sampleId: 'DAC12577',
          productDescription: 'Aphaeresis',
          productLocation: 'Zone B, Storage Suite 2',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Jacob Hales',
        },
        {
          sampleId: 'DAC12578',
          productDescription: 'Cancer Stem cells \n (CSCs)',
          productLocation: 'Zone C, Storage Suite 3',
          expiryDate: '31/10/2023',
          productQuality: 'Medium',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Chris Murphy',
        },
        {
          sampleId: 'DAC12579',
          productDescription: 'Adult stem cells \n (ASCs)',
          productLocation: 'Zone B, Storage Suite 3',
          expiryDate: '30/09/2022',
          productQuality: 'Medium',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Andrew Hales',
        },
        {
          sampleId: 'DAC12580',
          productDescription: 'Aphaeresis',
          productLocation: 'Zone A, Storage Suite 2',
          expiryDate: '31/08/2023',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Frank Jones',
        },
        {
          sampleId: 'DAC12581',
          productDescription: 'Aphaeresis',
          productLocation: 'Zone B, Storage Suite 3',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
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
  mounted() {
    this.getClientId()
  },   
  methods: {
    getClientId(){
      this.clientId=this.$route.query.clientId
      for(const i in this.clientData ){
        if(this.clientData[i].key===parseInt(this.clientId)){
          console.log(this.clientData[i].title)
          this.clientName=this.clientData[i].value
          this.client=this.clientData[i].title
        }
      }
    },
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
