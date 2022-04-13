<template>
  <page-layout :create="false" :loading="loading" title="Treatments">
    <template slot="content">
      <div class="h-tabs">
        <a-tabs type="card" :animated="false">
          <a-tab-pane key="1" tab="New Treatment">
            <new-request />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Pending Treatment">
            <in-progress />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Complete Treatment"
            ><completed
          /></a-tab-pane>
          <a-tab-pane key="4" tab="All Treatment"> <all /></a-tab-pane>
        </a-tabs>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import newRequests from '~/components/root/manufacturer/treatments/listing/NewRequest'
import All from '~/components/root/manufacturer/treatments/listing/All'
import Completed from '~/components/root/manufacturer/treatments/listing/Completed'
import inProgress from '~/components/root/manufacturer/treatments/listing/InProgress'
// @todo for Naveed here optimize in 1 table single component can handle the calls
export default {
  components: {
    'page-layout': PageLayout,
    'new-request': newRequests,
    'in-progress': inProgress,
    all: All,
    completed: Completed,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
}
</script>
