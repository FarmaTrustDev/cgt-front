<template>
  <page-layout title="Patients Enrollment" class="patient-page" :create="false">
    <template slot="content">
      <div class="grey-card enrollment-page">
        <a-card :bordered="false" class="default-border-radius">
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
