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
        <a-table :loading="loading" :data-source="data" :columns="columns">
          <template slot="tickets" slot-scope="id">
            <strong>CKD-{{ id }}</strong>
          </template>
          <template slot="status" slot-scope="status, record">
            <span :class="'status status-' + getStatusName(status, record)">{{
              record.status_Name
            }}</span>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Archive">
        <Table type="archive" />
      </a-tab-pane>
      <!-- <a-tab-pane key="3" tab="In Process">
        <Table type="inprocess" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Resolved">
        <Table type="resolved" />
      </a-tab-pane> -->
    </a-tabs>

    <!-- Add New Ticket Modal -->
    <add-new-ticket @closeModal="closeModal" v-if="showAddModal" />
  </div>
</template>

<script>
import Table from '~/components/support/Listing'
import AddNewTicketModal from '~/components/support/Add'
import SupportServices from '~/services/API/SupportServices'

const columns = [
  {
    title: 'Date',
    dataIndex: 'created_At',
  },
  {
    title: 'TicketID',
    dataIndex: 'id',
    scopedSlots: { customRender: 'tickets' },
  },
  {
    title: 'Name(PUID)',
    dataIndex: 'reporter_name',
  },
  {
    title: 'BagId',
    dataIndex: 'bagId',
  },
  {
    title: 'Issue Details',
    dataIndex: 'description',
  },
  {
    title: 'Last Update',
    dataIndex: 'updated_At',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    scopedSlots: { customRender: 'supportAction' },
  },
]
export default {
  components: { Table, 'add-new-ticket': AddNewTicketModal },
  data() {
    return {
      showAddModal: false,
      data: [],
      columns,
      loading: true,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    showModal(value) {
      this.showAddModal = !this.showAddModal
    },
    closeModal() {
      this.fetch();
    },
    getStatusName(status, record) {
      return record.status_Name.toLowerCase()
      // status_Name.toLowerCase()
    },
    fetch(params = {}) {
      this.loading = true
      SupportServices.get(params)
        .then((response) => {
          this.data = response.ticket
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
