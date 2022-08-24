<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation._1_438"
    class="specific-storage container"
  >
    <div class="admin-page container" slot="content">
      <!-- <h3 class="page-title mt-15">{{ translation._1_438 }}</h3> -->
      <div>
        <a-row :gutter="15" class="grey-card m-auto" style="padding: 0">
          <a-col v-for="menu in userAdminMenu" :key="menu.key" :md="12">
            <nuxt-link :to="menu.to">
              <!-- <div :md="1" class="ant-col-md-1"></div> -->
              <div class="admin-tab administration-tab">
                <!-- HREF , why not using  <nuxt-link :to="item.to"> {{ item.name }}</nuxt-link>  Please try not to remove the work which is done  -->
                <img width="90px" :src="menu.icon" />
                <h4 style="font-size: 1.125rem" class="heading-home">
                  {{ translation[menu.name] }}
                </h4>
              </div>
            </nuxt-link>
          </a-col>
        </a-row>
      </div>
    </div>
  </page-layout>
</template>

<script>
import UserServices from '~/services/API/UserServices'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: {
    PageLayout,
  },
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
  max-width: 90%;
}
</style>
