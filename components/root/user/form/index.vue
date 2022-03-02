<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <formfield />
      <a-form-item>
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          custom-text="Save User & Continue"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import UserServices from '~/services/API/UserServices'
import formfield from '~/components/root/user/form/FormField'

export default {
  components: { formfield },
  mixins: [notifications, routeHelpers, nullHelper, withCrud],

  data() {
    return {
      loading: false,
      successResponse: '',
      showError: false,
      user: {},
      entityId: null,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'usersCreate',
      }),
      gotoLink: '/users',
      apiService: UserServices,
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>
