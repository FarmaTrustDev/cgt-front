<template>
  <div class="support-page">

    <a-row class="p-10 mt-15 mb-15">
      <a-col :span="12">
        <h3 class="page-title">Support Issues</h3>
      </a-col>
      <a-col :span="12" class="text-right">
        <a-button type="primary" @click="showModal()">Add New Ticket</a-button>
      </a-col>
    </a-row>

    <a-tabs type="card" @change="callback">
      <a-tab-pane key="1" tab="All">
        <Table type="all"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Archive">
        <Table type="archive"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="In Process">
        <Table type="inprocess"/>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Resolved">
        <Table type="resolved"/>
      </a-tab-pane>
    </a-tabs>


    <!-- Add New Ticket Modal -->
    <AddNewTicketModal v-if="showAddModal" />

  </div>
</template>

<script>
  import Table from '~/components/support/Listing'
  import AddNewTicketModal from '~/components/support/AddNewTicket'
  export default{
    components : { Table, AddNewTicketModal },
    data(){
      return{
        showAddModal: false
      }
    },
    methods: {
      callback(key) {
        console.log(key);
      },
      showModal(){
        this.showAddModal = !this.showAddModal
      }
      
    },
  }
</script>