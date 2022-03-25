<template>
  <div class="support-page">
    <a-row class="p-10 mb-10">
      <div class="page-header">
        <h3 class="page-title float-left">Support Issues</h3>
        <a-button
          type="primary"
          class="mrm-5 float-right"
          @click="showModal(true)"
          >Add New Ticket</a-button
        >
        <a-input
          ref="userNameInput"
          placeholder="Search"
          class="float-right page-search-input"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
    </a-row>

    <a-tabs type="card" @change="callback">
      <a-tab-pane key="1" tab="All">
        <Table type="all" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Archive">
        <Table type="archive" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="In Process">
        <Table type="inprocess" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Resolved">
        <Table type="resolved" />
      </a-tab-pane>
    </a-tabs>

    <!-- Add New Ticket Modal -->
    <add-new-ticket v-if="showAddModal" />
  </div>
</template>

<script>
import Table from '~/components/support/Listing'
import AddNewTicketModal from '~/components/support/Add'
export default {
  components: { Table, 'add-new-ticket': AddNewTicketModal },
  data() {
    return {
      showAddModal: false,
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    showModal(value) {
      this.showAddModal = !this.showAddModal
    },
  },
}
</script>
