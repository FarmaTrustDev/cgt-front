<template>
    <a-col :span="8">
    <div class="display-flex mt-40">
      <slot name="extra" />
      <span class="imageHeading" style="margin-top: 15px;">
        <figure>
          <figcaption class="font-size-14">
            <a-col :span="24">{{ detail.item }}</a-col>
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
        default: () => ({ width: '25px', height: '25px' }),
      },
    },
  }
  </script>
  