<template>
    <a-col :span="11">
    <div class="display-flex mt-15">
      <slot name="extra" />
      <span class="imageHeading">
        <figure>
          <figcaption class="font-size-16">
            <a-col :span="15">{{ detail.heading }}</a-col>
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
        default: () => ({ width: '25px', height: '25px' }),
      },
    },
  }
  </script>
  