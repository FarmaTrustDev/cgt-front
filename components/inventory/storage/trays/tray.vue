<template>
  <div @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <img
      v-if="isHover || tube.isHover"
      class="tube-image"
      :src="getImageUrl('web/inventory/storage/selected-tube.svg')"
      @click="handleHoverDisable(true)"
    />
    <span v-else>
      <img
        v-if="tube.active"
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/tube.svg')"
      />
      <img
        v-else
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/redTestTube.svg')"
      />
    </span>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: { tube: { type: Object, default: () => ({}) } },
  data() {
    return {
      isHover: false,
      makeHoverDisable: false,
    }
  },
  mounted() {
    console.log(this.tube)
  },
  methods: {
    onHover(show) {
      if (!this.makeHoverDisable) {
        this.isHover = show
      }
    },
    handleHoverDisable(result) {
      this.makeHoverDisable = result
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
