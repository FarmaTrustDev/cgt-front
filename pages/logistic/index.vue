<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Treatments"
  >
    <template slot="content">
      <a-tabs :animated="false">
        <a-tab-pane key="1" tab="New Requests">
          <newRequests />
        </a-tab-pane>
        <a-tab-pane key="3" tab="In Progress"> <in-progress /> </a-tab-pane>
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

  data() {
    console.log("asd");
    return {
      loading: false,
      data: [],
      showResponseModal: false,
      isAccepted: false,
    }
  },
  methods: {},
}
</script>
