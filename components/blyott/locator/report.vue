<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Locator Detail"
    class="container page-search-input-container"
  >
    <template slot="content">
      <a-row class="">
        <a-table
          :columns="columns"
          :data-source="assetData"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
          class="rounded-table"
        >
        </a-table>
      </a-row>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import LocatorServices from '~/services/API/LocatorServices'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Utilities'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      assetData:[],
      loading: true,
      columns: [
        {
          title: 'Locator Name',
          dataIndex: 'LocatorName',
          key: 'locatorName',
        },
        {
          title: 'LocatorId',
          dataIndex: 'LocatorId',
          key: 'locatorId',
        },
        {
          title: 'HardwareModel',
          dataIndex: 'LocatorHardwareModel',
          key: 'hardwareModel',
        },
        {
          title: 'Last Seen',
          dataIndex: 'LastTimeActive',
          key: 'lastSeen',
        },
        {
          title: 'Location',
          dataIndex: 'LocationName',
          key: 'locationName',
        }
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchAsset(this.$route.query.id)
  },
  methods: {
    fetchAsset(id){
      LocatorServices.fetchBlyottLocatorByCode(id)
      .then((response) => {
        this.assetData.push(response)
        console.log(this.assetData)
      })
      .finally(()=>(this.loading=false))
    },
    isEmpty,
  },
}
</script>
