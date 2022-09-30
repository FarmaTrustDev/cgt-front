<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Hospital Details"
    class="container"
  >
    <template slot="content">
      <div class="grey-card mtminus-2 container">
        <a-card :bordered="false" class="default-border-radius mtminus-2">
          <a-form :form="form" @submit="onSubmit">
          <FormField 
          :entity="organizationData"
          :form="form"
          :is-created="isCreated"
          @handleChange="handleChange"
          />
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 23 }">
          <FormActionButton
          :loading="loading"
          :is-created="isCreated"
          custom-text="Save"
        />
      </a-form-item>
        </a-form>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import FormField from '~/components/root/superAdmin/entities/addHospital/formFields'
import OrganizationServices from '~/services/API/OrganizationServices'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
export default {
    components:{'page-layout': PageLayout,FormField},
    mixins:[notifications,routeHelpers,nullHelper],
    data(){
      return{
        apiService: OrganizationServices,
        form: this.$form.createForm(this, {
        name: 'hospitalCreate',
      }),
        organizationData:{},
        loading:false,
        fileList: {},
        isCreated: false,
        gotoLink: '/superAdmin/entities',
      }
    },
    computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
  },
  methods:{
    handleChange(info) {
      this.fileList = info
    },
    onSubmit(e)
    {
    this.loading = true
      e.preventDefault()
        this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
          for (const key in values) {
            formData.append(key, values[key])
          }
            formData.append('organizationTypeId',4)
          this.fileList.forEach((files) => {
            formData.append('profileImageUrl', files)
          })
          this.upsert(formData)
        } else {
          this.loading = false
        }
      })
    },
    upsert(values)
    {
      if (this.isFunction(this.beforeUpsert)) {
        this.beforeUpsert(values)
      }
      if(this.isCreated)
      {
        return this.update(values)
      }
      return this.create(values)
    },
    create(values)
    {
      this.loading = true
      this.apiService.create(values)
      .then((response) =>{
        this.success(response.message)
        this.goto(`${this.gotoLink}`)
      })
    },
    update(values)
    {
      const entityId = this.$route.params.id
      this.apiService.update(entityId,values)
      .then((response)=>{
        this.success(response.message)
      })
    },
    checkCreated()
    {
      const entityId = this.$route.params.id
      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
        this.fetch(entityId)
      }
    },
    fetch(id)
    {
      this.loading = true
      this.apiService.getByGuid(id)
      .then((response)=>{
          this.organizationData = response.data
      }).finally(this.loading = false)
    }
  }
}
</script>