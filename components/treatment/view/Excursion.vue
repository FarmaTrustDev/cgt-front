<template>
  <div>
    <div v-if="treatment.excursionId !== null" class="mb-25">
      <div class="dangerFadeInOut" type="error" show-icon>
        <div slot="description">
          <span class="display-flex"><h2 class="text-white"> {{ getMessage(treatment.excursionId) }} EXCURSION </h2> <span class="ml-2 pt-05"> {{ redTileName!= null ? '(' + redTileName + ')' : '' }}</span></span>
          <div>Contact 0441839380 <span style="font-size: 10px;">8 Feb 2023 8:20</span></div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  // components: { alert },
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

        default:
          return 'Transparent'
      }
    },
  },
}
</script>
