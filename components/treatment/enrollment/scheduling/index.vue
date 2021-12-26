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

export default {
  components: { Form },
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      formLayout: 'horizontal',
      successResponse: '',
      error: null,
      showError: false,
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
    }
  },
  methods: { onSubmit() {} },
}
</script>
