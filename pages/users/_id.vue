<template>
  <page-layout :create="false" :loading="loading" title="Users">
    <template slot="content">
      <formField />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'

import formField from '~/components/root/user/form/index.vue'
export default {
  components: { 'page-layout': PageLayout, formField },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'UsersCreate',
      }),
    }
  },
  methods: {
    // onSubmit(e) {
    //   this.loading = true
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log(values)
    //       OrganizationServices.put(values)
    //         .then((response) => {
    //           console.log(response.data)
    //         })
    //         .finally(() => (this.loading = false))
    //     } else {
    //       this.loading = false
    //     }
    //   })
    // },
  },
}
</script>
