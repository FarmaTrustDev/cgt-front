<template>
  <div class="display-flex" style="margin-top: -25px;">
    <slot name="extra" />
    <span class="imageHeading">
      <figure>
        <figcaption class="font-size-14">
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
