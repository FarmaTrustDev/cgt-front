<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    :bordered="borderCard"
    class="patient-page"
    :create="false"
  >
    <template slot="content"> <detail /></template>
  </page-layout>
</template>

<script>
import detail from '~/components/root/patient/details'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { detail, 'page-layout': PageLayout },
  middleware: 'auth',
  mounted() {},
}
</script>
