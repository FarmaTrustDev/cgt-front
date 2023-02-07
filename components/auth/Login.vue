<template>
  <div class="half-secondary">
    <div class="login">
      <a-card :bordered="false" title="Sign In To ATMPS">
        <a-form :form="form" layout="horizontal" @submit="onSubmit">
          <a-alert v-if="showError" :message="error" banner closable />
          <a-form-item label="Username">
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
              placeholder="Email/Username"
            />
          </a-form-item>
          <a-form-item label="Password">
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your password' },
                  ],
                },
              ]"
              size="large"
              placeholder="Password"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-checkbox>
              Remember me
            </a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button
              block
              size="large"
              type="primary"
              html-type="submit"
              :loading="loading"
              >Sign In</a-button
            >
          </a-form-item>
          <div class="forgot-link"><a href="javascript:;" @click="goto(`/forgot`)">Forgot Password?</a></div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import AuthServices from '~/services/API/AuthServices'
import UserServices from '~/services/API/UserServices'
// import AssetServices from '~/services/API/AssetServices'
// import LocatorServices from '~/services/API/LocationServices'
import { setAccessToken, setRefreshToken, setBlyottAccessToken, setBlyottRefreshToken } from '~/services/Auth'
// import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
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
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values)
        } else {
          this.loading = false
        }
      })
    },
    login(params) {
      AuthServices.login({ email: '', ...params })
        .then((response) => {
          setRefreshToken(response.refreshToken)
          setAccessToken(response.accessToken)
          this.$store.commit('setToken', {
            token: response.accessToken,
            status: true,
          })
          AuthServices.blyottAuthentication({username:'ZulqrnainA', password:'17January2020'})
            .then((blyott)=>{
              setBlyottAccessToken(blyott.Token)
              setBlyottRefreshToken(blyott.RefreshToken)
              // console.log(blyott.RefreshToken)
            })
          /* AuthServices.blyottAuthentication({username:'ZulqrnainA', password:'17January2020'})
            .then((blyott)=>{
              setBlyottAccessToken(blyott.Token)
              setBlyottRefreshToken(blyott.REFRESH_TOKEN)
              AssetServices.getAllLocations({Page: 1, PageSize: 25, GlobalSearch: "", SortBy: "TagId", SortOrder: "Asc", Filters: []})
                .then((location)=>{
                  location.Items.forEach((element)=>{
                    const data=JSON.parse(JSON.stringify(element))
                    AssetServices.create(data)
                      .then((createResponse)=>{
                        console.log(createResponse)
                      })
                  })
                })
            }) */
          this.userDetail()
          success(this, { message: response.message })
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            this.error = 'Invalid Username/Password'
            this.showError = true
          }
        })
        .finally(() => (this.loading = false))
    },
    userDetail() {
      UserServices.detail()
        .then((response) => {
          this.$store.commit('setUser', response.data)
        })
        .then(() => {
          this.$router.push({ path: '/' })
          this.loading = false
        })
    },
  },
}
</script>
