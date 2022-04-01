<template>
  <div>
    <a-form :form="form" @submit="onSubmit">
      <form-fields />
      <FormActionButton :loading="loading" text="Create" />
    </a-form>
  </div>
</template>
<script>
import FormField from '~/components/zoom/FormField'
export default {
  components: { 'form-fields': FormField },
  data() {
    return {
      loading: this.$parent.loading,
      form: this.$form.createForm(this, {
        name: 'zoom',
      }),
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', values)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
