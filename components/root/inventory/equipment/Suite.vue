<template>
  <div>
    <a-card :bordered="null" class="default-border-radius shadow" style="margin-bottom: -30px;">
      <a-tabs>
        <a-tab-pane v-if="data.id===1" key="1" class="display-inline-block border-bottom-none font-size-14" tab="Class B Suite">
          <!-- <a-tab-pane key="1" :tab="translation.ClassB_3_572"> -->
          <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)" :class="{ 'active-image': activeIndex === index }" @click="showCBModal(true, c.qrUr,c.qrMr,c.single, c.heading, index)" height="50px" width="40px"></span>
            </span>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </ImageHeading>
        </a-tab-pane>
            
        <a-tab-pane v-if="data.id===1" key="2" class="font-size-14" tab="Class C Suite">
          <ImageHeading
            v-for="(c, index) in classC"
            :key="index"
            :detail="c"
          >
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)" :class="{ 'active-image': activeIndex === index }" @click="showCBModal(true, c.qrUr,c.qrMr,c.single, c.heading, index)" height="50px" width="40px"></span>
            </span></ImageHeading
          >
          <!-- :img-properties="{ width: '50px', height: '50px' }" -->
        </a-tab-pane>

        <!-- <a-tab-pane
          key="3"
          class="display-inline-block border-bottom-none border-bottom-line"
          tab="Cell Collection Kit A"
        >
          <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
            <span slot="extra">
              <span class="count-bar suite-pg">70</span>
            </span></ImageHeading
          ></a-tab-pane
        > -->
        <!-- :img-properties="{ width: '50px', height: '50px' }" -->
        <!-- <a-tab-pane key="4" class="border-bottom-none border-bottom-line" tab="Cell Collection Kit B">
          <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
            
            <span slot="extra">
              <span class="count-bar suite-pg">98</span>
            </span>
          </ImageHeading></a-tab-pane
        > -->
        <!-- <a-tab-pane key="2" :tab="translation.ClassC_3_570">
          <ImageHeading class="mt-15" :detail="{ img: '', heading: '' }"
        /></a-tab-pane> -->
      </a-tabs>
      <div v-if="data.id>1">
        <ImageHeading
            v-for="(c, index) in WithOutClass"
            :key="index"
            :detail="c"
          >
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)" :class="{ 'active-image': activeIndex === index }" @click="showCBModal(true, c.qrUr,c.qrMr,c.single, c.heading, index)" height="50px" width="40px"></span>
            </span></ImageHeading
          >
      </div>  
      <a-modal :visible="showModal" :title="head" 
        :dialog-style="{
          height: 'auto',
          maxHeight: '90vh',
          overflow: 'hidden',
          border: '5px solid #1890ff',
          borderRadius: '25px',
          paddingBottom: '0px'
        }"
        :body-style="{
          padding: '1px',
          margin: '1px',
        }"
        @cancel="handleModal(false, -1)" 
        @ok="handleModal(false, activeIndex)"
      >
       
        <div v-if="single" style="padding-bottom: 1px;">           
          <img class="img-responsive" :src="getImageUrl(qrMr)" />
        </div>
        <div v-else style="padding-bottom: 1px;">     
          <img class="img-responsive" :src="getImageUrl(currImg)" />
          <img :src="getImageUrl('web/inventory/storage/left.png')" @click="handleLNav(qrUr)" style="margin-left: 40%; margin-right: 20px;" width="30px">
          <img :src="getImageUrl('web/inventory/storage/right.png')" @click="handleLNav(qrMr)" width="30px">
        </div>
        <template slot="footer">
          <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="3" style="text-align: center;">
              <span><strong>Status: Clean</strong></span>
            </a-col>
            <a-col :span="3"></a-col>
            <a-col :span="6" style="text-align: center;">
              <span><strong style="color:blue">Next Scheduled Maintenance: <br> 11 March 2026</strong></span>
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <a-button @click="handleModal(false, -1)">{{translation.cance_1_296}}</a-button>
            </a-col>
            <a-col :span="4">
              <a-button @click="printWindow()">Print</a-button>
            </a-col>
          </a-row>
        </template>
      </a-modal>
        <a-modal :visible="showInventoryModal" class="modal-design-smart-lab" style="border-color: brown; border-width: 1px;" :cancel-text="'Print'" :ok-text="'Submit'" :dialog-style="{ right: '20%', top:'5%' }" @cancel="handleInventorygModal(false)" @ok="handleInventoryOk(false)">
          <a-card class="grey-card-smart-lab">
            <hr class="mt-15">
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="7"><h2 class="mt-15">Frederick National Laboratory</h2></a-col>
              <a-col :span="15"><h2 class="mt-15" style="text-align: center;">Vaccine, Immunity and Cancer Directorate</h2></a-col>
            </a-row>
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="3"><h3></h3></a-col><a-col :span="4"><h3>for Cancer Research</h3></a-col>
              <a-col :span="15"><h2 style="text-align: center;">Standard Operating Procedure Form</h2></a-col>
            </a-row>
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="7" style="margin-top: -15px;"><hr></a-col>
            </a-row>
            <a-row>
              <a-col :span="2"></a-col>
              <a-col :span="7" style="text-align: right;">sponsored by the National Cancer Institute</a-col>
            </a-row>

            <a-row class="mt-25">
              <a-col :span="2"></a-col>
              <a-col :span="11"><strong>Form Title:</strong> BSC Daily Use Form</a-col>
            </a-row>

            <a-row class="mt-15">
              <a-col :span="2"></a-col>
              <a-col :span="10"><strong>Document ID: 26000-01</strong></a-col>
              <a-col :span="6">Version:</a-col>
              <a-col :span="6">DRAFT</a-col>
            </a-row>

            <a-row class="mt-15">
              <a-col :span="2"></a-col>
              <a-col :span="10"><strong>Associated SOP: 26000</strong></a-col>
              <a-col :span="6">Effective Date:</a-col>
              <a-col :span="6">TBD</a-col>
            </a-row>

            <a-row class="mt-15">
              <a-col :span="2"></a-col>
              <a-col :span="5"><strong>Supersedes:</strong></a-col>
              <a-col :span="5">1.0</a-col>
              <a-col :span="6">Page 1 of 1</a-col>
            </a-row>
            
            <a-card class="white-card-smart-lab">
              <a-row>
                <a-col :span="6"><strong>Equipment ID:</strong></a-col>
                <a-col :span="6"></a-col>
                <a-col :span="6">Year</a-col>
              </a-row>
              <a-row class="mt-10">
                <a-col :span="6"><strong>Date:</strong></a-col>
                <a-col :span="6"></a-col>
                <a-col :span="6"></a-col>
              </a-row>
              <a-row class="mt-15">
                <a-col :span="2">Air flow ok?</a-col>
                <a-col :span="2">Value?</a-col>
                <a-col :span="3"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox></a-col>
                <a-col :span="2"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="3"><a-checkbox> Yes </a-checkbox> <a-checkbox>No</a-checkbox></a-col>
                <a-col :span="2"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="3"><a-checkbox> Yes </a-checkbox> <a-checkbox>No</a-checkbox></a-col>
                <a-col :span="2"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="3"><a-checkbox> Yes </a-checkbox> <a-checkbox>No</a-checkbox></a-col>
                <a-col :span="2"><a-checkbox>N/A</a-checkbox></a-col>
              </a-row>
              <a-row class="mt-15">
                <a-col :span="4">Primary Disinfectant Lot:</a-col>
                <a-col :span="5"></a-col>
                <a-col :span="5"></a-col>
                <a-col :span="5"></a-col>
                <a-col :span="5"></a-col>
              </a-row>
              <a-row class="mt-15">
                <a-col :span="4">Primary Disinfectant Exp:</a-col>
                <a-col :span="5"></a-col>
                <a-col :span="5"></a-col>
                <a-col :span="5"></a-col>
                <a-col :span="5"></a-col>
              </a-row>
              <a-row class="mt-15">
                <a-col :span="4">Secondary Disinfectant Lot:</a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
              </a-row>
              <a-row class="mt-15">
                <a-col :span="4">Secondary Disinfectant Exp:</a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
                <a-col :span="5"><a-checkbox>N/A</a-checkbox></a-col>
              </a-row> 
            </a-card>
          </a-card>    
          <template slot="footer">
            <a-button @click="handleInventoryOk(false)">Cancel</a-button>
            <a-button type="primary" @click="handleInventoryOk(false)">{{translation.Submi_1_248}}</a-button>
          </template>
        </a-modal>
    </a-card>
  </div>
</template>
<script>
import ImageHeading from '~/components/cards/ImageHeading'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { ImageHeading },
  mixins: [imagesHelper],
  props: { data: { type: Object, default: () => ({}) } },
  data() {
    return {
      classB: [
        {
          // img: 'Icons/kits.svg',
          img: 'web/inventory/Group-1000002120.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
          qrUr: 'web/inventory/storage/cabenit.jpeg',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:false,
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: '2x Cobe 2991 Cell processing instrument',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: '3x CliniMACS Prodigy instrument',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        // {
        //   img: 'web/inventory//Group-1000002115.svg',
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
      ],
      classC: [
        {
          // img: 'Icons/kits.svg',
          img: 'web/inventory/Group-1000002120.svg',
          heading: 'Weighing Scales (grams)',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: 'PLaner Controlled rate freezer',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: 'Vacuum bag sealer',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        {
          img: 'web/inventory//Group-1000002123.svg',
          heading: 'Liquid nitrogen Dewars',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
      ],
      WithOutClass: [
        {
          // img: 'Icons/kits.svg',
          img: 'web/inventory//Group-1000002115.svg',
          heading: 'Centrisart®  Centrifuge',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory/Group-1000002123.svg',
          heading: 'Centrisart® A-14 — Micro-Centrifuge',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory/AllPurposeCentrifuge.svg',
          heading: 'Centrisart® G-16 — All Purpose Centrifuge',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory//CentrisartG-26C.svg',
          heading: 'Centrisart® G-26C',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        {
          img: 'web/inventory//BenchtopFreezingPlatform.svg',
          heading: 'Celsius® S3 Benchtop Freezing Platform',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory//PicusElectronicPipette.svg',
          heading: 'Picus® Electronic Pipette',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: 'Sartolab® Multistation - Hands-Free Cell Culture Filtration for Small Volumes',
          qrUr:'',
          qrMr: 'web/inventory/storage/maint.jpeg',
          single:true,
        },
      ],
      showInventoryModal: false,
      showModal:false,
      qrUr:'',
      qrMr:'',
      single:true,
      currImg:'',
      lNav:false,
      rNav:true,
      head:'',
      activeIndex:-1
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods:{
    isEmpty,
    handleInventorygModal(){
      this.showInventoryModal=false
    },
    showDoc(){
      this.showModal=true
    },
    handleInventoryOk(){
      this.showInventoryModal=false
    },
    handleModal(opt, ind){
      this.showModal=opt
      this.activeIndex = ind
    },
    showCBModal(opt, qru, qrm, sts,head,index){
      this.showModal=opt
      this.qrUr = qru
      this.currImg = qru
      this.qrMr = qrm
      this.single = sts
      this.head = head
      this.activeIndex = index
    },
    handleLNav(img){
      this.currImg = img
      this.rNav=true
      this.lNav = false
    },
    handleRNav(img){
      this.currImg = img
      this.rNav=false
      this.lNav=true
    },
    printWindow(){
      window.print()
    },
  },
  
}
</script>
<style scoped>
.active-image {
  border: 2px solid red;
  border-radius: 50%; /* Makes it circular */
  padding: 2px;
}
</style>
<style scoped>
.ant-modal {
  padding-bottom: 1px;
}
</style>