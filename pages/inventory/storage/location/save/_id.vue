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
          <detail :data="data" />
        </a-col>
      </a-row>
      <a-row>
        <a-col class="mb-15" :span="21">
        </a-col>
        <a-col class="mb-15" :span="3">
          <a-button type="primary" @click="getAutoSelect">{{translation.AutoSelec_2_600}}</a-button>
        </a-col>
      </a-row>
      
      <a-row :gutter="24">
        <a-col v-if="false" :span="8">
          <TileCenter
            :heading="'Shelf ' + fridgeTitle" 
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <fridge style="zoom: 2.5" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="12">
          <TileCenter
            :heading="'Shelf ' + fridgeTitle"
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
            :heading="'Box ' + fridgeTitle"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <Trays v-if="!isEmpty(trayData)" :numVials="numVials" :autoSelect="autoSelect" @getData="updateSelection" :trays="trayData" />
              <a-empty v-else :description="translation.selecthe_3_628" />
            </div> 
          </TileCenter>
        </a-col>
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
      :title="translation.Confisampl_3_621"
      :ok-text="translation.Confi_1_646"
      :cancel-text="translation.cance_1_296"
      @ok="confirm(false)"
      @cancel="handleModal(false)"
      >
      <div>
        <a-row>
          <a-col> 
            <table class="testTubeTable w-100">
              <tr>
                <td class="w-30">{{translation.Freez_1_624}} : </td>
                <td> {{fridgeTitle }} </td>
              </tr>
              <tr>
                <td class="w-30">{{translation.Shelf_1_623}} : </td>
                <td> {{shelfTitle }} </td>
              </tr>
              <tr>
                <td class="w-30" style="vertical-align: top;">{{translation.BoxLocat_2_622}} :</td>
                <td>
                  <tr v-for="rowIndex in getUniqueRowIndices" :key="rowIndex">
                    <td v-for="cell in getCellsForRowIndex(rowIndex)" :key="cell.colIndex" class="fake-column">
                      <span>{{ cell.rowIndex + toLetters(cell.colIndex) }}</span>
                    </td>
                  </tr>
                </td>
              </tr>  
            </table>
          </a-col>
        </a-row>
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
import { isEmpty, toLetters } from '~/services/Helpers'
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
      record:{},
      selectedData:[],
      fridgeTitle:'',
      shelfTitle:'',
      data: {
        countryName: 'Germany - Cellfuse',
        address: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
        flag: 'web/flags/de.svg',
        global: `${this.$store.getters.getTranslation.Headof_3_549}` + ' - Stephen Jones',
        phone: '49 6781 9855-0',
        email: 'info-imfs@cellfuse.de',
      },
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    getUniqueRowIndices() {
      // Get unique rowIndex values from the data
      if(this.selectedData !== undefined){
        if(this.selectedData.length>0){
          return [...new Set(this.selectedData.map((item) => item.rowIndex))];
        }
      }
      return null
    },
  },
  mounted() {
    // console.log(isEmpty(this.$route.query.vial))
    if(isEmpty(this.$route.query.vial)){
      this.numVials=1
    }else{
      this.numVials=parseInt(this.$route.query.vial)
    }
    if(this.$route.query.record){
      this.record=this.$route.query.record
    }
    if(this.$route.query.fridge){
      this.fridgeTitle=this.$route.query.fridge
    }
    // console.log(this.numVials)
  },
  methods: {
    isEmpty,
    toLetters,
    getCellsForRowIndex(rowIndex) {
      // Get cells for a specific rowIndex
      return this.selectedData.filter((item) => item.rowIndex === rowIndex);
    },
    updateSelection(data){
      this.selectedData=data
      console.log(this.selectedData)
    },
    getRackPortion(portions,counter, autoSelect) {
      console.log(counter)
      this.shelfTitle='Shelf '+counter
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
      this.goto('/inventory/storage/tasks?fridge='+this.fridgeTitle+'&dt='+JSON.stringify(this.selectedData)+'&record='+this.record)
    },
    getAutoSelect(){
      this.autoSelect=1
      this.trayData=fridgeData.racks[1].portions[3].trays
    },        
  },
}
</script>
