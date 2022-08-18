<template>
  <div>
      <h3 class="page-title">{{translation.SamplStatu_4_614}}</h3>
      <div><h3 style="font-weight:bold">{{translation.SamplDetai_2_510}}</h3></div>
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
          title: `${this.$store.getters.getTranslation.Stage_1_615}`,
          dataIndex: 'stage',
          key: 'stage',
          scopedSlots: { customRender: 'stage' },
        },
        {
          title: `${this.$store.getters.getTranslation.Organ_1_166}`,
          dataIndex: 'organization',
          key: 'organization',
        },
        {
          title: `${this.$store.getters.getTranslation.Notes_1_350}`,
          dataIndex: 'notes',
          key: 'notes',
        },
        {
          title: `${this.$store.getters.getTranslation.SigneBy_2_616}`,
          dataIndex: 'signedBy',
          key: 'signedBy',
        },
        {
          title: `${this.$store.getters.getTranslation.date_1_510}`,
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: `${this.$store.getters.getTranslation.Time_1_617}`,
          dataIndex: 'time',
          key: 'time',
        },
      ],
      newTasksData: [
        {
          url:'web/icons/greenTick.png',
          stage: `${this.$store.getters.getTranslation.Manuf_1_89}`,
          organization: 'Adaptimmune',
          notes:'',
          signedBy: 'Mike Wheeler',
          date: '05/05/2022',
          time:'14:00',
        },
        {
          url:'web/icons/greenTick.png',
          stage: `${this.$store.getters.getTranslation.Shipp_1_618}`,
          organization: 'Adaptimmune',
          notes:'',
          signedBy: 'Mike Wheeler',
          date: '11/07/2022',
          time:'14:00',
        },
        {
          url:'web/icons/greenTick.png',
          stage: `${this.$store.getters.getTranslation.Couri_1_234}`,
          organization: 'Cryoport',
          notes:'Visible damage to packaging',
          signedBy: 'Dustin Henderson',
          date: '12/07/2022',
          time:'14:00',
        },
        {
          url:'web/icons/alarm.png',
          stage: `${this.$store.getters.getTranslation.Inbou_1_498}`,
          organization: 'Cellfuse',
          notes:'Visible damage to packaging',
          signedBy: 'Mike Wheeler',
          date: '05/07/2022',
          time:'14:00',
        },
        {
          url:'web/icons/alarm.png',
          stage: `${this.$store.getters.getTranslation.Quara_1_619}`,
          organization: 'Cellfuse',
          notes:'Package place in Quarantine Fridge 003, \n Shelf 1, Rack 9D-G',
          signedBy: 'Mike Wheeler',
          date: '05/07/2022',
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

  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.newTasksData[0].stage=newValues.Manuf_1_89
        this.newTasksData[1].stage=newValues.Shipp_1_618
        this.newTasksData[2].stage=newValues.Couri_1_234
        this.newTasksData[3].stage=newValues.Inbou_1_498
        this.newTasksData[4].stage=newValues.Quara_1_619

        this.newTasksColumns[0].title=newValues.Stage_1_615
        this.newTasksColumns[1].title=newValues.Organ_1_166
        this.newTasksColumns[2].title=newValues.Notes_1_350
        this.newTasksColumns[3].title=newValues.SigneBy_2_616
        this.newTasksColumns[4].title=newValues.date_1_510
        this.newTasksColumns[5].title=newValues.Time_1_617
      }
    }
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
