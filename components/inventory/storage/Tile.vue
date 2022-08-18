<template>
  <div class="fridge-tile">
    <div class="title text-center mb-10">
      {{ storage.title }}
    </div>
    <div class="img">
      <fridge :color="storage.color" :type="storage.type" />
    </div>

    <div class="icons">
      <div class="clearfix">
        <span>
          <img
            class="mr-5"
            :src="getImageUrl('web/inventory/storage/full-screen.svg')"
          />{{ storage.quantity }} % {{translation.Full_1_603}}
        </span>
        <span>
          <img
            class="mr-5"
            :src="getImageUrl('web/inventory/storage/frozen.svg')"
          />{{ storage.temperature }} °C
        </span>
      </div>
    </div>
    <div class="location">
      <a-icon type="environment" theme="filled" />
      <span class="text"> {{ storage.location }}</span>
    </div>
  </div>
</template>
<script>
import fridge from '~/components/inventory/freezers/Fridge'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { fridge },
  mixins: [imagesHelper],
  props: {
    storage: { type: Object, default: () => ({}) },
    title: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
    location: { type: String, default: 'Fridge Atara 001' },
    color: { type: String, default: '#1943AE' },
  },
  data() {
    return {}
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {},
}
</script>
