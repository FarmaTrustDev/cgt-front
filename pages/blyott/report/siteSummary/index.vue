<template>
    <page-layout
      :create="false"
      :bordered="false"
      title="Summary By Sites/ Locations"
      class="container page-search-input-container"
    >
      <template slot="content">
        <h2>Total Vaolume in All Labs</h2>
        <a-table
                :columns="columns"
                :data-source="totalAsset"
                :pagination="false"
                class="rounded-table"
            >
        </a-table>
        <a-row v-for="asset in assetData" :key="asset.name">
          <h2>{{ asset[0].locationName }}</h2>
           <a-table
                :columns="columns"
                :data-source="asset"
                :pagination="false"
                class="rounded-table"
            >
            </a-table> 
        </a-row>
      </template>
    </page-layout>
  </template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import AssetServices from '~/services/API/AssetServices'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Helpers'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      assetData:[],
      totalAsset:[],
      loading: true,
      columns: [
        {
          title: 'Chemical Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
        },
        {
          title: 'Open In Use',
          dataIndex: 'inUSe',
          key: 'inUSe',
        },
        {
          title: 'Current Commissioned',
          dataIndex: 'currentCommissioned',
          key: 'currentCommissioned',
        },
        {
          title: 'Decomm 6 Months',
          dataIndex: 'sixMonth',
          key: 'sixMonth',
        },
        {
          title: 'Current Average Used By Days',
          dataIndex: 'avgDays',
          key: 'avgDays',
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
    this.fetchAsset()
  },
  methods: {
    isEmpty,
    fetchAsset(){
        AssetServices.GetAssetByLocation()
        .then((response) => {
          // this.assetData.push(response.data.data)
            for(let i=0;i<=response.data.data.length;i++){
              if(!isEmpty(response.data.data[i].assetStatsDTOs)){
                this.assetData.push(response.data.data[i].assetStatsDTOs)
              }
            }
            console.log(this.assetData)
        })
        .finally(()=>(this.loading=false))
    },
  },
}
</script>
