<template>
  <page-layout :loading="loading" title="Organizations">
    <template slot="content">
      <a-form
        :create="false"
        :form="form"
        :layout="formLayout"
        @submit="onSubmit"
      >
        <OrganizationsForm />
        <a-form-item>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </template>
  </page-layout>
</template>
<script>
import notifcations from '~/mixins/notifications'
import OrganizationServices from '~/services/API/OrganizationServices'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { 'page-layout': PageLayout },
  mixins: [notifcations],
  props: {
    organization: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'OrganizationsCreate',
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
          OrganizationServices.put(values)
            .then((response) => {
              console.log(response.data)
            })
            .finally(() => (this.loading = false))
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>