<template>
    <div>
    <div class="page-header clearfix">
    <h3 class="page-title pl-5 float-left">{{translation.AddStora_3_557}}</h3>
      <a-button
        type="primary"
        class="mrm-5 float-right"
        @click="goto('facility/create')"
        >{{translation.AddStora_3_557}}</a-button
      >
    <a-input
      class="float-right page-search-input"
      ref="userNameInput"
      :placeholder="translation.SearcStora_3_560"
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
            <a @click="goto(`/inventory/storage/facility/${action.globalId}`)">{{translation.Edit_1_450}}</a>
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
          organizationTypeAlias: '5ml EDTA blood collection tube',
          organizationName: 'Germany - Cellfuse',
          city: 'Zone A, Storage Suite 3',
          country:'2',
          email: '8',
        },
        {
          name: 'Cellfuse US', 
          organizationTypeAlias: '10ml SST blood collection tubes',
          organizationName: 'Vienna - Cellfuse R&D',
          city: 'Zone C, Storage Suite 2',
          country:'4',
          email: '12',
        },
        {
          name: 'Cellfuse US', 
          organizationTypeAlias: 'Vacutainer holder',
          organizationName: 'Gaithersburg USA - Cellfuse US',
          city: 'Zone B, Storage Suite 2',
          country:'3',
          email: '19',
        },                
      ],
      columns:[
        {
          title: `${this.$store.getters.getTranslation.EquipType_2_552}`,
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: `${this.$store.getters.getTranslation.EquipName_2_553}`,
          dataIndex: 'organizationTypeAlias',
          key: 'organizationType',
        },
        {
          title: `${this.$store.getters.getTranslation.Lab_1_566}`,
          dataIndex: 'organizationName',
          key: 'organizationId',
        },
        {
          title: `${this.$store.getters.getTranslation.LabZone_2_554}`,
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: `${this.$store.getters.getTranslation.Numbeof_3_555}`,
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: `${this.$store.getters.getTranslation.Numbeof_3_556}`,
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