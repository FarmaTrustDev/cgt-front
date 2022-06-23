<template>
  <div class="support-page ml-30 mr-30">
    <a-row class="mt-25 mb-10">
      <div class="page-header">
        <h3 class="page-title float-left ">
          Support Issues
        </h3>
        <a-button
          type="primary"
          class="mrm-5 mrt float-right"
          @click="showModal(true)"
          >{{ translation.AddNew_3_182 }}
        </a-button>
        <a-input
          ref="userNameInput"
          :placeholder="translation.searc_1_488"
          class="float-right page-search-input"
          @change="searchSupport"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
    </a-row>

    <a-tabs type="card" @change="callback">
      <a-tab-pane key="1" :tab="translation.All_1_210">
        <a-table
          class="rounded-table"
          :loading="loading"
          :data-source="data"
          :columns="columns"
        >
          <template slot="tickets" slot-scope="id, record">
            <a-button type="link">
              <strong @click="goto(`support/${record.global_Id}`)"
                >CKD-{{ id }}</strong
              ></a-button
            >
          </template>
          <template slot="status" slot-scope="status, record">
            <span :class="'status status-' + getStatusName(status, record)">{{
              record.status_Name
            }}</span>
          </template>

          <span slot="action" slot-scope="text, record">
            <!-- <a-button type="link">
                  <a-icon type="edit" />
                </a-button> -->
            <a-dropdown>
              <a-button class="action-button" size="small">{{
                translation.Admin_1_142
              }}</a-button>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="showUpdate(record)"
                    ><a-icon type="search" />
                    {{ translation.Updatticke_2_222 }}</a
                  >
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="translation.Archi_1_226">
        <Table type="archive" />
      </a-tab-pane>
      <a-tab-pane key="3" :tab="translation.InPro_1_533">
        <InProgress type="inProgress" />
      </a-tab-pane>
      <a-tab-pane key="4" :tab="translation.Resol_1_230">
        <Resolved type="resolved" />
      </a-tab-pane>
    </a-tabs>

    <!-- Add New Ticket Modal -->
    <a-skeleton :loading="loadingTicket">
      <add-new-ticket
        v-if="showAddModal"
        :ticket="ticket"
        :is-created="isCreated"
        @closeModal="closeModal"
    /></a-skeleton>
  </div>
</template>

<script>
import Table from '~/components/support/Listing'
import AddNewTicketModal from '~/components/support/Add'
import SupportServices from '~/services/API/SupportServices'
import InProgress from '~/components/support/InProgress.vue'
import Resolved from '~/components/support/Resolved.vue'
// import PageLayout from '~/components/layout/PageLayout'
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: {
    Table,
    InProgress,
    Resolved,
    'add-new-ticket': AddNewTicketModal,
    // PageLayout
  },
  mixins: [routeHelpers],
  data() {
    return {
      showAddModal: false,
      data: [],
      columns: [
        {
          title: `${this.$store.getters.getTranslation.date_1_510}`,
          dataIndex: 'created_At',
        },
        {
          title: `${this.$store.getters.getTranslation.TickeID_2_212}`,
          dataIndex: 'id',
          scopedSlots: { customRender: 'tickets' },
        },
        {
          title: 'Name(PUID)',
          dataIndex: 'reporter_name',
        },
        {
          title: `${this.$store.getters.getTranslation.BagID_2_540}`,
          dataIndex: 'reference_Id',
        },
        {
          title: `${this.$store.getters.getTranslation.IssueDetai_2_214}`,
          dataIndex: 'description',
        },
        {
          title: `${this.$store.getters.getTranslation.LastUpdat_2_216}`,
          dataIndex: 'last_Updated_At',
        },
        {
          title: `${this.$store.getters.getTranslation.CarriStatu_2_320}`,
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'actions',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: true,
      ticket: {},
      isCreated: false,
      loadingTicket: false,
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    showUpdate(record) {
      this.fetchTicket(record.id)
    },
    callback(key) {
      console.log(key)
    },
    showModal(value) {
      this.showAddModal = value
      if (!value) {
        this.isCreated = false
      }
    },
    closeModal(value) {
      this.showModal(value)
      this.fetch()
    },
    getStatusName(status, record) {
      if (record.status_Name) {
        return record.status_Name.toLowerCase()
      }
      return record.status_Name
      // status_Name.toLowerCase()
    },
    fetch(params = {}) {
      // console.log(params.reference_Id)
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
    searchSupport(e) {
      const search = e.target.value
      this.fetch({ statusName: search, generalSearch: search })
    },
  },
}
</script>
