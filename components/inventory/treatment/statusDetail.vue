<template>
    <div>
        <!-- // make its component -->
        <h2>{{headingTitle}}</h2>
        <div class="status-div">Status: <span class="status-smart-lab-pop">{{status}}</span> </div>
        <span v-for="stDetail in statusDetails" :key="stDetail.clientID">
        <a-row>
        <a-col :span="3" class="text-muted">Client ID:</a-col><a-col :span="3">{{stDetail.clientID}}</a-col>
        <a-col :span="3" class="text-muted">ARN #:</a-col><a-col :span="3">{{stDetail.arn}}</a-col>
        <a-col :span="3" class="text-muted">Project:</a-col><a-col :span="3">{{stDetail.project}}</a-col>
        <a-col :span="3" class="text-muted">Created on:</a-col><a-col :span="3">{{stDetail.createdOn}}</a-col>
        </a-row>
        <a-row>
        <a-col :span="3" class="text-muted">Project ID:</a-col><a-col :span="3">{{stDetail.projectID}}</a-col>
        <a-col :span="3" class="text-muted">Created by:</a-col><a-col :span="3">{{stDetail.createdBy}}</a-col>
        <a-col :span="3" class="text-muted">Protocol:</a-col><a-col :span="3">{{stDetail.protocol}}</a-col>
        <a-col :span="3" class="text-muted">Location:</a-col><a-col :span="3">{{stDetail.location}}</a-col>
        </a-row>
        <a-row>
        <a-col :span="3" class="text-muted">Protocol ID:</a-col><a-col :span="3">{{stDetail.protocolD}}</a-col>
        <a-col :span="3" class="text-muted">Client:</a-col><a-col :span="3">{{stDetail.client}}</a-col>
        <a-col :span="3" class="text-muted">Description:</a-col><a-col :span="3">{{stDetail.description}}</a-col>
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