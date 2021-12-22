<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <LookupsTreatmentType @onChange="onTreatmentSelect" />
    </a-form>
  </div>
</template>
<script>
// import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
export default {
  mixins: [notifications, routeHelpers, nullHelper],
  data() {
    return {
      patientId: null,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      loading: false,
    }
  },
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.create(values)
        } else {
          this.loading = false
        }
      })
    },
    onTreatmentSelect(treatmentTypeId) {
      ScreeningCategoryServices.getByTreatment(treatmentTypeId).then((r) => {
        console.log(r)
      })
    },
    create(values) {
      console.log(values)
    },
  },
}
</script>
