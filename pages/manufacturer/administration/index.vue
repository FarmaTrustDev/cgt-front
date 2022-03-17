<template>
  <div class="admin-page">
    <h3 class="page-title">Administration</h3>
    <a-row :gutter="16" justify="center">
      <a-col
        v-for="(menue,index) in userAdminMenu.adminMenus"
        :key="menue.key"
        class="mt-15"
        :xs="{ span: 24 }"
        :md="{ span: 8 }"
      >
        <a-list v-if="user.organizationTypeAlias == 'MANUFACTURER' && (index!='Collections' || index!='Logistics Partner' || index!='Screening Adminstration')" size="small" bordered :data-source="menue">
          <a-list-item slot="renderItem" slot-scope="item">
            <nuxt-link :to="item.to"> {{ item.name }}</nuxt-link>
          </a-list-item>
          <div slot="header"  class="bg-gray-100" >{{ index }}</div>
        </a-list>
        <a-list v-else-if="user.organizationTypeAlias == 'HOSPITAL' && index=='Screening Adminstration'" size="small" bordered :data-source="menue">
          <a-list-item slot="renderItem" slot-scope="item">
            <nuxt-link :to="item.to"> {{ item.name }}</nuxt-link>
          </a-list-item>
          <div slot="header"  class="bg-gray-100" >{{ index }}</div>
        </a-list>
        
      </a-col>
    </a-row>  
    
  </div>
</template>

<script>
import UserServices from '~/services/API/UserServices'
export default {
  data() {
    return {
      userAdminMenu:[],
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {    
    this.userDetail();
  },
  methods:{
    userDetail() {
      UserServices.adminMenu()
        .then((response) => {
          this.userAdminMenu=response.data
        })

    },
  },
}
</script>
