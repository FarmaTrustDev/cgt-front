<template>
  <create
    :collection-type="collectionType"
    @fetchTreatmentName="fetchTreatmentName"
  />
</template>
<script>
import create from '~/components/root/manufacturer/admin/collection/Form'

export default {
  components: { create },
  props: { collectionType: { type: Number, require: true, default: null } },
  data() {
    return {
      loading: false,
      treatmentName: '',
    }
  },
  methods: {
    fetchTreatmentName(treatmentName) {
      this.treatmentName = treatmentName
    },
  },
}
</script>
