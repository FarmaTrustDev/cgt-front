<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <LookupsTreatmentType @onChange="onTreatmentSelect" />

      <a-skeleton :loading="loading">
        <span v-if="categories">
          <CategoryTabs :categories="categories" />
          <FormActionButton />
        </span>
      </a-skeleton>
    </a-form>
  </div>
</template>
<script>
// import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
import CategoryTabs from '~/components/treatment/enrollment/screening/Tabs'
export default {
  components: { CategoryTabs },
  mixins: [notifications, routeHelpers, nullHelper],
  data() {
    return {
      patientId: null,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      loading: false,
      categories: null,
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
        this.loading = false
      })
    },
    onTreatmentSelect(treatmentTypeId) {
      this.loading = true
      ScreeningCategoryServices.getByTreatment(treatmentTypeId)
        .then((response) => {
          this.categories = response.data
        })
        .finally(() => (this.loading = false))
        .catch(this.error)
    },
    create(values) {
      console.log(values)
    },
  },
}
</script>
