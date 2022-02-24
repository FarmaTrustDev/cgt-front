<template>
  <page-layout
    :create="false"
    :loading="loading"
    title="Manufacturer Collection Process"
    :bordered="borderCard"
  >
    <template slot="content">
      <listing :action-link="ActionLink" />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import listing from '~/components/root/admin/collection/create/listing'
const ActionLink = '/manufacturer/administration/collections/manufacturer'
export default {
  components: { 'page-layout': PageLayout, listing },
  data() {
    return {
      loading: false,
      ActionLink,
      borderCard: false,
    }
  },
  methods: {},
}
</script>
