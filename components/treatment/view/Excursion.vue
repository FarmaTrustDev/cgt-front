<template>
  <div>
    <div v-if="treatment.excursionId !== null" class="mb-25">
      <div class="dangerFadeInOut" type="error" show-icon>
        <div slot="description">
          <!-- <img :src="getImageUrl('Icons/thermometer-temperature-icon.svg')" alt="" height="25px"> -->
          <span class="display-flex"><h2 class="text-white font-wt-600 font-size-24"> {{ getMessage(treatment.excursionId) }} EXCURSION </h2> <span class="ml-2 pt-05 font-size-16"> {{ redTileName!= null ? '(' + redTileName + ')' : '' }}</span></span>
          <div class="font-size-20">Contact 0441839380 <span class="font-size-18">Wednesday 8 Feb 2023 8:20</span></div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
// import imagesHelper from '~/mixins/images-helper'
export default {
  // components: { alert },
  // mixins:[imagesHelper],
  props: {
    treatment: { required: true, type: Object },
    redTileName : {type: String}
    // bags: { required: true, type: Object },
  },
  methods: {
    getMessage(excursionId) {
      switch (excursionId) {
        case 1:
          return 'TEMPERATURE'

        case 2:
          return 'SHOCK'
        case 3:
          return 'TIME'
        default:
          return 'Transparent'
      }
    },
  },
}
</script>
