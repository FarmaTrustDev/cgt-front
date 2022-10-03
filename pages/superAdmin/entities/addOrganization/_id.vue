<template>
      <div class=" mtminus-2 container">
          <FormField :fieldName="fieldName" />
      </div>
</template>
<script>

import FormField from '~/pages/superAdmin/entities/addOrganization/form'
import {
  LOGISTIC_ALIAS,
  HOSPITAL_ALIAS,
  MANUFACTURER_ALIAS,
} from '~/services/Constant'
export default {
  components:{FormField},
    data(){
      return{
        loading: false,
        fieldName:this.$route.query.name,
        organizationTypeAlias:''
      }
    },
    mounted(){
      this.GetOrganizationTypeAlias();
  },
  methods:{
    GetOrganizationTypeAlias(fieldName)
    {
      if(this.fieldName === 'Hospital')
      {
         this.organizationTypeAlias =  HOSPITAL_ALIAS
      }
      else if(this.fieldName === 'Logistic')
      {
        this.organizationTypeAlias = LOGISTIC_ALIAS
      }
      else if(this.fieldName === 'Manufacturer')
      {
        this.organizationTypeAlias = MANUFACTURER_ALIAS
      }
    },
  },
}
</script>