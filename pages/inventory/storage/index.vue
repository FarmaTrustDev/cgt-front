<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.StoraServi_2_532"
    class="specific-storage"
  >
    <div slot="content" class="h-tabs large-tabs">
      <a-tabs class="" type="card">
        <a-tab-pane key="storages" tab="Explorer storage units"
          ><Listing />
        </a-tab-pane>
        <a-tab-pane key="products" tab="List all products">
          <StandardTable
            :should-fetch="false"
            :dump-data="productsData"
            :columns="productsColumn"
            :pagination="false"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import { isEmpty } from '~/services/Utilities'
import { isNumber } from '~/services/Helpers'
import StandardTable from '~/components/common/StandardTable'
import Listing from '~/components/inventory/storage/Listing'

const baseStorage = [
  {
    id: 1,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 1,
    zoneId: 1,
    temperature: '-20',
    zone: 'Zone A',
  },
  {
    id: 2,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 2,
    zoneId: 3,
    temperature: '-80',
    zone: 'Zone C',
  },
  {
    id: 3,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 2,
    zoneId: 1,
    temperature: '-80',
    zone: 'Zone A',
  },
  {
    id: 4,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 3,
    zoneId: 1,
    temperature: 'LN2',
    zone: 'Zone A',
  },
  {
    id: 5,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 1,
    zoneId: 2,
    temperature: '-20',
    zone: 'Zone B',
  },
  {
    id: 6,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 2,
    zoneId: 2,
    temperature: '-80',
    zone: 'Zone B',
  },
  {
    id: 7,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 3,
    zoneId: 2,
    temperature: 'LN2',
    zone: 'Zone B',
  },
  {
    id: 8,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 2,
    zoneId: 1,
    temperature: '-80',
    zone: 'Zone A',
  },
  {
    id: 9,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 11,
    temperatureId: 3,
    zoneId: 1,
    temperature: 'LN2',
    zone: 'Zone A',
  },
  {
    id: 10,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 18,
    temperatureId: 2,
    zoneId: 2,
    temperature: '-80',
    zone: 'Zone B',
  },
  {
    id: 11,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 8,
    temperatureId: 1,
    zoneId: 1,
    temperature: '-20',
    zone: 'Zone A',
  },
  {
    id: 12,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 16,
    temperatureId: 2,
    zoneId: 3,
    temperature: '-80',
    zone: 'Zone C',
  },
  {
    id: 13,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 18,
    temperatureId: 2,
    zoneId: 2,
    temperature: '-80',
    zone: 'Zone B',
  },
  {
    id: 14,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 3,
    zoneId: 1,
    temperature: 'LN2',
    zone: 'Zone A',
  },
  {
    id: 15,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 2,
    zoneId: 1,
    temperature: '-80',
    zone: 'Zone A',
  },
  {
    id: 16,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 2,
    zoneId: 1,
    temperature: '-80',
    zone: 'Zone A',
  },
]
export default {
  components: { PageLayout, StandardTable, Listing },

  data() {
    return {
      loading: false,
      productsColumn: [
        {
          title: 'Product',
          dataIndex: 'product',
          key: 'product',
        },
        {
          title: 'Product Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Client Name',
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: 'Product Location',
          dataIndex: 'productLocation',
          key: 'productLocation',

          scopedSlots: { customRender: 'popupOver' },
          ellipsis: true,
        },
        {
          title: 'Storage Documents',
          dataIndex: 'storageDocument',
          key: 'storageDocument',
          scopedSlots: { customRender: 'icon' },
        },
        {
          title: 'Expiry Date',
          dataIndex: 'expiryDate',
          key: 'expiryDate',
        },
        {
          title: 'Product Quality',
          dataIndex: 'productQuality',
          key: 'productQuality',
        },
        {
          title: 'Project Manager',
          dataIndex: 'projectManager',
          key: 'projectManager',
        },
        {
          title: 'Project Code',
          dataIndex: 'projectCode',
          key: 'projectCode',
        },
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
          clientName: 'Royal Hospital',
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
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    search(value, key) {
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
              return storage
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter] == filterValue
          })
        }

        storages = JSON.stringify(storages)
        this.storages = JSON.parse(storages)
      } else {
        this.storages = baseStorage
      }
    },
  },
}
</script>
