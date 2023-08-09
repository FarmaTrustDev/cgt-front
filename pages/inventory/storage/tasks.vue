<template>
  <page-layout
    :create="false"
    :bordered="false"
    class="container"
  >
    <div class="" slot="content">
      <a-row style="height: 35px; margin-left: 10px">
        <a-col :span="6">{{ translation['Task/Sampl_2_638'] }}</a-col>
        <a-col :span="6">ID: DAC53827</a-col>
        <a-col :span="8">{{ translation.Name_1_138 }}: Platelet Lycate</a-col>
        <a-col :span="4">{{ translation.Clien_1_505 }}: Novartis</a-col>
      </a-row>
      <a-row style="height: 35px; margin-left: 10px">
        <a-col :span="6">{{ translation.Fridg_1_639 }}: Kings 123</a-col>
        <a-col :span="6"
          ><img
            :src="getImageUrl('web/inventory/storage/frozen.svg')"
          />-80°C</a-col
        >
        <a-col :span="8"
          ><img :src="getImageUrl('web/inventory/storage/pin.svg')" />Zone A,
          Storage Suite 3, Germany - Cellfuse</a-col
        >
        <a-col :span="4"
          ><img :src="getImageUrl('web/inventory/storage/pin.svg')" />Shelf 5,
          Rack 2</a-col
        >
      </a-row>
      <template>
        <div>
          <div
            v-for="column in newTasksColumns"
            :key="column.title"
            @click="clickOnColumn(column)"
          />
        </div>
      </template>
      <a-table
        class="rounded-table"
        :columns="newTasksColumns"
        :data-source="newTasksData"
        :should-fetch="false"
      >
        <span slot="customTitle">
          <div>
            <a-button
              type="primary"
              block
              size="large"
              html-type="submit"
              @click="openViewAllModal()"
              >{{ translation.PrintAll_2_640 }}</a-button
            >
          </div>
        </span>
        <span slot="customConfirmTitle">
          <div>
            <a-button
              type="primary"
              block
              size="large"
              html-type="submit"
              @click="handleClick('all', 0)"
              >{{ translation.ConfiAll_2_641 }}</a-button
            >
          </div>
        </span>
        <template slot="print" slot-scope="print, index">
          <a-button
            class="print-btn"
            type="primary"
            size="small"
            icon="printer"
            v-if="index.index != 8"
            @click="openPopViewModal(true,print, index)"
            >{{ translation.PrintLabel_2_642 }}</a-button
          >
        </template>
        <template slot="confirm" slot-scope="confirm, index">
          <a-button
            :class="confirm || checkAll ? 'blue' : 'gray'"
            size="small"
            @click="handleClick(confirm, index)"
            ><span>{{ translation.ConfiPlace_2_643 }}</span></a-button
          >
        </template>
      </a-table>
      <a-row style="margin-top: 30px">
        <a-col :span="20"></a-col>
        <a-col :span="4"
          ><a-button
            style="width: 100%; font-size: 20px"
            type="primary"
            @click="goto('/inventory/treatment')"
            >{{ translation.finis_1_508 }}</a-button
          ></a-col
        >
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
        <img
          v-for="newTask in newTasksData"
          :key="newTask.index"
          class="img-responsive"
          :src="getImageUrl(newTask.url)"
        />
        <!-- <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>
      </template> -->
      </a-modal>

      <a-modal
            :visible="showModal"
            class="modal-design-smart-lab-label"
            :dialog-style="{ right: '10%', top: '10%' }"
            @cancel="handelCancel(false)"
            @ok="handleOk(false)"
          >
              <a-card class="white-card-smart-lab-label">
                <a-row>
                    <a-col :span="6"></a-col>
                    <a-col :span="12"><img :src="getImageUrl('label/cryoheader.svg')" width="200" height="125" /></a-col>
                    <a-col :span="6"></a-col>
                </a-row>
                <a-row>
                    <a-col :span="6"><img :src="getImageUrl('label/qrCode.svg')" width="200" height="75" /></a-col>
                    <a-col :span="18">
                    <a-row>
                        <a-col>{{labelData.treatmentType}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="6">LOT: {{labelData.patientEnrollmentNumber}}</a-col>
                        <a-col :span="6">SN: {{labelData.serialNumber}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="6"><img :src="getImageUrl('label/dated.svg')"> {{ moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY") }}</a-col>
                        <a-col :span="4"><img :src="getImageUrl('label/temp.svg')"> {{ labelData.temp }}</a-col>
                        <a-col :span="4"><img :src="getImageUrl('label/umbrella.svg')"> {{ labelData.status }}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>Internal Batch No: {{labelData.internalBatch}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>Project Code: {{labelData.projectCode}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>{{labelData.hospital}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>{{labelData.address}}</a-col>
                    </a-row>
                    <a-row>
                        <a-col>Cell Number: {{labelData.cell}}</a-col>
                    </a-row>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col>&nbsp;</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4"></a-col>
                    <a-col :span="18"><img :src="getImageUrl('label/bar.png')" width="500" height="90" /></a-col>
                </a-row>
              </a-card>
          </a-modal>


      <!--<a-modal
        :visible="showModal"
        :title="translation.Docum_1_507"
        :ok-text="translation.Print_1_111"
        id="printOne"
        :cancel-text="translation.cance_1_296"
        @ok="printWindow('printOne')"
        @cancel="handleModal(false)"
      >
        <img class="img-responsive" :src="getImageUrl(qrUrl)" width="100%" />
        <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="printWindow()">Print</a-button>
      </template>
      </a-modal>-->
    </div>
  </page-layout>
</template>
<script>
import moment from 'moment'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'

import imagesHelper from '~/mixins/images-helper'
import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
// import { newSampleData } from '../treatment/index.vue'
// import { isEmpty } from '~/services/Utilities'
// import { isNumber } from '~/services/Helpers'

// import { newSampleData } from '../treatment/index.vue'
export default {
  components: { PageLayout },
  mixins: [routeHelpers, imagesHelper],
  setup() {},
  data() {
    return {
      showModal: false,
      showAllModal: false,
      clicked: false,
      greenDisk: 'g',
      blueDisk: 'b',
      checkAll: false,
      labelData:{},
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
          slots: {
            title: 'customConfirmTitle',
          },
          scopedSlots: { customRender: 'confirm' },
        },
      ],
      newTasksData: [
        {
          patientEnrollmentNumber: 'DAC7994',
          serialNumber:'AAD2345',
          bar:'label/bar.png',
          qrCode:'label/qrCode.svg',
          dated:'01/02/2024',
          temp:'-20C',
          status:'Keep Dry',
          projectCode:'AA23416',
          internalBatch:'AA23428',

          sampleId: 'DAC7994',
          sampleName: 'Human Cells ',
          client: 'Baystate Clinic',
          fridge: 'Freezers 12',
          position: 'Rack 20A',
          confirm: false,
          index: 0,
          url: 'Uploads/DocumentURL/1.jpeg',
          address:'12 Kennedy Street, Washington, 213421',
          cell:'+1 206 203 5278',
          barCodeNo:'(01) 95012345678903 (3103) 00123',
          treatmentType: 'Human Cells/Cellules Humaines/人体细胞',
          hospital: 'Baystate Clinic',
          collectionDate:moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY"),
          collectionDateDeliveryDate: moment(_getFutureMomentStandardFormatted()).format("DD/MM/YYYY") + ' - ' + moment(_getFutureMomentStandardFormatted(6,'month')).format("DD/MM/YYYY"),
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
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        this.newTasksColumns[0].title = newValues.SamplID_2_502
        this.newTasksColumns[1].title = newValues.SamplName_2_503
        this.newTasksColumns[2].title = newValues.Clien_1_505
        this.newTasksColumns[3].title = newValues.Freez_1_624
        this.newTasksColumns[4].title = newValues.Posit_1_645
      }
    },
  },
  methods: {
    _getFutureMomentStandardFormatted,
    moment,
    handleModal(show) {
      this.showModal = show
    },
    handlePrintModal(show) {
      this.showAllModal = show
    },
    /* openViewModal(id, index) {
      this.qrUrl = index.url
      this.showModal = true
    }, */
    openViewAllModal(id) {
      this.showAllModal = true
    },
    handleOk() {
        this.showModal = false
      },
      handelCancel(val){
        this.showModal = val
      },
      openViewModal(id) {
        this.showModalImage = true
        this.qrUrl = id
        // LabelServices.scheduling(id);
      },
      openPopViewModal(val, record, print) {
        this.showModal = val
        this.labelData=print
        console.log(record)
        console.log(print)
      },
    handleClick(confirm, index) {
      // console.log(confirm)
      if (confirm === 'all') {
        this.checkAll = true
      } else {
        for (let i = 0; i < this.newTasksData.length; i++) {
          if (this.newTasksData[i].index === index.index)
            this.newTasksData[i].confirm = !this.newTasksData[i].confirm
        }
      }
    },
    printWindow(id) {
      const prtContent = document.getElementById(id)
      const WinPrint = window.open(
        '',
        '',
        'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
      )
      WinPrint.document.write(prtContent.innerHTML)
      WinPrint.document.close()
      WinPrint.focus()
      WinPrint.print()
      WinPrint.close()

      // window.print()
    },
    editTitle() {},
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
  },
}
</script>
