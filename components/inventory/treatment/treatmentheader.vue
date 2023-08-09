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
                <a-col :span="24"><h2>{{translation.ExpecItems_2_650}}</h2></a-col>
            </a-row>
            <a-row style="line-height:25px">
              <a-col :span="7" class="text-muted">{{translation.ExpecRecei_3_651}}</a-col>
              <a-col :span="8" class="text-color-black">{{moment(new Date()).format("DD/MM/YYYY")}} at 13:00</a-col>
              <a-col :span="5" class="text-muted">{{translation.Lotnumbe_2_652}}</a-col>
              <a-col :span="4" class="text-color-black">ABC1</a-col>
            </a-row>
            <a-row style="line-height:25px">
              <a-col :span="7" class="text-muted">{{translation.ItemMaste_2_653}}</a-col>
              <a-col :span="8" class="text-color-black">IC-SPC-003</a-col>
              <a-col :span="5" class="text-muted">{{translation.IncomSampl_2_654}}</a-col>
              <a-col :span="4" class="text-color-black">Cryogenic</a-col>
            </a-row>
            <a-row style="line-height:25px">
              <a-col :span="7" class="text-muted">{{translation.Descr_1_655}}</a-col>
              <a-col :span="8" class="text-color-black">Human Cell</a-col>
              <a-col :span="5" class="text-muted">{{translation.Quant_1_657}}</a-col>
              <a-col :span="4" class="text-color-black">10</a-col>
            </a-row>                        
          </a-col>
        </a-row>            
        </a-card>
    </div>
</template>
<script>
import moment from 'moment'
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
// import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
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
    moment,
    
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