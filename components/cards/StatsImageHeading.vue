<template>
  <div>
    <slot name="extra" />
    <span class="imageHeading">
      <figure class="ml-80 mtminus-60">
        <!-- <img
            :src="getImageUrl(detail.img)"
            :width="imgProperties.width"
            :height="imgProperties.height"
          /> -->
        <img
          src="https://cgt-dev-ft.microsysx.com/images/no-logo.png"
          alt="logo"
          width="65px"
        />
        <figcaption class="flex-display ml-15">
          {{ detail.heading }}
        </figcaption>
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
