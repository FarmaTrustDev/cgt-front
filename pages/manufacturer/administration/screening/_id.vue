<template>
  <page-layout :create="false" :loading="loading" :title="translation.ScreeGroup_2_462">
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
