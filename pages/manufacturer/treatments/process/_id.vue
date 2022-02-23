<template>
  <page-layout
    :loading="loading"
    title="Treatment Status"
    class="patient-page"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card">
        <profile-picture-and-detail :treatment="entity" />
      </div>
      {{ entity }}
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import withFetch from '~/mixins/with-fetch'
import TreatmentServices from '~/services/API/TreatmentServices'
import ProfilePictureCard from '~/components/patient/profile/ProfileAndDetail'
export default {
  components: {
    'page-layout': PageLayout,
    'profile-picture-and-detail': ProfilePictureCard,
  },
  mixins: [withFetch],
  middleware: 'auth',
  data() {
    return {
      apiService: TreatmentServices,
      fetchMethod: TreatmentServices.detail,
    }
  },
  mounted() {},

  methods: {
    afterFetch(data) {
      // console.log(data)
    },
    // fetchTreatment(id) {
    //   TreatmentServices.detail(id).then((treatment) => {
    //     this.entity = treatment.data
    //   })
    // },
  },
}
</script>
