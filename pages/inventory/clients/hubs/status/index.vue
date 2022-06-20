<template>
  <div class="bg-grey p-15">
    <!-- // make its component -->
    <alert
      type="warning"
      message="  Zularkarnain bhai make its component and use it in clients/clients
          pages and change this url name and then remove this alert "
    >
    </alert>
    <a-row>
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
          <a-col :span="11">The WestWorks, 195 Wood Ln, London W12 7FQ</a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="19">
        <a-card class="white-card">
          <table class="w-100">
            <thead>
              <th>Services</th>
              <th>units</th>
              <th>price per unit</th>
              <th>total</th>
            </thead>
            <tr v-for="detail in details" :key="detail.id">
              <td>{{ detail.service }}</td>
              <td>{{ detail.unit }}</td>
              <td>{{ detail.prices }}</td>
              <td>{{ detail.total }}</td>
            </tr>
          </table></a-card
        >
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
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
      qrUrl: 'Uploads/DocumentURL/shipping notice.jpg',
      details: [
        {
          service: '-20°C storage',
          unit: 8,
          prices: '$152',
          total: '$1,216',
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
