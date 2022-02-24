<template>
  <page-layout
    :create="false"
    :loading="loading"
    :title="treatmentName + ' Treatment Collection Process'"
  >
    <template slot="content">
      <create
        :collection-type="COLLECTION_TYPE.treatment.id"
        @fetchTreatmentName="fetchTreatmentName"
      />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import create from '~/components/root/manufacturer/admin/collection/Form'
import { COLLECTION_TYPE } from '~/services/Constant'
export default {
  components: { 'page-layout': PageLayout, create },
  data() {
    return {
      loading: false,
      treatmentName: '',
      COLLECTION_TYPE,
    }
  },
  methods: {
    fetchTreatmentName(treatmentName) {
      this.treatmentName = treatmentName
    },
  },
}
</script>
