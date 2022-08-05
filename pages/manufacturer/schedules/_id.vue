<template>
  <page-layout
    :create="false"
    class="patient-page enrollment-title container"
    :loading="loading"
    :title="translation['TreatSetup_2_466']"
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
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
}
</script>
