<template>
  <div>
    <slot name="extra" />
    <span class="imageHeading">
      <img
        :width="imgProperties.width"
        :height="imgProperties.height"
        class="img"
        :src="getImageUrl(detail.img)"
      />
      <span class="heading">
        {{ detail.heading }}
      </span>
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
<style lang="scss" scoped>
.imageHeading {
  .heading {
    font-size: 12px;
    display: inline-block;
    max-width: 74%;
  }
}
</style>
