<template>
  <div>
    <h3 class="page-title">Aftercare Notes</h3>
    <FormFields :treatment="treatment" :entity="entity"></FormFields>
    <FormActionButton :is-created="isCreated" />
  </div>
</template>
<script>
import FormFields from '~/components/treatment/enrollment/AfterCare/FormFields'
import TreatmentAvailabilityServices from '~/services/API/TreatmentAvailabilityServices'
export default {
  components: { FormFields},
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
