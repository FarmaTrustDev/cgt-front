<template>
    <div>
        <!-- // make its component -->
        <a-card class="white-card-smart-lab">
            <h2>{{headingTitle}}</h2>
            <a-row v-if="singleLineKey!==null">
              <a-col :span="3" class="text-muted">{{singleLineKey}}</a-col>
              <a-col :span="16">{{singleLineValue}}</a-col>
            </a-row>
            <a-col v-for="custDD in customDisplayData" :key="custDD.key" :span="colVal">
                <a-row style="line-height:30px">
                    <a-col :span="11" class="text-muted" >{{custDD.title}}</a-col>
                    
                    <a-col v-if="custDD.url===''" :span="13">{{custDD.value}}</a-col>
                    <a-col v-else :span="11" class="text-muted" ><img :src="getImageUrl(custDD.url)" width="20" height="20" class="img-responsive" style="border-radius:5px" /></a-col>
                </a-row>
            </a-col>
        </a-card>

    </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [routeHelpers, imagesHelper],
  props: {
    customDisplayData: { type: Array, default: () => [] },
    headingTitle:{type: String, default: null},
    singleLineKey:{type: String, default: null},
    singleLineValue:{type: String, default: null},
    colVal:{type: Number, default: null },
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