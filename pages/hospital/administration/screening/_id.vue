<template>
  <page-layout :create="false" class="container" :loading="loading" :title="translation.ScreeQuest_2_566">
    <template slot="content"> <create /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/root/hospital/screening/CreateForm'
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
