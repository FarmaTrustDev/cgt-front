<template>
  <page-layout :create="false" :loading="loading" title="Organizations">
    <template slot="content"> <Organizations /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import Organizations from '~/components/organizations/organizations'
export default {
  components: { 'page-layout': PageLayout, Organizations },
  data() {
    return {
      loading: false,
    }
  },
}
</script>