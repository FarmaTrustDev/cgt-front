<template>
  <page-layout :loading="loading" title="Screening Detail">
    <template slot="content"> <create /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/pages/manufacturer/screening/create'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
