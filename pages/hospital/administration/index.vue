<template>
  <div class="container">
    <h3 class="page-title">{{ translation._1_438 }}</h3>
    <div>
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
                {{ translation[menu.name] }}
              </h4>
            </div>
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import UserServices from '~/services/API/UserServices'
export default {
  data() {
    return {
      userAdminMenu: [],
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
    this.userDetail()
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
.admin-tab {
  max-width: 75%;
  text-align: left;
  background: #fff;
  padding: 25px;
  border-radius: 52px;
  margin:auto;
}
.admin-tab > h4 {
  font-size: 1.125rem;
  width: fit-content;
  margin-left: 18px;
  display: inline;
}
</style>
