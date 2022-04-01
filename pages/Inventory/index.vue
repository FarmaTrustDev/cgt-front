<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :back="false"
    title="Smart Lab"
  >
    <template slot="content">
      <inventory />
    </template>
  </page-layout>
</template>
<script>
import inventory from '~/components/root/inventory'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { 'page-layout': PageLayout, inventory },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
}
</script>
