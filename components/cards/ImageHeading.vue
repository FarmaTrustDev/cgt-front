<template>
  <div>
    <slot name="extra" />
    <span class="imageHeading">
      <img
        :width="imgProperties.width"
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
  margin-bottom: 15px;
  display: inline-block;
  .heading {
    font-size: 14px;
    display: inline-block;
    max-width: 74%;
    color: #909090;
  }
}
</style>
