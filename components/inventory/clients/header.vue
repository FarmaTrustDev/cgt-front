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
              <a-button size="large" class="mb-10 mtm-20" type="primary" html-type="submit" :loading="false"> Temporary Release</a-button>
              <a-button size="large" class="mt-10" type="primary" html-type="submit" :loading="false"> Resolve Quarentine</a-button>
          </a-col>
        </a-row>
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
}
</script>