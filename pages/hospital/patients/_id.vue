<template>
  <page-layout :create="false" title="Patient Enrollment">
    <template slot="content"><Enrollment /></template>
  </page-layout>
</template>

<script>
import Enrollment from '~/components/root/patient/enrollment'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { Enrollment, 'page-layout': PageLayout },
  middleware: 'auth',
  mounted() {
    console.log(this.$route)
  },
}
</script>
