<template>
  <a-tabs :animated="false" class="border-bottom-none">
    <div>
      <span class="ml-80 pg-head">Task/Store Sample</span>
      <span class="ml-150 pg-head">ID: DAC53827</span>
      <span class="ml-150 pg-head">Name: Platelet Lycate</span>
      <span class="ml-150 pg-head">Client: Royal Hospital</span>
      <div class="pt-10 float-left icons">
        <span class="ml-80 pg-head">Fridge: Kings 123</span>
        <span class="ml-150 pg-head"
          ><img
            :src="getImageUrl('web/inventory/storage/frozen.svg')"
          />-80°C</span
        >
        <span class="ml-150 pg-head"
          ><img :src="getImageUrl('web/inventory/storage/pin.svg')" />Zone A,
          Storage Suite 3, Germany - Cellfuse</span
        >
        <span class="ml-150 pg-head"
          ><img :src="getImageUrl('web/inventory/storage/pin.svg')" />Shelf 5,
          Rack 2</span
        >
      </div>
    </div>
    <a-tab-pane>
      <a-table
        class="rounded-table"
        :columns="newTasksColumns"
        :data-source="newTasksData"
        :should-fetch="false"
      >
        <template slot="print" slot-scope="print">
          <a-button
            class="print-btn"
            type="primary"
            size="small"
            icon="printer"
            @click="openViewModal(print)"
            >Print Label</a-button
          >
        </template>
        <template slot="confirm" >
            <a-button
            class="print-btn"
            type="primary"
            size="small"
            >Confirm placement</a-button>
        </template>
        
      </a-table>
      <a-modal
        :visible="showModal"
        :title="translation.Docum_1_507"
        @cancel="handleModal(false)"
        @ok="handleModal(false)"
      >
        <img class="img-responsive" :src="getImageUrl(qrUrl)" />
      </a-modal>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: {},
  mixins: [routeHelpers, imagesHelper],
  setup() {},
  data() {
    return {
      showModal: false,
      qrUrl: 'http://localhost:22462/Uploads/DocumentURL/shipping notice.jpg',
      newTasksColumns: [
        {
          title: `Sample ID`,
          dataIndex: 'sampleId',
          key: 'sampleId',
        },
        {
          title: `Sample Name`,
          dataIndex: 'sampleName',
          key: 'sampleName',
        },
        {
          title: `Client`,
          dataIndex: 'client',
          key: 'client',
        },
        {
          title: `Fridge`,
          dataIndex: 'fridge',
          key: 'fridge',
        },
        {
          title: `Position`,
          dataIndex: 'position',
          key: 'position',
          scopedSlots: {
            customRender: 'position',
          },
        },
        {
          title: `Print`,
          dataIndex: 'print',
          key: 'print',
          scopedSlots: { customRender: 'print' },
        },
        {
          title: `Confirm all`,
          dataIndex: 'confirm',
          key: 'confirm',
          scopedSlots: { customRender: 'confirm' },
        },
      ],
      newTasksData: [
        {
          sampleId: 'DAC7993',
          sampleName: 'Platelet Lycate ',
          client: 'Baystate Clinic',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC7986',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC7996',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
        },
        {
          sampleId: 'DAC9874',
          sampleName: 'Platelet Lycate ',
          client: 'Royal Hospital',
          fridge: 'Kings 123',
          position: 'Rack 21A',
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
      this.qrUrl = id
      // LabelServices.scheduling(id);
    },
  },
}
</script>
