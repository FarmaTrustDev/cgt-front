<template>
    <page-layout
      :create="false"
      :bordered="false"
      title="Summary by Assets"
      class="container"
    >
      <template slot="content">
        <a-row v-for="asset in assetData" :key="asset.name">
            <h2>{{ asset[0].name }}</h2>
            <a-table
            :columns="columns"
            :data-source="asset"
            class="rounded-table"
            :pagination="false"
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
      loading: true,
      columns: [
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
        },              
        {
          title: 'Location',
          dataIndex: 'locationName',
          key: 'locationName',
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
    fetchAsset(){
        AssetServices.GetAssetSummary()
        .then((response) => {
          this.assetData.splice()
            for(let i=0;i<=response.data.data.length;i++){
              try{
                if(!isEmpty(response.data.data[i].assetStatsDTOs)){
                  this.assetData.push(response.data.data[i].assetStatsDTOs)
                }
              }catch(err){
                console.error(err.message)
              }
            }
        })
        .finally(()=>(this.loading=false))
    },
  },
}
</script>
