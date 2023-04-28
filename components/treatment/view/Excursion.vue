<template>
  <div>
    <div class="mb-25 dangerFadeInOut p-1 text-white" v-if="treatment.excursionId !== null">
      <div>
        <img :src="getImageUrl('Icons/thermometer-temperature-icon.svg')" height="30px" />
       <h3 class="text-white"> {{ getMessage(treatment.excursionId) }} EXCURSION </h3>
      </div>
      <div>Contact: 0441 839380</div>
    </div>
   
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: {
    treatment: { required: true, type: Object },
    // bags: { required: true, type: Object },
  },
  methods: {
    getMessage(excursionId) {
      if(excursionId === 1)
      {
        return 'TEMPERATURE'
      }
      if (excursionId ===2)
      {
        return 'SHOCK';
      }
      if(excursionId === 3)
      {
        return 'TRANSPORT DELAY'
      }
    },
  },
}
</script>
