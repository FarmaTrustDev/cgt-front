<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <formfield @handleChange="handleChange" />
      <a-form-item
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
      >
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          :custom-text="translation['Save&_3_453']"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import UserServices from '~/services/API/UserServices'
import formfield from '~/components/root/user/form/FormField'

export default {
  components: { formfield },
  mixins: [notifications, routeHelpers, nullHelper],

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
      fileList: [],
      isCreated: false,
      file:[],
      
    }
  },
  mounted() {
    this.checkCreated()
  },
  computed:{
    users() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
      handleChange(info) {
        // console.log(info)
        this.fileList = info
        console.log(this.fileList)
        // this.file=this.fileList[0].originFileObj
        // console.log(this.fileList[0].originFileObj)
        // this.$emit('handleChange', this.fileList)
    },
    checkCreated() {
      const entityId = this.$route.params.id
      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
        this.fetch(entityId)
      }
    },
    fetch(id) {
      this.loading = true
      this.apiService
        .getById(id)
        .then((response) => {
          this.entity = response.data
          if (this.isFunction(this.getEntity)) {
            this.getEntity(response)
          }
        })
        .finally(() => (this.loading = false))
    },
    upsert(values) {
      if (this.isFunction(this.beforeUpsert)) {
        this.beforeUpsert(values)
      }
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    update(values) {
      // console.log(values)
      this.btnLoading = true
      this.apiService
        .update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          if (!this.isEmpty(this.gotoLink)) {
            this.userDetail()
            this.goto(`${this.gotoLink}`)
          }
          if (this.isFunction(this.afterUpdate)) {
            this.afterUpdate(response)
            this.btnLoading = false
            this.loading = false
          }
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
    create(values) {
      this.btnLoading = true
      this.loading = true
      this.apiService
        .create(values)
        .then((response) => {
            this.success(response.message)
            if (!this.isEmpty(this.gotoLink)) {
              this.goto(`${this.gotoLink}`)
            }
            if (this.isFunction(this.afterCreate)) {
              this.afterCreate(response)
              this.btnLoading = false
              this.loading = false
            }
        })
        .catch(this.error)
        .finally(() => {
          this.btnLoading = false
          this.loading = false
          this.loading = false
        })
    },  
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
          for (const key in values) {
            // console.log(this.fileList)
            formData.append(key, values[key])
          }
          this.fileList.forEach((files) => {
            console.log(files)
            formData.append('profileImageUrl', files)
          })
          // console.log(formData)        
          this.upsert(formData)
        } else {
          this.loading = false
        }
      })
      // this.loading = false
    },
    userDetail() {
      UserServices.detail()
        .then((response) => {
          console.log(response)
          this.$store.commit('setUser', response.data)
        })
        .then(() => {
          this.$router.push({ path: '/users' })
          this.loading = false
        })
    },  
  },
}
</script>
