<template>
    <div>
        <!-- // make its component -->
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

          <a-col :span="16">    
            <a-row>
              <a-col :span="5" style="font-weight: bold; line-height:20px">Client:</a-col>
              <a-col :span="11">Novartis</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">Contact Name:</a-col>
              <a-col :span="11">Lucas Sinclair</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">Contact Number:</a-col>
              <a-col :span="11">+44 1286 132475</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">Address:</a-col>
              <a-col :span="11"
                >The WestWorks, 195 Wood Ln, London W12 7FQ</a-col
              >
            </a-row>
          </a-col>
          <a-col v-if="showButton" :span="5" style="text-align:right">
              <a-button size="large" class="mb-10 mtm-20" type="primary" html-type="submit" @click="openViewModal()" :loading="false"> Temporary Release</a-button>
              <a-button size="large" class="mt-10" type="primary" html-type="submit" :loading="false" @click="goto('/inventory/storage/quarantine/quarantineProcess')"> Resolve Quarantine</a-button>
          </a-col>
        </a-row>
        <a-modal :visible="showModal"
        ok-text="Save"
        :dialog-style="{ right: '150px' }"
        @cancel="handleModal(false)"
        @ok="handleModal(false)"
        class="modal-design"
        >
          <p class="align-left font-size">You are registering a temporary release of sample ID DAC12356</p>
          <p class="mt-15 font-size">Please provide detail about temporary release:</p>
          <p class="mt-15">Why does the sample require the temporary release ?</p>
          <template>
          <a-textarea placeholder="Write notes here" :rows="4" style="width: 100%"
            size="large" />
          </template>
          <p class="mt-15">What actions have been taken during the temporary release ?</p>
          <a-textarea placeholder="Write notes here" :rows="4"/>
          <p class="align-left mt-15">Upload Supporting Documents <a-upload> <a-icon class="ml-5 upload-button" type="upload" /></a-upload></p>
        </a-modal>
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
  },
  data(){
    return{
    showModal: false,
    }
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