<template>
  <page-layout
    :create="false"
    :loading="loading"
    :title="treatmentName + ' Hospital collection process'"
  >
    <template slot="content">
      <create @fetchTreatmentName="fetchTreatmentName" />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/root/manufacturer/admin/collection/Form'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
      treatmentName: '',
    }
  },
  methods: {
    fetchTreatmentName(treatmentName) {
      console.log(treatmentName)
      this.treatmentName = treatmentName
    },
  },
}
</script>
