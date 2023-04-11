<template>
  <div>
    <div class="mb-25" v-if="treatment.excursionId !== null">
      <alert
        class="dangerFadeInOut"
        type="error"
        show-icon
        :message="`${getMessage(treatment.excursionId)} EXCURSION`"
      />
    </div>
  </div>
</template>
<script>
import alert from '~/components/alert'
export default {
  components: { alert },
  props: {
    treatment: { required: true, type: Object },
    // bags: { required: true, type: Object },
  },
  methods: {
    getMessage(excursionId) {
      return excursionId === 1 ? 'TEMPERATURE' : 'SHOCK'
    },
  },
}
</script>
