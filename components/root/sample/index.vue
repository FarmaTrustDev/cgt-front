<template>
    <div >
      <a-form :form="form" :layout="formLayout" @submit.prevent="onSubmit">
        <FormFields
          :form="form"
          :entity="userData"
          :is-created="isCreated"
          :projectRequired="projectRequired"
          @projRequired="projRequired"
        />
        <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
          <FormActionButton class="mt-10 "
            :is-created="isCreated"
            :loading="btnLoading"
            custom-text="Register"
          />
        </a-form-item>
      </a-form>
      <a-modal>
      </a-modal>
    </div>
  </template>
  <script>
import moment from 'moment'
import routeHelpers from '~/mixins/route-helpers'
import SampleServices from '~/services/API/SampleServices'
import FormFields from '~/components/root/sample/formField'
  // import { isEmpty } from '~/services/Helpers'
  export default {
    components: { FormFields },
    mixins: [routeHelpers],
  
    data() {
      return {
        moment,
        loading: false,
        successResponse: '',
        showError: false,
        userData: {},
        entityId: null,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'sampleCreate',
        }),
        // gotoLink: '/inbound/samples/sampleRegister',
        fileList: [],
        isCreated: false,
        file: [],
        activate: true,
        deactivate: true,
        btnLoading: false,
        projectId:0,
        projectRequired : false
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
    //   this.checkCreated()
    },
    methods: {
    //   handleChange(info) {
    //     this.fileList = info
    //   },
    //   checkCreated() {
    //     const entityId = this.$route.query.id
    //     if (this.isGuid(entityId)) {
    //       this.entityId = entityId
    //       this.isCreated = true
    //       this.fetch(entityId)
    //     }
    //   },
    //   fetch(id) {
    //     this.loading = true
    //     SampleServices
    //       .getById(id)
    //       .then((response) => {
    //         response.data.timeReceipt = this.moment(response.data.timeReceipt).format("HH:mm")
    //         this.entity = response.data
    //         this.userData = response.data
    //         if (this.isFunction(this.getEntity)) {
    //           this.getEntity(response)
    //         }
    //       })
    //       .finally(() => (this.loading = false))
    //   },
      upsert(values) {
        // if (this.isFunction(this.beforeUpsert)) {
        //   this.beforeUpsert(values)
        // }
        if (this.isCreated) {
          return this.update(values)
        }
        return this.create(values)
      },
      update(values) {
        // this.btnLoading = true
        // values.sampleGuid = this.entity.sampleGuid
        // SampleServices
        //   .update(values)
        //   .then((response) => {
        //     this.success(response.message)
        //     this.goto('/task')
            // if (this.isFunction(this.afterUpdate)) {
            //   this.afterUpdate(response)
            //   this.btnLoading = false
            //   this.loading = false
            // }
        //   })
        //   .catch(this.error)
        //   .finally(() => {
        //     this.btnLoading = false
        //   })
      },
      create(values) {
        if(this.projectId === 0){
            this.projectRequired = true
            return false
        }
        this.btnLoading = true
        this.loading = true
        values.projectId = this.projectId
        SampleServices
          .create(values)
          .then((response) => {
            // this.success(response.message)
            // this.countDown(response)
            this.goto('/inventory/treatment')
            // this.goto('/inbound/samples/qualityAssurance?id='+response.data.sampleGuid)
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
      userDetail() {
        // UserServices.detail()
        //   .then((response) => {
        //     this.$store.commit('setUser', response.data)
        //   })
        //   .then(() => {
        //      this.users.name === 'Super Admin' ? this.goto(`/superAdmin/users`) :  this.$router.push({ path: '/users' })
        //     this.loading = false
        //   })
      },
      projRequired(e,id){
        this.projectId = id
        this.projectRequired = e
      },
    },
  }
  </script>
  