<template>
  <div class="half-secondary">
    <div class="login">
      <a-card :bordered="false" :title="translation.ForgoPassw_2_471">
      <h3>{{translation.Enteryour_7_470}}</h3>
        <a-form :form="form" layout="horizontal" @submit="onSubmit">
          <a-alert v-if="showError" :message="error" banner closable />
          <a-form-item label="Email">
            <a-input
              v-decorator="[
                'username',
                {
                  rules: [
                    { required: true, message: 'Please input your Email!' },
                  ],
                },
              ]"
              size="large"
              placeholder="Email"
            />
          </a-form-item>
          <br>
          <a-form-item>
            <a-button
              block
              size="large"
              type="primary"
              html-type="submit"
              :loading="loading"
              >Submit</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
// import UserServices from '~/services/API/UserServices'
import AuthServices from '~/services/API/AuthServices'
import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import UserServices from '~/services/API/UserServices'
export default {
  mixins: [routeHelpers],
  data() {
    return {
      formLayout: 'horizontal',
      loading: false,
      successResponse: '',
      error: null,
      showError: false,
      form: this.$form.createForm(this, {
        name: 'login',
      }),
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.resetPasswordEmails(values)
        } else {
          this.loading = false
        }
      })
    },
    resetPasswordEmails(params) {
      AuthServices.getKeyWithEmail(params.username)
        .then((response) => {
          setRefreshToken(response.refreshToken)
          setAccessToken(response.accessToken)
          this.$store.commit('setToken', {
            token: response.accessToken,
            status: true,
          })
          // success(this, { message: response.message })
          UserServices.resetPasswordEmail(params.username).then((responses)=>{
            success(this, { message: responses.data })
          })
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            this.error = e.response.data.message
            this.showError = true
          }
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
