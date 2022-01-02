<template>
  <div>

    <a-row>
      <h3 class="page-title">Label</h3>
    </a-row>
    <a-row class="mt-15">
      <Table />
    </a-row>
  </div>
</template>

<script>
  import Table from '~/components/labeling/Listing'
  export default {
    components : { Table },
    data(){
      return{
        
      }
    }
  }
</script>