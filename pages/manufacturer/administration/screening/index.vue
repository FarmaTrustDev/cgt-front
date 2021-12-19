<template>
  <page-layout :loading="loading" title="Screenings">
    <template slot="content"> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { 'page-layout': PageLayout },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
