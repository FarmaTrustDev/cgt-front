<template>
  <div class="label-page">

    <a-row class="p-10 mb-10">
      <div class="page-header">
        <h3 class="page-title float-left">Label</h3>
       
        <a-input ref="userNameInput" placeholder="Search" class="float-right page-search-input">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
    </a-row>


    <a-row class="">
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