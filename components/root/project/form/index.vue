<template>
    <div>
      <a-form :form="form" :layout="formLayout" @submit.prevent="onSubmit" >
        <FormFields
          :form="form"
          :entity="userData"
          :is-created="isCreated"
          @cheCreated="checkCreated"
          @handleChange="handleChange"
        />
        <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 23 }">
          <FormActionButton
            :is-created="isCreated"
            :loading="loading"
          />
        </a-form-item>
      </a-form>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import nullHelper from '~/mixins/null-helpers'
  import notifications from '~/mixins/notifications'
  import ProjectServices from '~/services/API/ProjectServices'
  import FormFields from '~/components/root/project/form/FormField'
  
  export default {
    components: { FormFields },
    mixins: [notifications, routeHelpers, nullHelper],
  
    data() {
      return {
        loading: false,
        successResponse: '',
        showError: false,
        userData: {},
        entityId: null,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'projectCreate',
        }),
        gotoLink: '/project',
        apiService: ProjectServices,
        projectService:ProjectServices,
        fileList: [],
        isCreated: false,
        file: [],
        activate: true,
        deactivate: true,
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.checkCreated()
    },
    methods: {
      handleChange(info) {
        this.fileList = info
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
            this.userData = response.data
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
            this.goto('/project')
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
        this.projectService
          .create(values)
          .then((response) => {
            this.success(response.message)
            this.goto('/project')
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
          })
      },
      onSubmit(e) {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            // console.log(values)
            /* const formData = new FormData()
            for (const key in values) {
              formData.append(key, values[key])
            }
              this.fileList.forEach((files) => {
                formData.append('profileImageUrl', files)
              }) */
            this.upsert(values)
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },
      
    },
  }
  </script>
  