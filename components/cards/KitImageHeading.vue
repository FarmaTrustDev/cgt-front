<template>
    <a-col :span="6">
    <div class="display-flex" style="margin-top: -10px; margin-left:-5px; margin-bottom: -15px;">
      <slot name="extra" />
      <span class="imageHeading">
        <figure>
          <figcaption class="font-size-12">
            <a-col :span="14">{{ detail.heading }}</a-col>
            <a-col :span="2">{{ detail.qty }}</a-col>
          </figcaption>
        </figure>
      </span>
    </div>
    </a-col>
  </template>
  <script>
  import imagesHelper from '~/mixins/images-helper'
  export default {
    mixins: [imagesHelper],
    props: {
      detail: { type: Object, default: () => ({}), required: true },
      imgProperties: {
        type: Object,
        default: () => ({ width: '20px', height: '20px' }),
      },
    },
  }
  </script>
  