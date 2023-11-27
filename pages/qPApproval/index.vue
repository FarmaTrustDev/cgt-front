<template>
    <!-- <page-layout
    :create="false"
    title="QP Approval"
    :back="false"
    class="manf-treatment container"
  > -->
  <div class="mt-3 manf-treatment container" style="margin-top: 50px">
    <div class="page-header clearfix">
      <h3 class="page-title float-left">
        QP Approval
      </h3>
    </div>
  <div slot="content" class="h-tabs large-tabs rounded-table qP-approval-body treatment-list-body">
      <a-tabs type="card" :animated="false">
        <a-tab-pane key="1"  tab="New">
            <newRequests :search-by-type="searchByType" />
          </a-tab-pane>
          <a-tab-pane key="2"  tab="Approved">
            <approved :search-by-type="searchByType" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Rejected"
            ><rejected :search-by-type="searchByType"/>
        </a-tab-pane>
          <a-tab-pane key="4" tab="Quarantine">
            <quarantine :search-by-type="searchByType"/>
        </a-tab-pane>
          <a-tab-pane key="5" tab="All">
            <all/>
          </a-tab-pane>
      </a-tabs>
    </div>
    <!-- </page-layout> -->
</div>
   </template>
  <script>
  import newRequests from '~/pages/qPApproval/newRequest'
  import all from '~/pages/qPApproval/all'
  import approved from '~/pages/qPApproval/approved'
  import quarantine from '~/pages/qPApproval/quarantine'
  import rejected from '~/pages/qPApproval/rejected'

//   import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {
      newRequests,
      quarantine,
      all,
      approved,
      rejected,
    //   PageLayout
    },
    data() {
      return {
        loading: false,
        treatmentTypes: [],
        typeLoading: false,
        searchByType: ''
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    watch:{
    },
    mounted() {
    },
    methods: {

    },
  }
  </script>
  