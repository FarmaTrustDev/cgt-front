<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="organizationName + ' Details'"
    class="container"
  >
    <template slot="content">
      <div class="grey-card mtminus-2 container">
        <a-card :bordered="false" class="default-border-radius mtminus-2">
          <a-form :form="form" @submit="onSubmit">
          <FormField 
          :entity="organizationData"
          :form="form"
          :organization-name="organizationName"
          :is-created="isCreated"
          @cheCreated="checkCreated"
          @handleChange="handleChange"
          />
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 23 }">
          <FormActionButton
          :loading="loading"
          custom-text="Save"
          :is-created="isCreated"
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
import FormField from '~/components/root/superAdmin/entities/formFields'
import OrganizationServices from '~/services/API/OrganizationServices'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import {
  LOGISTIC_ALIAS,
  HOSPITAL_ALIAS,
  MANUFACTURER_ALIAS,
} from '~/services/Constant'
// import { isEmpty } from '~/services/Utilities'
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
        organizationName : '',
        organizationType: '',
        organizationTypeAlias :''
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
    this.organizationType = this.$route.query.name;
    this.GetOrganizationTypeAlias(this.organizationType)
    this.loading = true
      e.preventDefault()
        this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
          for (const key in values) {
            formData.append(key, values[key])
          }
            formData.append('organizationTypeAlias',this.organizationTypeAlias)
          this.fileList.forEach((files) => {
            formData.append('profileImageUrl', files)
          })
          this.upsert(formData)
        } else {
          this.loading = false
        }
      })
    },
    GetOrganizationTypeAlias(name)
    {
      if(name === 'Hospital')
      {
         this.organizationTypeAlias =  HOSPITAL_ALIAS
      }
      else if(name === 'Logistic')
      {
        this.organizationTypeAlias = LOGISTIC_ALIAS
      }
      else if(name === 'Manufacturer')
      {
        this.organizationTypeAlias = MANUFACTURER_ALIAS
      }
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
      })
      this.getOrganization();
        this.goto(`${this.gotoLink}`)
    },
    update(values)
    {
      // const entityId = this.$route.params.id
      this.apiService.update(this.entityId,values)
      .then((response)=>{
        this.success(response.message)
      })
      this.getOrganization()
      this.goto(`${this.gotoLink}`)
    },
    checkCreated()
    {
      this.organizationName = this.$route.query.name;
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
    },
    getOrganization()
        {
            OrganizationServices.get({ organizationTypeAlias: this.organizationTypeAlias })
                .then((response) => {
                    this.organization = response.data
                    })
        }
  }
}
</script>