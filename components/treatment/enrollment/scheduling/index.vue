<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
        <Form :treatment="treatment" />
      </a-form>
    </a-spin>
  </div>
</template>
<script>
import Form from '~/components/treatment/enrollment/scheduling/Form'
import withCrud from '~/mixins/with-crud'
import SchedulingServices from '~/services/API/SchedulingServices'
export default {
  components: { Form },
  mixins: [withCrud],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
      apiService: SchedulingServices,
      gotoLink: '/manufacturer/schedules',
      fetchIdFromParams: false,
    }
  },
  mounted() {
    // this.fetch('asd')
  },
  methods: {},
}
</script>
