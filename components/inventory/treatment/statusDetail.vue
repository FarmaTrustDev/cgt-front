<template>
    <div>
        <!-- // make its component -->
        <h2>{{headingTitle}}</h2>
        <div class="status-div">{{translation.Statu_1_649}} <span class="status-smart-lab-pop">{{status}}</span> </div>
        <span v-for="stDetail in statusDetails" :key="stDetail.clientID">
        <a-row>
        <a-col :span="2" class="text-muted">{{translation['ClienID:_2_678']}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.clientID}}</a-col>
        <a-col :span="2" class="text-muted">ARN #:</a-col><a-col :span="4" class="text-color-black">{{stDetail.arn}}</a-col>
        <a-col :span="2" class="text-muted">{{translation.Proje_1_669}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.project}}</a-col>
        <a-col :span="2" class="text-muted">{{translation['Creaton:_2_679']}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.createdOn}}</a-col>
        </a-row>
        <a-row>
        <a-col :span="2" class="text-muted">{{translation['ProjeID:_2_668']}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.projectID}}</a-col>
        <a-col :span="2" class="text-muted">{{translation['Creatby:_2_680']}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.createdBy}}</a-col>
        <a-col :span="2" class="text-muted">{{translation.Proto_1_686}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.protocol}}</a-col>
        <a-col :span="2" class="text-muted">{{translation.Locat_1_448}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.location}}</a-col>
        </a-row>
        <a-row>
        <a-col :span="2" class="text-muted">{{translation['ProtoID:_2_682']}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.protocolD}}</a-col>
        <a-col :span="2" class="text-muted">{{translation.Clien_1_666}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.client}}</a-col>
        <a-col :span="2" class="text-muted">{{translation.Descr_1_655}}</a-col><a-col :span="4" class="text-color-black">{{stDetail.description}}</a-col>
        </a-row>                
        </span>

    </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [routeHelpers, imagesHelper],
  props: {
    statusDetails: { type: Array, default: () => [] },
    status:{type: String, default: null},
    headingTitle: {String, default: null},
  },
  data(){
    return{
    showModal: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  methods:{
    openViewModal() {
      this.showModal = true
      // this.qrUrl = id
      // LabelServices.scheduling(id);
    },   
    handleModal(show) {
      this.showModal = show
    },
  }
}
</script>