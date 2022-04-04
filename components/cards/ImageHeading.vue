<template>
  <div>
    <slot name="extra" />
    <span class="imageHeading">
      <img class="img" :src="getImageUrl(detail.img)" />
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
