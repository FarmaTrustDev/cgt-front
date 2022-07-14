<template>
  <div>
    <slot name="extra" />
    <span class="imageHeading">
      <figure>
         <a-row>
          <a-col :span="4"></a-col>
          <a-col :span="4" >
        <span>
          <img
            :width="imgProperties.width"
            class="img ml-5 stat-image"
            :src="getImageUrl(detail.img)"
          />
        </span>
       </a-col>
          <a-col :span="16">
        <figcaption style="margin-top:-40px">
          {{ detail.heading }}
        </figcaption>
        </a-col>
        </a-row>
      </figure>
    </span>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: {
    detail: { type: Object, default: () => ({}), required: true },
    imgProperties: {
      type: Object,
      default: () => ({ width: '25px', height: '25px' }),
    },
  },
}
</script>
