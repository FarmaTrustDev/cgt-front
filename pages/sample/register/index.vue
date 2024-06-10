<template>
  <page-layout :create="false" :bordered="false" title="Sample Register">
  <div slot="content" class="container">
    <!-- <h1 class="heading page-title"> Inventory</h1> -->
      <Header :url="''" :clientNames="clientName" :client="client" :show-button="false" />
    <a-table
      class="rounded-table"
      :columns="newTasksColumns"
      :data-source="newTasksData"
      :should-fetch="false"
      style="white-space:pre"
    >
      <template slot="storageDocument" slot-scope="text, record">
        <img :src="getImageUrl('/Icons/Union.svg')" @click="openViewModal(record.url)" />
      </template>
      <a-modal :visible="showModal" :title="translation.Docum_1_507">
          <img class="img-responsive" :src="getImageUrl(qrUrl)" />
          <template slot="footer">
            <a-button @click="handleModal(false)">{{translation.cance_1_296}}</a-button>
            <a-button @click="printWindow()">Print</a-button>
          </template>
        </a-modal>
      </a-table>
      <a-modal
        :visible="showModal"
        ok-text="Print"
        :cancel-text="translation.cance_1_296"
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
          title: `Sample Description`,
          dataIndex: 'productDescription',
          key: 'productDescription',
        },
        {
          title: `Sample Location`,
          dataIndex: 'productLocation',
          key: 'productLocation',
        },
        {
          title: `LIMs Report`,
          dataIndex: 'storageDocument',
          key: 'storageDocument',
          scopedSlots: { customRender: 'storageDocument' },
        },
        {
          title: `Sample Quality`,
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
          productDescription: 'Human Cells',
          productLocation: 'Zone A, Storage Suite 3',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Paige Turner',
          url:'web/inventory/storage/hub/sample/08.jpeg',
        },
        {
          sampleId: 'DAC12577',
          productDescription: 'Human Cells',
          productLocation: 'Zone B, Storage Suite 2',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Jacob Hales',
          url:'web/inventory/storage/hub/sample/03.jpeg',
        },
        {
          sampleId: 'DAC12578',
          productDescription: 'Human Cells',
          productLocation: 'Zone C, Storage Suite 3',
          expiryDate: '31/10/2023',
          productQuality: 'Medium',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Chris Murphy',
          url:'web/inventory/storage/hub/sample/04.jpeg',
        },
        {
          sampleId: 'DAC12579',
          productDescription: 'Human Cells',
          productLocation: 'Zone B, Storage Suite 3',
          expiryDate: '30/09/2022',
          productQuality: 'Medium',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Andrew Hales',
          url:'web/inventory/storage/hub/sample/03.jpeg',
        },
        {
          sampleId: 'DAC12580',
          productDescription: 'Human Cells',
          productLocation: 'Zone A, Storage Suite 2',
          expiryDate: '31/08/2023',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Gordon Square, London WC1H 0PP',
          projectManager: 'Frank Jones',
          url:'web/inventory/storage/hub/sample/05.jpeg',
        },
        {
          sampleId: 'DAC12581',
          productDescription: 'Human Cells',
          productLocation: 'Zone B, Storage Suite 3',
          expiryDate: '31/10/2022',
          productQuality: 'Optimum',
          shippingAddress:
            'Christopher Ingold Building, 29 \n Christ Square, Christ Church',
          projectManager: 'Paige Turner',
          url:'web/inventory/storage/hub/sample/06.jpeg',
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
        if(this.clientData[i].key===6){
          this.clientName=this.clientData[i].value
          this.client=this.clientData[i].title
        }
      }
    },
    handleModal(show) {
      this.showModal = show
    },
    openViewModal(id) {
      this.qrUrl=id
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
