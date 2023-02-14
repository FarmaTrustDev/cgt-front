<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Asset Detail"
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
          <div slot="temperature" slot-scope="value, row">
            <span :id="row.id">
              {{ !isEmpty(row.TagCapabilities) ? row.TagCapabilities[0].Value : '' }}°C
            </span>
          </div>
          <div slot="battery" slot-scope="value, row">
            <span :id="row.id">
              {{ !isEmpty(row.TagCapabilities) ? row.TagCapabilities[1].Value: '' }}%
            </span>
          </div>
        </a-table>
      </a-row>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import AssetServices from '~/services/API/AssetServices'
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
          title: 'Chemical Bottle',
          dataIndex: 'Name',
          key: 'name',
        },
        {
          title: 'Code',
          dataIndex: 'Code',
          key: 'code',
        },
        {
          title: 'Tag Assigned',
          dataIndex: 'TagId',
          key: 'tagId',
        },
        {
          title: 'Last Seen',
          dataIndex: 'TimeLastSeen',
          key: 'lastSeen',
        },
        {
          title: 'Location',
          dataIndex: 'LocationName',
          key: 'locationName',
        },
        {
          title: 'Temperature',
          // dataIndex: 'TagCapabilities',
          key: 'temperature',
          scopedSlots: { customRender: 'temperature' },
        },
        {
          title: 'Battery',
          key: 'battery',
          scopedSlots: { customRender: 'battery' },
        },
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
      AssetServices.getAllLocations({
          Page: 1, 
          PageSize: 25, 
          GlobalSearch: "", 
          SortBy: "AssetName", 
          SortOrder: "Asc", 
          Filters: [
            {
              FilterBy:"AssetCode",
              FilterContent:[id]
            }
          ]
        })
      .then((response) => {
        this.assetData=JSON.parse(JSON.stringify(response.Items))
        console.log(this.assetData)
      })
      .finally(()=>(this.loading=false))
    },
    isEmpty,
  },
}
</script>
