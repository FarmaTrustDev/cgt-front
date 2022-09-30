<template>
      <div class=" mtminus-2 container">
          <FormField />
      </div>
</template>
<script>

import FormField from '~/pages/superAdmin/entities/addLogistic/form'
export default {
    components:{FormField},
    data(){
      return{
        loading: false
      }
    }
}
</script>