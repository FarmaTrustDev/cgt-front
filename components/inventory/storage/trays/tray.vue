<template>
  <div @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <img
      class="tube-image"
      v-if="!isHover"
      :src="getImageUrl('/web/inventory/storage/tube.svg')"
    />
    <img
      class="tube-image"
      v-else
      :src="getImageUrl('/web/inventory/storage/selected-tube.svg')"
    />
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  data() {
    return {
      isHover: false,
    }
  },
  methods: {
    onHover(show) {
      this.isHover = show
    },
  },
}
</script>

<style scoped>
.tube-image {
  width: 30px;
  height: 30px;
}
</style>
