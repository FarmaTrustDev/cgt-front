<template>
    <div>
        <!-- // make its component -->
        <a-card class="white-card-smart-lab">
        <a-row>
          <a-col :span="3">
            <figure>
              <img
                class="responsive_img"
                :src="getImageUrl(url)"
              />
              <figcaption></figcaption>
            </figure>
          </a-col>

          <a-col :span="21">
            <a-row style="line-height:25px">
                <a-col :span="24"><h2>Expected Items</h2></a-col>
            </a-row>
            <a-row style="line-height:25px">
              <a-col :span="7" class="text-muted">Expected Receipt Date:</a-col>
              <a-col :span="8">27/06/2022 at 13:00</a-col>
              <a-col :span="5" class="text-muted">Lot number:</a-col>
              <a-col :span="4">ABC1</a-col>
            </a-row>
            <a-row style="line-height:25px">
              <a-col :span="7" class="text-muted">Item Master:</a-col>
              <a-col :span="8">IC-SPC-003</a-col>
              <a-col :span="5" class="text-muted">Incoming Sample:</a-col>
              <a-col :span="4">Cryogenic</a-col>
            </a-row>
            <a-row style="line-height:25px">
              <a-col :span="7" class="text-muted">Description:</a-col>
              <a-col :span="8">Drug B</a-col>
              <a-col :span="5" class="text-muted">Quantity:</a-col>
              <a-col :span="4">10</a-col>
            </a-row>                        
          </a-col>
        </a-row>            
        </a-card>
    </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [routeHelpers, imagesHelper],
  props: {
    url: { type: String },
    showButton:{type: Boolean},
    status:{type: String, default: null},
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