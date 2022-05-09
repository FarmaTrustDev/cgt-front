<template>
  <page-layout :create="false" :loading="loading" title="Screening Group">
    <template slot="content"> <productionLineCreate /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import productionLineCreate from '~/components/root/manufacturer/productionLine/Form'
export default {
  components: { 'page-layout': PageLayout, productionLineCreate },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
