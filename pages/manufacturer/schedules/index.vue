<template>
  <page-layout :create="false" :loading="loading" title="Treatment Setup">
    <template slot="content"> <create /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/pages/manufacturer/scheduling'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
