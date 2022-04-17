<template>
  <div class="half-secondary">
    <div class="login">
      <a-card :bordered="false" title="Reset Password">
        <a-form :form="form" layout="horizontal" @submit="onSubmit">
          <a-alert v-if="showError" :message="error" banner closable />
          <a-form-item label="Password">
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'This field is required!' },
                  ],
                },
              ]"
              size="large"
              placeholder="Password"
              type="password"
            />
          </a-form-item>
          <a-form-item label="Confirm Password">
            <a-input-password
              v-decorator="[
                'confirmPassword',
                {
                  rules: [
                    { required: true, message: 'This field is required.' },
                  ],
                },
              ]"
              size="large"
              placeholder="Confirm Password"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'privateKey',
                {
                  initialValue: privateKey,
                  rules: [
                    { required: true, message: '' },
                  ],
                },
              ]"
              size="large"
              placeholder=""
              type="hidden"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              block
              size="large"
              type="primary"
              html-type="submit"
              :loading="loading"
              >Activate Account</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import AuthServices from '~/services/API/AuthServices'
import UserServices from '~/services/API/UserServices'
import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Helpers'
export default {
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
      privateKey:'',
    }
  },
  mounted(){
      alert(this.$route.query.id)
      this.privateKey=this.$route.query.id
      this.checkUserKey(this.privateKey)
  },
  methods: {
    checkUserKey(key) {
      AuthServices.getActivationAuth(key)
        .then((response) => {
          setRefreshToken(response.refreshToken)
          setAccessToken(response.accessToken)
          this.$store.commit('setToken', {
            token: response.accessToken,
            status: true,
          })
          success(this, { message: response.message })
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            this.error = e.response.data.message
            this.showError = true
          }
        })
        .finally(() => (this.loading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const pass=values.password
          const confirmPass=values.confirmPassword
          if(pass===confirmPass){
            UserServices.resetPassword(values.privateKey,values).then((response)=>{
              success(this,{message:response.message})
            })
          }else{
            this.error='Confirm Password does not match'
            this.showError=true
            this.loading = false  
          }
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
