<template>
  <div>
    <calendar
      :handle-date-click="fetchEvents"
      @getEventClick="getEventClick"
    ></calendar>
    <FormFields :entity="entity"></FormFields>
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
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isCreated: false,
      entity: {},
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
    getEventClick(detail) {
      //  this.entity.manufacturerName =
      console.log(detail.event._def)
      this.form.setFieldsValue({
        manufacturerName: detail.event._def.title,
        treatmentAvailabilityId: detail.event._def.publicId,
      })
      // console.log('detail._def', detail)
      // console.log(detail)
    },
  },
}
</script>
