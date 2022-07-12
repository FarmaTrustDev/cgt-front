<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.uuid"
      :data-source="dumpData"
      :loading="loading"
      
      class="rounded-table"
      :customRow="customRowReDirect"
      
    >

              <template slot="tickets" slot-scope="id">
              CKD-{{ id }}
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

      <template slot="supportAction">
        <a-dropdown :trigger="['click']">
        <a-button class="action-button">
         Admin <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="0"><a-icon type="plus" /> {{this.$store.getters.getTranslation.Updatticke_2_222}} </a-menu-item>
        </a-menu>
      </a-dropdown>
      </template>

    </a-table>
  </div>
</template>

<script>
  import SupportServices from '~/services/API/SupportServices'
  import routeHelpers from '~/mixins/route-helpers'
  export default{
    props: {
      dumpData:{type: Array},
      type: {
        type: String,
        default: ''
      }
    },
    mixins: [routeHelpers],
    data(){
      return{
        data:this.dumpData,
        columns: [
          {
            title: `${this.$store.getters.getTranslation.date_1_510}`,
            dataIndex: 'created_At',
            width: 100,
          },
          {
            title: `${this.$store.getters.getTranslation.TickeID_2_212}`,
            dataIndex: 'id',
            scopedSlots: { customRender: 'tickets' },
            width:100,
          },
          {
            title: 'Name(PUID)',
            dataIndex: 'reporter_name',
            width:100,
          },
          {
            title: `${this.$store.getters.getTranslation.BagID_2_540}`,
            dataIndex: 'reference_Id',
            width:100,
          },
          {
            title: `${this.$store.getters.getTranslation.IssueDetai_2_214}`,
            dataIndex: 'description',
            width:300,
          },
          {
            title: `${this.$store.getters.getTranslation.LastUpdat_2_216}`,
            dataIndex: 'last_Updated_At',
            width:100,
          },
          {
            title: `${this.$store.getters.getTranslation.CarriStatu_2_320}`,
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            width:100,
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            dataIndex: 'actions',
            scopedSlots: { customRender: 'action' },
            width:100,
          },
        ],
        loading: false,
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },  
    methods:{
      customRowReDirect(record) {
        // alert(record)
        // console.log(record)
        return {
          on: {
            click: (event) => {
              // console.log(record)
              this.goto(`support/${record.global_Id}`)
            },
          },
        }
      },  
      handleTableChange(pagination, filters, sorter) {
        // console.log(pagination)
        const pager = { ...this.pagination }
        pager.current = pagination.current
        this.pagination = pager
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        })
      },
      getStatusName(status, record) {
        if (record.status_Name) {
          return record.status_Name.toLowerCase()
        }
        return record.status_Name
        // status_Name.toLowerCase()
      }, 
      showUpdate(record) {
        this.fetchTicket(record.id)
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
    }
  }
</script>