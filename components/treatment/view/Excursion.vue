<template>
  <div>
    <div v-if="treatment.excursionId !== null" class="mb-25">
      <div class="dangerFadeInOut" type="error" show-icon>
        <div slot="description">
          <p>{{ getMessage(treatment.excursionId) }} EXCURSION</p>
          <div>Contact 0441839380</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    treatment: { required: true, type: Object },
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
