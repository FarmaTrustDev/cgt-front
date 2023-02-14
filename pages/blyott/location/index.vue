<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Locations"
    class="container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-input
        ref="userNameInput"
        :placeholder="translation.searc_1_488"
        class="page-search-input"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button
          type="primary"
          @click="goto('/blyott/location/create')"
          >Add Location</a-button
        >
    </template>
    <template slot="content">
      <a-row class="">
        <a-table
          :columns="columns"
          :data-source="locationData"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
          class="rounded-table"
        >
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              {{ translation['Admin_1_142'] }} <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a @click="goto(`/blyott/location/${action.globalId}`)">{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        </a-table>
      </a-row></template
    ></page-layout
  >
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
// import Table from '~/components/labeling/Listing'
import LocationServices from '~/services/API/LocationServices'
import routeHelpers from '~/mixins/route-helpers'
import { preventDefault } from '~/services/Helpers'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      locationData:[],
      loading: false,
      columns: [
        {
          title: 'Location Name',
          dataIndex: 'name',
          key: 'id',
        },
        {
          title: 'Builiding',
          dataIndex: 'building',
          key: 'building',
        },
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Floor',
          dataIndex: 'floor',
          key: 'floor',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  mounted() {
    this.fetchLocation()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    preventDefault,
    fetchLocation(){
        LocationServices.fetchLocationsFromCGTBlyott()
        .then((response) => {
            this.locationData = response.data.data
            // console.log(this.locationData)
        })
    },
  },
}
</script>
