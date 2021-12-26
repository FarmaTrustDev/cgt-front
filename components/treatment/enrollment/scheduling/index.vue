<template>
  <div>
    <a-spin :spinning="loading">
      <calendar :handle-date-click="handleDateClick"></calendar>
    </a-spin>
  </div>
</template>
<script>
import calendar from '~/components/calendars/index'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'
export default {
  components: { calendar },
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    handleDateClick(arg, callback) {
      console.log('handleDateClick ', arg)
      this.loading = true
      TreatmentAvailabilityServices.get({
        ...arg,
        treatmentTypeId: this.treatment.treatmentTypeId,
      })
        .then((schedules) => {
          callback(schedules.data)
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
  },
}
</script>
