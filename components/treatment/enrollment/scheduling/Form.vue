<template>
  <div>
    <calendar :handle-date-click="fetchEvents"></calendar>
    <FormFields></FormFields>
    <FormActionButton :is-created="isCreated" />
  </div>
</template>
<script>
import FormFields from '~/components/treatment/enrollment/scheduling/FormFields'
import calendar from '~/components/calendars/index'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'

export default {
  components: { FormFields, calendar },
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isCreated: false,
      
      manufacturerTreatment: {},
    }
  },
  methods: {
    fetchEvents(arg, callback) {
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
