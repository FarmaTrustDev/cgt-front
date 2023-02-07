<template>
    <page-layout :create="false" class="container" title="Reports">

  <!-- <div class="container"> -->
    <!-- <h3 class="page-title mt-15">{{ translation._1_438 }}</h3> -->
    <div slot="content">
      <a-row :gutter="15" class="grey-card m-auto admin-page">
        <a-col v-for="menu in userAdminMenu" :key="menu.key" :span="12">
          <nuxt-link :to="menu.to">
            <div class="admin-tab">
              <!-- HREF , why not using  <nuxt-link :to="item.to"> {{ item.name }}</nuxt-link>  Please try not to remove the work which is done  -->
              <!-- <img width="75px" :src="menu.icon" /> -->
              <img
                width="75px"
                src="https://demoapi.qmaid.co/icons/administration.svg"
              />

              <h4 style="font-size: 1.125rem" class="heading-home">
                {{ menu.name }}
              </h4>
            </div>
          </nuxt-link>
        </a-col>
      </a-row>
    <!-- </div> -->
  </div>
  </page-layout>
</template>

<script>
import UserServices from '~/services/API/UserServices'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: {PageLayout},
  data() {
    return {
      userAdminMenu: [
        {
            "id":0,
            "initial":null,
            "name":"Summary By Asset",
            "to":"/blyott/report/assetSummary",
            "key":"1",
            "icon":"http://localhost:22462/icons/administration.svg"
        },
        {
            "id":1,
            "initial":null,
            "name":"Summary By Site",
            "to":"/blyott/report/siteSummary",
            "key":"2",
            "icon":"http://localhost:22462/icons/administration.svg"
        },
        {
            "id":2,
            "initial":null,
            "name":"Lab A",
            "to":"/blyott/report/labA",
            "key":"3",
            "icon":"http://localhost:22462/icons/administration.svg"
        },
        {
            "id":3,
            "initial":null,
            "name":"Lab B",
            "to":"/blyott/report/labB",
            "key":"4",
            "icon":"http://localhost:22462/icons/administration.svg"
        },
        {
            "id":4,
            "initial":null,
            "name":"Office",
            "to":"/blyott/report/office",
            "key":"5",
            "icon":"http://localhost:22462/icons/administration.svg"
        },
        {
            "id":5,
            "initial":null,
            "name":"Recently Used Lab A",
            "to":"/blyott/report/recentLabA",
            "key":"6",
            "icon":"http://localhost:22462/icons/administration.svg"
        },
        {
            "id":6,
            "initial":null,
            "name":"Recently Used Lab B",
            "to":"/blyott/report/recentLabB",
            "key":"7",
            "icon":"http://localhost:22462/icons/administration.svg"
        }
      ],
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
    // this.userDetail()
  },
  methods: {
    userDetail() {
      UserServices.adminMenu().then((response) => {
        this.userAdminMenu = response.data
      })
    },
  },
}
</script>
<style scoped>
.grey-card {
  padding-top: 2% !important;
}
.admin-tab {
  max-width: 85%;
  text-align: left;
  background: #fff;
  padding: 15px;
  border-radius: 52px;
 
}
.admin-tab > h4 {
  font-size: 1.125rem;
  width: fit-content;
  margin-left: 18px;
  display: inline;
}
</style>
