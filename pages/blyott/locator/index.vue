<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Locators"
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
          @click="goto('/blyott/locator/create')"
          >Add Locator</a-button
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
          <div slot="name" slot-scope="value, row">
            <span :id="row.id" @click="goto(`/blyott/locator/report?id=${row.blyottLocatorId}`)">
              {{ row.name }}
            </span>
          </div>
          <div slot="doc" slot-scope="value, row">
            <a-button
              icon="printer"
              class="print-btn"
              type="primary"
              size="small"
              @click="goto(`/report?report=${row.statusId}`)"
              >{{ translation.ViewForm_2_789 }}</a-button
            >
          </div>
        </a-table>
      </a-row></template
    ></page-layout
  >
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
// import Table from '~/components/labeling/Listing'
import LocatorServices from '~/services/API/LocatorServices'
import routeHelpers from '~/mixins/route-helpers'
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
          title: 'Locator Name',
          // dataIndex: 'name',
          key: 'id',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'MAC Address',
          dataIndex: 'blyottLocatorId',
          key: 'blyottLocatorId',
        },
        {
          title: 'Location Name',
          dataIndex: 'locationResponseDTO.name',
          key: 'locationName',
        },
        {
          title: 'Hardware Model',
          dataIndex: 'locatorHardwareModelName',
          key: 'locatorHardwareModelName',
        },
        {
          title: 'Active',
          dataIndex: 'active',
          key: 'active',
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
    fetchLocation(){
        LocatorServices.fetchLocatorsFromCGTBlyott()
        .then((response) => {
            this.locationData = response.data.data
            // console.log(this.locationData)
        })
    },
  },
}
</script>