<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    :title="translation.Treat_1_29"
    class="container"
  >
    <template slot="content">
      <a-tabs :animated="false" class="logistic_tabs rounded-table">
        <a-tab-pane key="1" :tab="translation.NewReque_2_480">
          <newRequests />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="translation.Inprogr_2_204">
          <in-progress />
        </a-tab-pane>
      </a-tabs>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import newRequests from '~/components/root/logistic/requests/New'
import inProgress from '~/components/root/logistic/requests/InProgress'
export default {
  components: {
    'page-layout': PageLayout,
    newRequests,
    'in-progress': inProgress,
  },
  middleware: 'auth',
  data() {
    // console.log("asd");
    return {
      loading: false,
      data: [],
      showResponseModal: false,
      isAccepted: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {},
}
</script>
