<template>
  <page-layout
    :create="false"
    :loading="loading"
    :title="translation.TreatColle_3_1033"
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
const ActionLink = '/manufacturer/administration/collections/treatment'
export default {
  components: { 'page-layout': PageLayout, listing },
  data() {
    return {
      loading: false,
      ActionLink,
      borderCard: false,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {},
}
</script>
