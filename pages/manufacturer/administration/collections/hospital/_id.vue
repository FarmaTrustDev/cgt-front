<template>
  <page-layout
    :create="false"
    :loading="loading"
    :title="treatmentName + ' Hospital Collection Process'"
  >
    <template slot="content">
      <create
        :type="COLLECTION_TYPE.hospital.id"
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
