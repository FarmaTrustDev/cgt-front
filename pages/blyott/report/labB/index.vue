<template>
  <page-layout
    :create="false"
    :bordered="false"
    title="Report Lab B"
    class="container"
  >
    <template slot="content">
      <a-row v-for="asset in assetD" :key="asset.name">
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
    assetD:[],
    assetData:[
      [{
          name:'Isopropanol (67-63-0)',
          code:'60C0BF884871',
          volume:'2.5',
          comissionedAt:'24-01-2023',
          comissionedBy:'Najeeb',
          openedAt:'24-01-2023',
          openedBy:'Najeeb',
          avgDays:4,
          temperature:'12.5C',
      }],
      [{
          name:'Methanol (67-56-1)',
          code:'60C0BF875B8E',
          volume:'5',
          comissionedAt:'24-01-2023',
          comissionedBy:'Najeeb',
          openedAt:'24-01-2023',
          openedBy:'Najeeb',
          avgDays:4,
          temperature:'12.5C',
      }],
      [{
          name:'Acetone (67-64-1)',
          code:'60C0BF875B8E',
          volume:'2.5',
          comissionedAt:'24-01-2023',
          comissionedBy:'Najeeb',
          openedAt:'24-01-2023',
          openedBy:'Najeeb',
          avgDays:4,
          temperature:'12.5C',
      }]
    ],
    loading: true,
    columns: [
      {
        title: 'Chemical Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Volume',
        dataIndex: 'volume',
        key: 'volume',
      },              
      {
        title: 'Commissioned Date',
        dataIndex: 'commissioninDate',
        key: 'comissionedAt',
      },
      {
        title: 'Commissioned By',
        dataIndex: 'commissionedBy',
        key: 'comissionedBy',
      },
      {
        title: 'Opened Date',
        dataIndex: 'startDate',
        key: 'openedAt',
      },
      {
        title: 'Opened By',
        dataIndex: 'startedBy',
        key: 'openedBy',
      },
      {
        title: 'Temperature',
        dataIndex: 'temperature',
        key: 'temperature',
      },
      {
        title: 'Average Use by Days',
        dataIndex: 'avgUsedByDays',
        key: 'avgUsedByDays',
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
      const a=86244
      AssetServices.GetSingleAsset(a)
      .then((response) => {
        // this.assetD=response.data.data
          for(let i=0;i<=response.data.data.length;i++){
            if(!isEmpty(response.data.data[i].assetReportSingle)){
              this.assetD.push(response.data.data[i].assetReportSingle)
            }
          }
          console.log(this.assetD)
      })
      .finally(()=>(this.loading=false))
  },
},
}
</script>
