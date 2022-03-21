<template>
  <div>
    <h3 class="page-title">Available slots</h3>
    <div class="grey-card">
      <calendar
        :disabled-date="disabledDate"
        :handle-date-click="fetchEvents"
        @getEventClick="getEventClick"
      ></calendar>
    </div>
    <FormFields :treatment="treatment" :entity="entity"></FormFields>
    <FormActionButton :is-created="isCreated" />
  </div>
</template>
<script>
import FormFields from '~/components/treatment/enrollment/scheduling/FormFields'
import calendar from '~/components/calendars/index'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'
import SchedulingServices from '~/services/API/SchedulingServices'
import { getMomentByStandardFormat, _disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
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
      loading: false,
      entity: {},
      manufacturerTreatment: {},
    }
  },
  methods: {
    disabledDate: _disabledPreviousDate,
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
    getMomentByStandardFormat,
    getEventClick(detail) {
      // console.log(detail.event._def.publicId)
      SchedulingServices.getEstimation(detail.event._def.publicId).then(
        (response) => {
          const data = response.data
          this.form.setFieldsValue({
            manufacturerName: detail.event._def.title,
            treatmentAvailabilityId: detail.event._def.publicId,
            collectionDate: getMomentByStandardFormat(data.collectionDate),
            pickupDateTime: getMomentByStandardFormat(data.pickupDateTime),
            deliveryDate: getMomentByStandardFormat(data.deliveryDate),
            manufacturerTreatmentStartDate: getMomentByStandardFormat(
              data.manufacturerTreatmentStartDate
            ),
            completionDate: getMomentByStandardFormat(data.completionDate),
            deliveryArrivalDate: getMomentByStandardFormat(
              data.deliveryArrivalDate
            ),
            duration: data.duration,
          })
        }
      )

      // console.log('detail._def', detail)
      // console.log(detail)
    },
  },
}
</script>
