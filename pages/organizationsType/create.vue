<template>
  <page-layout :create="false" :loading="loading" title="Organizations">
    <template slot="content"> <organizations /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import organizations from '~/components/organizations/form'

export default {
  components: { 'page-layout': PageLayout, organizations },
  data() {
    return {
      loading: false,
    }
  },
}
</script>