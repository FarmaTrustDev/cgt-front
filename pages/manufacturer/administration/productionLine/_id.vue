<template>
  <page-layout :create="false" :loading="loading" title="Screening Group">
    <template slot="content"> <create /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/root/manufacturer/screening/CreateForm'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
