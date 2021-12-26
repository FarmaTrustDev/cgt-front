<template>
  <div>
    <calendar :handle-date-click="handleDateClick"></calendar>
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
    return {}
  },
  methods: {
    handleDateClick(arg, callback) {
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
