<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.StoraServi_2_532"
    class="inventory-storage-title"
  >
    <div slot="content" class="w-1200 margin-auto">
      <a-row>
        <a-col class="mb-15" :span="24">
          <detail />
        </a-col>
      </a-row>
      <a-row>
        <a-col class="mb-15" :span="21">
        </a-col>
        <a-col class="mb-15" :span="3">
          <a-button type="primary" @click="getAutoSelect">Auto Select</a-button>
        </a-col>
      </a-row>
      
      <a-row :gutter="24">
        <a-col v-if="false" :span="8">
          <TileCenter
            heading="Freezer Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <fridge style="zoom: 2.5" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="12">
          <TileCenter
            heading="Shelf Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <racks
                :data="fridgeData.racks"
                :autoSelect="autoSelect"
                @getRackPortion="getRackPortion"
              />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="12">
          <TileCenter
            heading=" Box Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <Trays v-if="!isEmpty(trayData)" :numVials="numVials" :autoSelect="autoSelect" :trays="trayData" />
              <a-empty v-else description=" select the rack" />
            </div> </TileCenter
        ></a-col>
      </a-row>

      <FormActionButton
        class="mt-15"
        :loading="loading"
        :custom-text="translation['Submi_1_248']" 
        @click="clickImage"
      />
      <!-- @click="goto('/inventory/storage/tasks')"-->
      <a-modal
      :visible="showModal"
      title="Confirm sample storage"
      ok-text="Confirm"
      cancel-text="Cancel"
      @ok="confirm(false)"
      @cancel="handleModal(false)"
      >
      <div>
        <a-row><a-col>Freezer : Atara 001</a-col></a-row>
        <a-row><a-col>Shelf : Shelf 01</a-col></a-row>
        <a-row><a-col>Box location : 1A</a-col></a-row>
      </div>
      <!--<img class="img-responsive" :src="qrUrl" />-->
      <!-- <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="confirm(false)" type="primary">Confirm</a-button>     
      </template>         -->
    </a-modal>
    </div>
  </page-layout>
</template>

<script>
import detail from '~/components/root/inventory/detail'
import PageLayout from '~/components/layout/PageLayout'
import fridge from '~/components/inventory/freezers/Fridge'
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
import { isEmpty } from '~/services/Helpers'
import { fridgeData } from '~/services/Constant/DummyData'
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
/// The code on the page is total no tolerated
export default {
  components: {
    PageLayout,
    racks,
    Trays,
    fridge,
    TileCenter,
    detail,
  },
  mixins: [routeHelpers,notifications],
  data() {
    return {
      fridgeData,
      loading: false,
      steps: [],
      tubes: [],
      trayData: [],
      showModal: false,
      autoSelect:null,
      numVials:null,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    // console.log(isEmpty(this.$route.query.vial))
    if(isEmpty(this.$route.query.vial)){
      this.numVials=1
    }else{
      this.numVials=parseInt(this.$route.query.vial)
    }
    // console.log(this.numVials)
  },
  methods: {
    isEmpty,
    getRackPortion(portions, autoSelect) {
      
      if(isEmpty(autoSelect))
      {
        this.autoSelect=-1
      }else{
        this.autoSelect=autoSelect
      }
      // console.log(this.autoSelect)
      this.trayData = portions.trays
    },
    clickImage() {
      this.handleModal(true)
    },    
    handleModal(show) {
      this.showModal = show
    },
    confirm(show) {
      this.showModal = show
      this.success('Sample stored successfully')
      this.goto('/inventory/storage/tasks')
    },
    getAutoSelect(){
      this.autoSelect=1
      this.trayData=fridgeData.racks[1].portions[3].trays
    },        
  },
}
</script>
