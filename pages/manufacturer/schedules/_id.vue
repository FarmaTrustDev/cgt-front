<template>
  <page-layout
    :create="false"
    class="patient-page enrollment-title"
    :loading="loading"
    title="Treatment Setup"
  >
    <template slot="content"> 
          <create />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/root/manufacturer/scheduling'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
