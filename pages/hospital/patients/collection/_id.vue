<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page"
    :create="false"
  >
    <template slot="content">
      {{ entity }}
      <detail :patient="entity" />
    </template>
  </page-layout>
</template>

<script>
import detail from '~/components/root/patient/details'
import PageLayout from '~/components/layout/PageLayout'
import withCrud from '~/mixins/with-crud'
import PatientServices from '~/services/API/PatientServices'
export default {
  components: { detail, 'page-layout': PageLayout },
  mixins: [withCrud],
  middleware: 'auth',
  data() {
    return { apiService: PatientServices,fetchMethod:PatientServices.getById }
  },
  mounted() {},
}
</script>
