<template>
    <div>
    <div class="page-header clearfix">
    <h3 class="page-title pl-5 float-left">{{translation.UserNew_3_136}}</h3>
      <a-button
        type="primary"
        class="mrm-5 float-right"
        @click="goto('users/create')"
        >{{translation.adduser_2_464}}</a-button
      >
    <a-input
      class="float-right page-search-input"
      ref="userNameInput"
      :placeholder="translation.Searcuser_2_404"
      @change="searchUser"
    >
      <a-icon slot="prefix" type="search" />
    </a-input>
    </div>      
      <a-table
        :columns="columns"
        :data-source="datasource"
        class="rounded-table"
        :pagination="{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '100']}"
      >
        <template slot="action" slot-scope="action">
          <a-dropdown>
          <a-button class="action-button" @click="preventDefault">
            {{translation['Admin_1_142']}} <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
          <a-menu-item key="userDetail">
            <a @click="goto(`/users/${action.globalId}`)">Edit</a>
          </a-menu-item>
          </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </div>  
</template>
<script>
import UserServices from '~/services/API/UserServices'
// import { success } from '~/services/Helpers/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'

// import PageLayout from '~/components/layout/PageLayout'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Entity Type',
    dataIndex: 'organizationTypeAlias',
    key: 'organizationType',
  },
  {
    title: 'Entity Name',
    dataIndex: 'organizationName',
    key: 'organizationId',
  },
  {
    title: 'User Role',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: 'Email Address',
    key: 'email',
    dataIndex: 'email',
  }, 
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  mixins: [routeHelpers],
  data() {
    return {
      datasource: [],
      columns,
      loading: true,
      fullName:[],
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },    
  },
  mounted() {
    this.fetch()
  },
  methods: {
    preventDefault,
    fetch() {
      UserServices.getUser(this.user.organizationId, this.user.organizationTypeId)
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    fetchSearch(params) {
      // alert(params.name)
      UserServices.getSearchUser(params)
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    searchUser(e) {
      const search = e.target.value
      // alert(search)
      if(search!==''){
        this.fetchSearch({ userName: search, roleName: search,email:search})
      }else{
        this.fetch()
      }
    },
    // remove(id) {
    //   OrganizationServicesServices.destroy(id).then((response) => {
    //     success(this, { message: response.message })
    //     this.fetch()
    //   })
    // },
  },
}
</script>