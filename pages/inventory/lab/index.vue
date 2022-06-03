<template>
    <div>
    <div class="page-header clearfix">
    <h3 class="page-title pl-5 float-left">Lab List</h3>
      <a-button
        type="primary"
        class="mrm-5 float-right"
        @click="goto('lab/create')"
        >Add Lab</a-button
      >
    <a-input
      class="float-right page-search-input"
      ref="userNameInput"
      placeholder="Search Lab"
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
            <a @click="goto(`/inventory/lab/${action.globalId}`)">{{translation.Edit_1_450}}</a>
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
export default {
  mixins: [routeHelpers],
  data() {
    return {
      datasource: [
        {
          name: 'Cellfuse', 
          organizationTypeAlias: 'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
          organizationName: 'Stephen Jones',
          city: 'Berlin',
          country:'Germany',
          email: 'info-imfs@cellfuse.de',
        },
        {
          name: 'Cellfuse US', 
          organizationTypeAlias: 'Cambridge. 66 D-55743 USA',
          organizationName: 'George Washington Carver',
          city: 'Cambridge',
          country:'USA',
          email: 'info-imfs@cellfuse.usa',
        },
        {
          name: 'Cellfuse US', 
          organizationTypeAlias: 'Gaithersburg. 66 D-55743 USA',
          organizationName: 'Richard Feynman',
          city: 'Gaithersburg',
          country:'USA',
          email: 'info-imfs@cellfuse.usa',
        },                
      ],
      columns:[
        {
          title: `Lab`,
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: `Address`,
          dataIndex: 'organizationTypeAlias',
          key: 'organizationType',
        },
        {
          title: `Head of Lab`,
          dataIndex: 'organizationName',
          key: 'organizationId',
        },
        {
          title: `City`,
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: `Country`,
          dataIndex: 'country',
          key: 'country',
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
      UserServices.getUser(this.user.organizationId, this.user.organizationTypeId)
        .then((response) => {
          // this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    fetchSearch(params) {
      // alert(params.name)
      UserServices.getSearchUser(params)
        .then((response) => {
          // this.datasource = response.data
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