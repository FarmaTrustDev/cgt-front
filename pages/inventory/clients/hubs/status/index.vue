<template>
  <page-layout
    :create="false"
    :bordered="false"
    title="Inventory"
    class="container"
  >
    <div class="grey-card p-25" style="margin-top: 10px" slot="content">
      <!-- // make its component -->
      <!-- <alert
      type="warning"
      message="  Zularkarnain bhai make its component and use it in clients/clients
          pages and change this url name and then remove this alert "
    >
    </alert> -->
    <Header :url="'web/inventory/storage/hub/clients/'+clientId+'.png'" :clientNames="clientName" :client="client" :show-button="false" />
      <!-- <a-row>
        <a-col :span="4">
          <figure>
            <img
              class="img-responsive default-border-radius"
              :src="getImageUrl('web/inventory/storage/hub/clients/1.png')"
            />
            <figcaption></figcaption>
          </figure>
        </a-col>
        <a-col :span="16">
          <a-row>
            <a-col :span="5" style="font-weight: bold">Client:</a-col>
            <a-col :span="11">Adaptimmune</a-col>
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
            <a-col :span="11">The WestWorks, 195 Wood Ln, London W12 7FQ</a-col>
          </a-row>
        </a-col>
      </a-row> -->

      <a-row :gutter="16">
        <a-col :span="24">
          <a-card class="white-card">
            <table class="w-100">
              <thead>
                <th style="font-size:17px; font-weight:bold">Services</th>
                <th class="pr-5" style="font-size:17px; font-weight:bold">Units</th>
                <th style="font-size:17px; font-weight:bold">Price Per Unit</th>
                <th style="font-size:17px; font-weight:bold">Total</th>
              </thead>
              <tr v-for="detail in details" :key="detail.id">
                <td class="pt-10">{{ detail.service }}</td>
                <td class="pt-10">{{ detail.unit }}</td>
                <td
                  class="pt-10"
                  style="font-weight:bold; font-size:15px"
                  v-html="$options.filters.hashBold(detail.prices)"
                  
                >
                  {{ detail.prices }}
                </td>
                <td
                  class="pt-10"
                  v-html="$options.filters.hashBold(detail.total)"
                >
                  {{ detail.total }}
                </td>
              </tr>
            </table></a-card
          >
        </a-col>
        <a-col :span="7"></a-col>
      </a-row>
    </div>
  </page-layout>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import PageLayout from '~/components/layout/PageLayout'
import Header from '~/components/inventory/clients/header.vue'
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
  components: { PageLayout, Header },
  filters: {
    hashBold(value) {
      if (!value) return ''
      value = value.toString()
      const hashReg = /\w+/gm
      value = value.replace(hashReg, '$&')
      return value
    },
  },
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
      qrUrl: 'Uploads/DocumentURL/shipping notice.jpg',
      details: [
        {
          service: '-20°C storage',
          unit: 8,
          prices: '$1,520',
          total: '$12,160',
        },
        {
          service: '-80°C storage',
          unit: 12,
          prices: '$2,000',
          total: '$24,000',
        },
        {
          service: 'LN2 storage',
          unit: 4,
          prices: '$2,340',
          total: '$9,360',
        },
        {
          service: 'Service Fees',
          unit: '',
          prices: '',
          total: '$1,430',
        },
        {
          service: 'Utility Fees',
          unit: '',
          prices: '',
          total: '$1,340',
        },
        {
          service: 'Additional Fees',
          unit: '',
          prices: '',
          total: '$1,240',
        },
        {
          service: 'Professional Service Fees',
          unit: '',
          prices: '',
          total: '$4,260',
        },
        {
          service: '',
          unit: '',
          prices: '<b>Subtotal<b>',
          total: '<b>$53,790</b>',
        },
        {
          service: '',
          unit: '',
          prices: '<b>Tax Rate</b>',
          total: '10%',
        },
        {
          service: '',
          unit: '',
          prices: '<b>Total Tax</b>',
          total: '$5,379',
        },
        {
          service: '',
          unit: '',
          prices: '<b>Balance Due</b>',
          total: '<b>$59,169</b>',
        },
      ],
    }
  },

  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted(){
    this.getClientId()
  },
  methods: {
    getClientId(){
      this.clientId=this.$route.query.clientId
      for(const i in this.clientData ){
        if(this.clientData[i].key===parseInt(this.clientId)){
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
