<template>
    <page-layout
      :loading="false"
      title="Register New Sample"
      class="specific container page-search-input-container"
      :create="false"
    >
      
      <div slot="content">
        <SampleRegister></SampleRegister>
      </div>
    </page-layout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout'
  import SampleRegister from '~/components/root/sample'
  export default {
    components: { 
        PageLayout, 
        SampleRegister
    },
    data() {
      return {
      }
    },
    computed: {
     
    },
    mounted() {
      
    },
    methods: {
      
    },
  }
  </script>