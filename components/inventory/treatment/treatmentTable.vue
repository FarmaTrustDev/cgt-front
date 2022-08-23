<template>
    <div>
        <!-- // make its component -->
        <h2 class="mt-15">{{headingTitle}}</h2>
        <a-table :columns="columns" :data-source="dataSource" class="rounded-table" :pagination="false" />
    </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [routeHelpers, imagesHelper],
  props: {
    columns: { type: Array, default: () => [] },
    dataSource: { type: Array, default: () => [] },
    headingTitle:{type:String, default:null},
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