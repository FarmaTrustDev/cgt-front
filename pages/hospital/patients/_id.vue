<template>
  <page-layout class="patient-page enrollment-title" :create="false">
    <template slot="content">
      <div class="grey-card enrollment-page container green-on-update">
        <a-card :bordered="false" class="default-border-radius pt-0">
          <Enrollment />
        </a-card></div
    ></template>
  </page-layout>
</template>

<script>
import Enrollment from '~/components/root/patient/enrollment'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { Enrollment, 'page-layout': PageLayout },
  middleware: 'auth',
  mounted() {},
}
</script>
