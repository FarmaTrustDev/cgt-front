<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      title="Batch Record Process"
      class="specific container page-search-input-container"
    >
      
      <div slot="content">
        <!-- <template slot="content"> -->
        <!-- <h3 class="page-title float-left">
              {{ translation.LabList_2_551 }}
            </h3> -->
            <a-col :span="24" style="margin-bottom: 200px;"></a-col>
            <a-col :span="3"></a-col>
            <a-col>
            <a-button type="primary" style="width: 200px; height: 60px; margin-right: 150px;" @click="goto('/inventory/treatment/batch?id=7157')">Novartis <br> Project 345</a-button>
            <a-button type="primary" style="width: 200px; height: 60px;" @click="goto('/inventory/treatment/batch?id=660')">GSK <br> Project 348</a-button>
            </a-col>
        <!-- </template> -->
        
      </div>
    </page-layout>
  </template>
  <script>
  import UserServices from '~/services/API/UserServices'
  // import { success } from '~/services/Helpers/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {
      PageLayout,
    },
    mixins: [routeHelpers],
    data() {
      return {
        datasource: [
          {
            name: 'Cellfuse',
            organizationTypeAlias:
              'Volmersbachstr. 66 D-55743 Idar-Oberstein Germany',
            organizationName: 'Stephen Jones',
            city: 'Berlin',
            country: 'Germany',
            email: 'info-imfs@cellfuse.de',
          },
          {
            name: 'Cellfuse US',
            organizationTypeAlias: 'Cambridge. 66 D-55743 USA',
            organizationName: 'George Washington Carver',
            city: 'Cambridge',
            country: 'USA',
            email: 'info-imfs@cellfuse.usa',
          },
          {
            name: 'Cellfuse US',
            organizationTypeAlias: 'Gaithersburg. 66 D-55743 USA',
            organizationName: 'Richard Feynman',
            city: 'Gaithersburg',
            country: 'USA',
            email: 'info-imfs@cellfuse.usa',
          },
        ],
        columns: [
          {
            title: `${this.$store.getters.getTranslation.Lab_1_566}`,
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Addre_1_559}`,
            dataIndex: 'organizationTypeAlias',
            key: 'organizationType',
          },
          {
            title: `${this.$store.getters.getTranslation.Headof_3_549}`,
            dataIndex: 'organizationName',
            key: 'organizationId',
          },
          {
            title: `${this.$store.getters.getTranslation.City_1_446}`,
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: `${this.$store.getters.getTranslation.Count_1_49}`,
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
        fullName: [],
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
    watch: {
      translation(newValues, oldValue) {
        if (newValues !== oldValue) {
          this.columns[0].title = newValues.Lab_1_566
          this.columns[1].title = newValues.Addre_1_559
          this.columns[2].title = newValues.Headof_3_549
          this.columns[3].title = newValues.City_1_446
          this.columns[4].title = newValues.Count_1_49
          this.columns[5].title = newValues.EmailAddre_2_140
          this.columns[6].title = newValues.Actio_1_220
        }
      },
    },
    mounted() {
      this.fetch()
      this.getTranslationData()
    },
    methods: {
      getTranslationData() {
        this.columns[0].title = this.translation.Lab_1_566
        this.columns[1].title = this.translation.Addre_1_559
        this.columns[2].title = this.translation.Headof_3_549
        this.columns[3].title = this.translation.City_1_446
        this.columns[4].title = this.translation.Count_1_49
        this.columns[5].title = this.translation.EmailAddre_2_140
        this.columns[6].title = this.translation.Actio_1_220
      },
      preventDefault,
      fetch() {
        UserServices.getUser(
          this.user.organizationId,
          this.user.organizationTypeId
        )
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
        if (search !== '') {
          this.fetchSearch({ userName: search, roleName: search, email: search })
        } else {
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
  