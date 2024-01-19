<template>
  <div>
    <h3 class="page-title">{{translation.AfterNotes_2_989}}</h3>
    <FormFields :treatment="treatment" :entity="entity"></FormFields>
    <FormActionButton :is-created="isCreated" :custom-text="translation.Creat_1_123" />
  </div>
</template>
<script>
import FormFields from '~/components/treatment/enrollment/afterCare/FormFields'
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
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
