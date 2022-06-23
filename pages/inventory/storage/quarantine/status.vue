<template>
  <div>
      <h3 class="page-title">Sample Status In Quarantine</h3>
      <div><h3 style="font-weight:bold">Sample Details</h3></div>
      <Header :url="'Uploads/patient/10/qr/637880405174699096.png'" :show-button="true" />
    <a-table
      class="rounded-table"
      :columns="newTasksColumns"
      :data-source="newTasksData"
      :should-fetch="false"
      style="white-space:pre"
    >
    <template slot="stage" slot-scope="record, text">
        <div style="float:left" class="ml-20"><img :src="getImageUrl(text.url)" width="26" height="26" class="img-responsive" style="border-radius:5px" /></div> <div class="ml-40" style="float:left;">{{record}}</div>
    </template>
    </a-table>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import Header from '~/components/inventory/clients/header.vue'
// import { newSampleData } from '../treatment/index.vue'
// import { isEmpty } from '~/services/Utilities'
// import { isNumber } from '~/services/Helpers'

// import { newSampleData } from '../treatment/index.vue'
export default {
  components: {Header},
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
          title: `Stage`,
          dataIndex: 'stage',
          key: 'stage',
          scopedSlots: { customRender: 'stage' },
        },
        {
          title: `Organization`,
          dataIndex: 'organization',
          key: 'organization',
        },
        {
          title: `Notes`,
          dataIndex: 'notes',
          key: 'notes',
        },
        {
          title: `Signed By`,
          dataIndex: 'signedBy',
          key: 'signedBy',
        },
        {
          title: `Date`,
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: `Time`,
          dataIndex: 'time',
          key: 'time',
        },
      ],
      newTasksData: [
        {
          url:'web/icons/greenTick.png',
          stage: 'Manufacture',
          organization: 'Adaptimmune',
          notes:'',
          signedBy: 'Mike Wheeler',
          date: '05/05/2022',
          time:'14:00',
        },
        {
          url:'web/icons/greenTick.png',
          stage: 'Shipped',
          organization: 'Adaptimmune',
          notes:'',
          signedBy: 'Mike Wheeler',
          date: '11/06/2022',
          time:'14:00',
        },
        {
          url:'web/icons/greenTick.png',
          stage: 'Courier',
          organization: 'Cryoport',
          notes:'Visible damage to packaging',
          signedBy: 'Dustin Henderson',
          date: '12/06/2022',
          time:'14:00',
        },
        {
          url:'web/icons/alarm.png',
          stage: 'Inbound',
          organization: 'Cellfuse',
          notes:'Visible damage to packaging',
          signedBy: 'Mike Wheeler',
          date: '05/06/2022',
          time:'14:00',
        },
        {
          url:'web/icons/alarm.png',
          stage: 'Quarantine',
          organization: 'Cellfuse',
          notes:'Package place in Quarantine Fridge 003, \n Shelf 1, Rack 9D-G',
          signedBy: 'Mike Wheeler',
          date: '05/06/2022',
          time:'14:00',
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
