<template>
  <div class="">
    <a-row style="height:35px; margin-left:10px">
      <a-col :span="6">{{translation['Task/Sampl_2_638']}}</a-col>
      <a-col :span="6">ID: DAC53827</a-col>
      <a-col :span="8">{{translation.Name_1_138}}: Platelet Lycate</a-col>
      <a-col :span="4">{{translation.Clien_1_505}}: Novartis</a-col>
    </a-row>
    <a-row style="height:35px; margin-left:10px">
      <a-col :span="6">{{translation.Fridg_1_639}}: Kings 123</a-col>
      <a-col :span="6"><img
          :src="getImageUrl('web/inventory/storage/frozen.svg')"
        />-80°C</a-col>
      <a-col :span="8"><img :src="getImageUrl('web/inventory/storage/pin.svg')" />Zone A,
        Storage Suite 3, Germany - Cellfuse</a-col>
      <a-col :span="4"><img :src="getImageUrl('web/inventory/storage/pin.svg')" />Shelf 5,
        Rack 2</a-col>
    </a-row>
    <template>    
      <div>        
        <div v-for="column in newTasksColumns" :key="column.title" @click="clickOnColumn(column)" />    
      </div>
    </template>    
    <a-table
      class="rounded-table"
      :columns="newTasksColumns"
      :data-source="newTasksData"
      :should-fetch="false"
      
    >
      <span slot='customTitle'>
        <div><a-button type="primary" block size="large" html-type="submit" @click="openViewAllModal()">{{translation.PrintAll_2_640}}</a-button></div>
      </span>
      <span slot='customConfirmTitle'>
        <div><a-button type="primary" block size="large" html-type="submit" @click="handleClick('all',0)">{{translation.ConfiAll_2_641}}</a-button></div>
      </span>
      <template slot="print" slot-scope="print, index">
        <a-button
          class="print-btn"
          type="primary"
          size="small"
          icon="printer"
          v-if="(index.index!=8)"
          @click="openViewModal(print, index)"
          >{{translation.PrintLabel_2_642}}</a-button
        >
      </template>
      <template slot="confirm" slot-scope="confirm, index">
        <a-button
          :class="( confirm | checkAll) ? 'blue' : 'gray'"
          size="small"
          @click="handleClick(confirm, index)"
          ><span>{{translation.ConfiPlace_2_643}}</span></a-button
        >
      </template>     
    </a-table>
    <a-row style="margin-top:30px">
      <a-col :span="20"></a-col>
      <a-col :span="4"><a-button style="width:100%; font-size:20px" type="primary" @click="goto('/inventory/treatment')">{{translation.finis_1_508}}</a-button></a-col>
    </a-row>
    <a-modal
      :visible="showAllModal"
      :title="translation.Docum_1_507"
      id="printAll"
      :ok-text="translation.PrintAll_2_640"
      :cancel-text="translation.cance_1_296"
      @ok="printWindow('printAll')"
      @cancel="handlePrintModal(false)"
    >
      <img v-for="newTask in newTasksData" :key="newTask.index" class="img-responsive" :src="getImageUrl(newTask.url)" />
      <!-- <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>
      </template> -->
    </a-modal>    
    <a-modal
      :visible="showModal"
      :title="translation.Docum_1_507"
      :ok-text="translation.Print_1_111"
      id="printOne"
      :cancel-text="translation.cance_1_296"
      @ok="printWindow('printOne')"
      @cancel="handleModal(false)"
    >
      <img class="img-responsive" :src="getImageUrl(qrUrl)" width="100%" />
      <!-- <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>
      </template> -->
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
      showAllModal:false,
      clicked: false,
      greenDisk: 'g',
      blueDisk: 'b',
      checkAll:false,
      selectedRowKeys: [],
      qrUrl: 'Uploads/DocumentURL/shipping notice.png',
      newTasksColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'sampleId',
          key: 'sampleId',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
          dataIndex: 'sampleName',
          key: 'sampleName',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'client',
          key: 'client',
        },
        {
          title: `${this.$store.getters.getTranslation.Freez_1_624}`,
          dataIndex: 'fridge',
          key: 'fridge',
        },
        {
          title: `${this.$store.getters.getTranslation.Posit_1_645}`,
          dataIndex: 'position',
          key: 'position',
          scopedSlots: {
            customRender: 'position',
          },
        },
        {
          // title: `Print All`,
          // dataIndex: 'print',
          // key: 'print',
          // slots: {
          //   title: {customRender:'<button></button>'}
          // },
          dataIndex: 'print',
          key: 'print',
          slots: {
            title: 'customTitle',
          },
          scopedSlots: { customRender: 'print' },
        },
        {
          // title: `Confirm All`,
          dataIndex: 'confirm',
          key: 'confirm',
          slots:{
            title:'customConfirmTitle',
          },
          scopedSlots: { customRender: 'confirm' },
        },
      ],
      newTasksData: [
        {
          sampleId: 'DAC7993',
          sampleName: 'Human Cells ',
          client: 'Baystate Clinic',
          fridge: 'Freezers 12',
          position: 'Rack 20A',
          confirm: false,
          index: 0,
          url: 'Uploads/DocumentURL/1.jpeg',
        },
        {
          sampleId: 'DAC7986',
          sampleName: 'Human Cells ',
          client: 'Novartis',
          fridge: 'Freezers 13',
          position: 'Rack 21A',
          confirm: false,
          index: 1,
          url: 'Uploads/DocumentURL/2.jpeg',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Human Cells',
          client: 'Novartis',
          fridge: 'Freezers 14',
          position: 'Rack 23A',
          confirm: false,
          index: 2,
          url: 'Uploads/DocumentURL/3.jpeg',
        },
        {
          sampleId: 'DAC7996',
          sampleName: 'Human Cells ',
          client: 'Novartis',
          fridge: 'Freezers 15',
          position: 'Rack 27A',
          confirm: false,
          index: 3,
          url: 'Uploads/DocumentURL/4.jpeg',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Human Cells',
          client: 'Novartis',
          fridge: 'Freezers 13',
          position: 'Rack 28A',
          confirm: false,
          index: 4,
          url: 'Uploads/DocumentURL/1.jpeg',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Human Cells',
          client: 'Novartis',
          fridge: 'Freezers 14',
          position: 'Rack 29A',
          confirm: false,
          index: 5,
          url: 'Uploads/DocumentURL/2.jpeg',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Human Cells',
          client: 'Novartis',
          fridge: 'Freezers 123',
          position: 'Rack 21A',
          confirm: false,
          index: 6,
          url: 'Uploads/DocumentURL/3.jpeg',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Human Cells',
          client: 'Novartis',
          fridge: 'Freezers 19',
          position: 'Rack 10A',
          confirm: false,
          index: 7,
          url: 'Uploads/DocumentURL/4.jpeg',
        },
       /* {
          sampleId: '',
          sampleName: '',
          client: '',
          fridge: '',
          position: '',
          index: 8,
          url: '/inventory/treatment',
        }, */        
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
        this.newTasksColumns[0].title=newValues.SamplID_2_502
        this.newTasksColumns[1].title=newValues.SamplName_2_503
        this.newTasksColumns[2].title=newValues.Clien_1_505
        this.newTasksColumns[3].title=newValues.Freez_1_624
        this.newTasksColumns[4].title=newValues.Posit_1_645
      }
    }
  },  
  methods: {
    handleModal(show) {
      this.showModal = show
    },
    handlePrintModal(show) {
      this.showAllModal = show
    },    
    openViewModal(id,index) {
      this.qrUrl=index.url
      this.showModal = true
    },
    openViewAllModal(id) {
      this.showAllModal = true
    },    
    handleClick(confirm, index) {
      // console.log(confirm)
      if(confirm==='all'){
        this.checkAll=true
      }
      else
      {
        for (let i = 0; i < this.newTasksData.length; i++) {
          if (this.newTasksData[i].index === index.index)
            this.newTasksData[i].confirm = !this.newTasksData[i].confirm
        }
      }
    },
    printWindow(id) {

      const prtContent = document.getElementById(id);
      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();


      // window.print()
    },
    editTitle(){

    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
}
</script>
