<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.StoraServi_2_532"
    class="specific-storage container"
  >
    <div slot="content" class="h-tabs large-tabs">
      <a-row>
        <a-col class="mb-15" :span="24">
          <detail />
        </a-col>
      </a-row>
      <a-tabs class="" type="card">
        <a-tab-pane key="storages" :tab="translation.Explostora_3_536">
          <a-input
            v-decorator="['quantity']"
            :allow-clear="true"
            size="large"
            :placeholder="translation.searc_1_488"
            class="float-right inventory-search"
            @change="(e) => search(e.target.value, 'title')"
          >
            <a-icon slot="prefix" type="search" class="mb-5" />
          </a-input>
          <Listing :storages="storage" :typeId="isInbound" />
        </a-tab-pane>
        <a-tab-pane key="products" :tab="translation.Listall_3_537">
          <a-input
            v-decorator="['quantity']"
            :allow-clear="true"
            size="large"
            :placeholder="translation.searc_1_488"
            class="float-right inventory-search placeholder-alignment"
            @change="
              (e) =>
                productSearch(
                  e.target.value,
                  'product,productLocation,clientName,description'
                )
            "
          >
            <a-icon slot="prefix" type="search" class="mb-5 " />
          </a-input>
          <a-table
            class="rounded-table"
            :should-update="shouldUpdate"
            :should-fetch="false"
            :data-source="data"
            :columns="productsColumn"
            :customRow="customRow"
          >
            <!-- <template slot="print" slot-scope="print">
        <span
          class="print-btn color-white default-cursor"
          type="primary"
          size="small"
          @click="openViewModal(print)"
          >Document</span
        >
      </template> -->
            <!-- :pagination="false" -->
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <a-modal :visible="showModal" :title="translation.Docum_1_507">
        <img class="img-responsive" :src="getImageUrl(qrUrl)" />
        <template slot="footer">
          <a-button @click="handleModal(false)">Cancel</a-button>
          <a-button @click="printWindow()">Print</a-button>
        </template>
      </a-modal>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Utilities'
import { isNumber } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
// import StandardTable from '~/components/common/StandardTable'
import Listing from '~/components/inventory/storage/Listing'
import { baseStorage } from '~/services/Constant/DummyData'
import detail from '~/pages/inventory/storage/detail'

export default {
  components: { PageLayout, Listing, detail },
  mixins: [routeHelpers, imagesHelper],
  data() {
    return {
      productFilters: {},
      filters: {},
      loading: false,
      data: [],
      isInbound: false,
      shouldUpdate: true,
      storage: baseStorage,
      qrUrl:null,
      showModal:false,
      productsColumn: [
        {
          title: `${this.$store.getters.getTranslation.Produ_1_538}`,
          dataIndex: 'product',
          key: 'product',
        },
        {
          title: `${this.$store.getters.getTranslation.ProduDescr_2_539}`,
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: `${this.$store.getters.getTranslation.ClienName_2_540}`,
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: `${this.$store.getters.getTranslation.ProduLocat_2_541}`,
          dataIndex: 'productLocation',
          key: 'productLocation',

          scopedSlots: { customRender: 'popupOver' },
          ellipsis: true,
        },
        {
          title: `${this.$store.getters.getTranslation.ExpirDate_2_543}`,
          dataIndex: 'expiryDate',
          key: 'expiryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.ProduQuali_2_544}`,
          dataIndex: 'productQuality',
          key: 'productQuality',
        },
        {
          title: `${this.$store.getters.getTranslation.ProjeManag_2_545}`,
          dataIndex: 'projectManager',
          key: 'projectManager',
        },
        {
          title: `${this.$store.getters.getTranslation.ProjeCode_2_546}`,
          dataIndex: 'projectCode',
          key: 'projectCode',
        },
        // {
        //   title: `${this.$store.getters.getTranslation.StoraDocum_2_542}`,
        //   dataIndex: 'print',
        //   key: 'print',
        //   scopedSlots: { customRender: 'print' },
        // },
      ],
      productsData: [
        {
          product: 'DAC12345',
          description: 'Human platelet lysate (or hPL)...',
          clientName: 'Cellfuse',
          productLocation: 'Zone A, Storage Suite 3',
          storageDocument: 'document',
          expiryDate: '10/10/2022',
          productQuality: 'Optimum',
          projectManager: 'Paige Turner',
          projectCode: '4788',
        },

        {
          product: 'DAC17899',
          description: 'platelet lysate...',
          clientName: 'Novartis',
          productLocation: 'Zone C, Storage Suite 2',
          storageDocument: 'document',
          expiryDate: '08/10/2025',
          productQuality: 'Optimum',
          projectManager: 'Chris Hales',
          projectCode: '4721',
        },

        {
          product: 'DAC12333',
          description: 'Human platelet lysate (or hPL)...',
          clientName: 'Cellfuse',
          productLocation: 'Zone B, Storage Suite 3',
          storageDocument: 'document',
          expiryDate: '10/10/2024',
          productQuality: 'Optimum',
          projectManager: 'Paige Turner',
          projectCode: '4788',
        },

        {
          product: 'DAC12321',
          description: 'Human platelet lysate (or hPL)...',
          clientName: 'Cellfuse',
          productLocation: 'Zone A, Storage Suite 3',
          storageDocument: 'document',
          expiryDate: '10/08/2024',
          productQuality: 'Optimum',
          projectManager: 'Henry Peterson',
          projectCode: '5488',
        },

        {
          product: 'DAC12667',
          description: 'Human platelet lysate (or hPL)...',
          clientName: 'Baystate',
          productLocation: 'Zone C, Storage Suite 1',
          storageDocument: 'document',
          expiryDate: '28/12/2022',
          productQuality: 'Optimum',
          projectManager: 'David James',
          projectCode: '4897',
        },

        {
          product: 'DAC12455',
          description: 'Human platelet lysate (or hPL)...',
          clientName: 'BioNTech',
          productLocation: 'Zone C, Storage Suite 2',
          storageDocument: 'document',
          expiryDate: '10/10/2022',
          productQuality: 'Optimum',
          projectManager: 'Paige Turner',
          projectCode: '5478',
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.productsColumn[0].title=newValues.Produ_1_538
        this.productsColumn[1].title=newValues.ProduDescr_2_539
        this.productsColumn[2].title=newValues.ClienName_2_540
        this.productsColumn[3].title=newValues.ProduLocat_2_541
        this.productsColumn[4].title=newValues.ExpirDate_2_543
        this.productsColumn[5].title=newValues.ProduQuali_2_544
        this.productsColumn[6].title=newValues.ProjeManag_2_545
        this.productsColumn[7].title=newValues.ProjeCode_2_546
      }
    }
  },  
  mounted() {
    this.data = this.productsData
    if (this.$route.query.inbound) {
      this.isInbound = true
    }
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.goto('/inventory/storage/location')
          },
        },
      }
    },
    clickImage(record) {
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
    openViewModal(id) {
      this.showModal = true
      this.qrUrl = id
      // LabelServices.scheduling(id);
    },
    productSearch(value, key) {
      let filters = this.productFilters
      const keys = key.split(',')
      for (let i = 0; i < keys.length; i++) {
        filters[keys[i]] = value
      }
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters
      if (!isEmpty(value)) {
        let products = []
        for (const filter in filters) {
          // console.log(filters)
          const filterValue = filters[filter]
          // console.log(filterValue)
          products = this.productsData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              // console.log(storage)
              // return storage[filter].match(value)
              return filterValue
            }
            // return storage[filter].match(value) === filterValue
            return storage[filter] === filterValue
          })
          if (products.length > 0) break
          // console.log(products.length)
        }

        products = JSON.stringify(products)
        // this.updateData(products)
        this.data = JSON.parse(products)
        this.shouldUpdate = true
      } else {
        this.data = this.productsData
        this.shouldUpdate = true
        // this.data = this.productsData
      }
      // console.log(this.data)
    },
    updateData(str) {
      // alert('hello')
      console.log(str)
    },
    search(value, key) {
      // console.log(key)
      let filters = this.filters
      filters[key] = value
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = baseStorage.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              // console.log(storage)
              return storage[filter].match(value)
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter].match(value) == filterValue
          })
        }

        storages = JSON.stringify(storages)
        this.storage = JSON.parse(storages)
      } else {
        this.storage = baseStorage
      }
    },
  },
}
</script>
