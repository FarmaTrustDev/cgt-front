<template>
  <page-layout
    :create="false"
    :loading="loading"
    title="Treatment Collection Process"
  >
    <template slot="content">
      <create :collection-type="COLLECTION_TYPE.treatment.id" />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'

import { COLLECTION_TYPE } from '~/services/Constant'
import create from '~/components/root/admin/collection/create'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
      treatmentName: '',
      COLLECTION_TYPE,
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
