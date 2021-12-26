<template>
  <div>
    <a-form-item label="Username">
      <a-input
        v-decorator="[
          'username',
          {
            rules: [{ required: true, message: 'Please input your Email!' }],
          },
        ]"
        size="large"
        placeholder="Email/Username"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      loading: false,
      successResponse: '',
      error: null,
      showError: false,
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
    }
  },
  methods: { onSubmit(e) {} },
}
</script>
