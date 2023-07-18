<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <formfield @handleChange="handleChange" />

    </a-form>
    <a-modal
            :visible="showModal"
            class="modal-design-smart-lab-label"
            :dialog-style="{ right: '10%', top: '10%' }"
            @ok="handleOk(false)"
            cancelText=""
          >
              <a-card class="white-card-smart-lab-label">
                <a-row>
                    <a-col :span="6"></a-col>
                    <a-col :span="12">Message has been sent for approval</a-col>
                    <a-col :span="6"></a-col>
                </a-row>
              </a-card>
              <div slot="footer">
                <a-button type="primary" @click="handleOk(false)">OK</a-button>
              </div>
          </a-modal>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import UserServices from '~/services/API/UserServices'
import formfield from '~/components/root/inventory/storageFacility/form/FormField'

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
      showModal:false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'usersCreate',
      }),
      gotoLink: '/users',
      apiService: UserServices,
      fileList: [],
      isCreated: false,
      
    }
  },
  mounted() {
    this.checkCreated()
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
      handleChange(info) {
        this.fileList = info
    },
    handleOk() {
        this.showModal = false
        this.goto('/inventory/storage/facility')
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
      this.btnLoading = true
      this.apiService
        .update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          if (!this.isEmpty(this.gotoLink)) {
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
          if(response.message===true){
            this.success(response.message)
          }else{
            this.success(response.errorMessage)
          }
          if (!this.isEmpty(this.gotoLink)) {
            this.goto(`${this.gotoLink}/${response.data.globalId}`)
          }
          if (this.isFunction(this.afterCreate)) {
            this.afterCreate(response)
            this.btnLoading = false
            this.loading = false
          }
        })
        .catch(this.error)
        .finally(() => {
          // this.btnLoading = false
          // this.loading = false
          this.loading = false
        })
    },  
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.success('Message sent for approval')
          this.showModal=true
          // this.goto('/inventory/storage/facility')
          /* const formData = new FormData()
          for (const key in values) {
            formData.append(key, values[key])
          }
          this.fileList.forEach((files) => {
            formData.append('profileImageUrl', files)
          })        
          this.upsert(formData) */
        } else {
          this.loading = false
        }
        
      })
      // this.loading = false
    },
  },
}
</script>
