<template>
    <div>
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <FormFields
          :form="form"
          :entity="userData"
          :is-created="isCreated"
          @cheCreated="checkCreated"
        />
        <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
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
  import TagServices from '~/services/API/TagServices'
  import FormFields from '~/components/blyott/tag/FormField'  
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
          name: 'tagCreate',
        }),
        gotoLink: '/blyott/tag',
        apiService: TagServices,
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
            this.entity = response.data.data
            this.userData = response.data.data
            console.log(this.userData)
            if (this.isFunction(this.getEntity)) {
              this.getEntity(response)
            }
          })
          .finally(() => (this.loading = false))
      },
      upsert(values, tagId,cgtTagId) {
        if (this.isFunction(this.beforeUpsert)) {
          this.beforeUpsert(values)
        }
        if (this.isCreated) {
          return this.update(values, tagId,cgtTagId)
        }
        return this.create(values, tagId)
      },
      update(values, tagId,cgtTagId) {
        this.btnLoading = true
        this.apiService
          .updateBlyott(values)
          .then((response) => {
            this.success(response.message)
            this.apiService.fetchBlyottTagByCode(tagId).then((response)=>{
              const data=JSON.parse(JSON.stringify(response))
              data.id=cgtTagId
              console.log(data)
              this.apiService.update(data).then((response)=>{
                this.goto(this.gotoLink)
            })
          })
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
      create(values, tagId) {
        this.btnLoading = true
        this.loading = true
        this.apiService
          .createBlyott(values)
          .then((response) => {
            this.success(response.message)
            this.apiService.fetchBlyottTagByCode(tagId).then((response)=>{
              const data=JSON.parse(JSON.stringify(response))
              console.log(data)
              this.apiService.create(data).then((response)=>{
                this.goto(this.gotoLink)
            })
          })
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
              const data = JSON.stringify({
                  TagId:values.tagId,
                  TagType:2,
                  TagHardwareId:values.hardwareModelId,
                  NFCId:values.nfcId,
                  AssetId:values.assetId>0 ? values.assetId : null,
                  FixedLocationId:values.locationId,
              })
            this.upsert(data,values.tagId,values.cgtTagId)
          } else {
            this.loading = false
          }
        })
      },
    },
  }
  </script>
  