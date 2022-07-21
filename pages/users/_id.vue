<template>
  <page-layout :create="false" :loading="loading" :bordered="false" :back="false">
    <template slot="content">
      <div class="grey-card mtminus-2">
        <a-card :bordered="false" class="default-border-radius mtminus-2">
          <h2>{{translation.AddUser_3_418}}</h2>
          <formField />
      </a-card>
    </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import formField from '~/components/root/user/form'
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },    
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
