<template>
  <page-layout :loading="loading" title="Organizations">
    <template slot="content"
      ><div class="support-page">
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
                <span
                  :class="'status status-' + getStatusName(status, record)"
                  >{{ record.status_Name }}</span
                >
              </template>

              <span slot="action" slot-scope="text, record">
                <!-- <a-button type="link">
                  <a-icon type="edit" />
                </a-button> -->
                <a-dropdown>
                  <a-button
                    class="btn-view-timeline"
                    type="primary"
                    size="small"
                    >Admin</a-button
                  >
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;" @click="showUpdate(record)"
                        ><a-icon type="search" /> update Ticket</a
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Archive">
            <Table type="archive" />
          </a-tab-pane>
        </a-tabs>

        <!-- Add New Ticket Modal -->
        <a-skeleton :loading="loadingTicket">
          <add-new-ticket
            v-if="showAddModal"
            :ticket="ticket"
            :is-created="isCreated"
            @closeModal="closeModal"
        /></a-skeleton></div></template
  ></page-layout>
</template>

<script>
import Table from '~/components/support/Listing'
import AddNewTicketModal from '~/components/support/Add'
import SupportServices from '~/services/API/SupportServices'
import PageLayout from '~/components/layout/PageLayout'
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
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  components: { Table, 'add-new-ticket': AddNewTicketModal, PageLayout },
  data() {
    return {
      showAddModal: false,
      data: [],
      columns,
      loading: true,
      ticket: {},
      isCreated: false,
      loadingTicket: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    showUpdate(record) {
      this.fetchTicket(record.id)
    },
    callback(key) {
      console.log(key)
    },
    showModal(value) {
      this.showAddModal = !this.showAddModal
      this.isCreated = false
    },
    closeModal() {
      this.fetch()
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
    fetchTicket(globalId) {
      this.loadingTicket = true
      this.showModal(true)
      SupportServices.getById(globalId)
        .then((response) => {
          this.ticket = response.ticket
          this.isCreated = true
        })
        .finally(() => {
          this.loadingTicket = false
        })
    },
  },
}
</script>
