<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="organizationName + ' ' + translation.Detai_1_346"
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
          :custom-text="translation.save_1_462"
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
import { isEmpty } from '~/services/Utilities'
import ManufacturerTreatmentServices from '~/services/API/ManufacturerTreatmentServices'
import {
  LOGISTIC_ALIAS,
  HOSPITAL_ALIAS,
  MANUFACTURER_ALIAS,
  SMARTLAB_ALIAS
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
        organizationTypeAlias :'',
        treatTypesId: [],
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    watch:{
      translation(newValues, oldValue){
        if(newValues!==oldValue){
          this.GetOrganizationTypeTranslation(this.$route.query.name)
        }
      },
    },
  mounted() {
    this.checkCreated()
    this.GetOrganizationTypeTranslation(this.$route.query.name)
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
          if(values.treatmentTypesId)
            {
              this.treatTypesId = values.treatmentTypesId.slice();
            }
          let pat=''
          if(values.custom){
            for(let i=1;i<= (values.length) - (values.prefix.length);i++){
              if(!isEmpty(values['input'+i])){
                // alert('input')
                pat=pat+values['input'+i]
              }else if(values['pattern'+i]===true){
                pat=pat+'N'
                // console.log(values['pattern'+i])
              }else{
                pat=pat+'C'
              }
            }
          }
          // console.log(pat)
          const formData = new FormData()
          for (const key in values) {
            if(pat.length>0 && key==='pattern'){
              formData.append('pattern', pat)
            }else{
              formData.append(key, values[key])
            }
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
         // this.organizationName = this.translation.Hospi_1_47
      }
      else if(name === 'Logistic')
      {
        this.organizationTypeAlias = LOGISTIC_ALIAS
        // this.organizationName = this.translation.Manuf_1_89
      }
      else if(name === 'Manufacturer')
      {
        this.organizationTypeAlias = MANUFACTURER_ALIAS
        // this.organizationName = this.translation.Logis_1_146
      }
      else if(name === 'SmartLab')
      {
        this.organizationTypeAlias = SMARTLAB_ALIAS
        // this.organizationName = this.translation._1_440
      }
    },
    GetOrganizationTypeTranslation(name)
    {
      if(name === 'Hospital')
      {
         // this.organizationTypeAlias =  HOSPITAL_ALIAS
         this.organizationName = this.translation.Hospi_1_47
      }
      else if(name === 'Logistic')
      {
        // this.organizationTypeAlias = LOGISTIC_ALIAS
        this.organizationName = this.translation.Logis_1_146
      }
      else if(name === 'Manufacturer')
      {
        // this.organizationTypeAlias = MANUFACTURER_ALIAS 
        this.organizationName = this.translation.Manuf_1_89
      }
      else if(name === 'SmartLab')
      {
        // this.organizationTypeAlias = SMARTLAB_ALIAS
        this.organizationName = this.translation._1_440
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
          ManufacturerTreatmentServices.create({organizationId: response.data.result.id, treatmentTypesId: this.treatTypesId})
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
        ManufacturerTreatmentServices.create({organizationId: response.data.result.id, treatmentTypesId: this.treatTypesId})
        this.success(response.message)
      })
      this.getOrganization()
      this.goto(`${this.gotoLink}`)
    },
    checkCreated()
    {
      // this.organizationName = this.$route.query.name;
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
      OrganizationServices.get({ organizationTypeAlias: this.organizationTypeAlias }).then((response) => {
        this.organization = response.data
      })
    }
  }
}
</script>