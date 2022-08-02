<template>
    <div class="ml-30 mr-30 container" >
    <div class="clearfix mt-15">
    <h3 class="page-title ml-5 float-left">{{translation.UserNew_3_136}}</h3>
      <a-button
        type="primary"
        class="mr-15 float-right mt-5"
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
        :loading="loading"
        class="rounded-table pt-10 users-list"
        :pagination="{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '100']}"
      >
        <template slot="action" slot-scope="action">
          <a-dropdown>
          <a-button class="action-button" @click="preventDefault">
            {{translation['Admin_1_142']}} <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
          <a-menu-item key="userDetail">
            <a @click="goto(`/users/${action.globalId}`)">{{translation.Edit_1_450}}</a>
            <a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="deleteUser(`${action.globalId}`)"
              >
                {{ translation.Delet_1_451 }}
              </a-popconfirm>
            
          </a-menu-item>
          </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </div>  
</template>
<script>
import UserServices from '~/services/API/UserServices'
import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'

// import PageLayout from '~/components/layout/PageLayout'
export default {
  mixins: [routeHelpers, notifications],
  data() {
    return {
      datasource: [],
      columns:[
        {
          title: `${this.$store.getters.getTranslation.Name_1_138}`,
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: `${this.$store.getters.getTranslation.Entittype_2_406}`,
          dataIndex: 'organizationTypeAlias',
          key: 'organizationType',
        },
        {
          title: `${this.$store.getters.getTranslation.EntitName_2_408}`,
          dataIndex: 'organizationName',
          key: 'organizationId',
        },
        {
          title: `${this.$store.getters.getTranslation.UserRole_2_410}`,
          dataIndex: 'roleName',
          key: 'roleName',
        },
        {
          title: `${this.$store.getters.getTranslation.EmailAddre_2_140}`,
          key: 'email',
          dataIndex: 'email',
        }, 
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
    ],
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
      // alert('hello')
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
    deleteUser(record) {
      UserServices.destroy(record).then((response) => {
        // console.log(response)
        this.success(response.message)
        this.fetch()
        this.$router.push({path:'/users'})
      })
      .finally(() => (this.loading = false))
    },
  },
}
</script>