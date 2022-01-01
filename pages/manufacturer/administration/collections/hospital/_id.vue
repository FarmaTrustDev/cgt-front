<template>
  <page-layout
    :create="false"
    :loading="loading"
    title="Hospital collection process"
  >
    <template slot="content"> <create /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/root/manufacturer/admin/collection/Form.vue'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
