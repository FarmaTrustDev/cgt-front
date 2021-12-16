<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <PatientEnrollmentForm />
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      successResponse: '',
      error: null,
      showError: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
    }
  },
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
