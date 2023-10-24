<template>
    <div class="display-flex" style="margin-top: -5px;">
      <slot name="extra" />
      <span class="imageHeading" style="margin-bottom: -10px;">
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
  