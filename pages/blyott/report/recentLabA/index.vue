<template>
  <div>
    <h2 class="heading pl-0">{{ locationName }}</h2>
      <a-row v-for="asset in assetD" :key="asset.name">
          <h4>{{ asset[0].name }}</h4>
          <a-table
          :columns="columns"
          :data-source="asset"
          class="rounded-table"
          :pagination="false"
          >
          </a-table>
      </a-row>
  </div>
</template>
<script>
import AssetServices from '~/services/API/AssetServices'
import LocationServices from '~/services/API/LocationServices'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Helpers'

export default {
mixins:[routeHelpers],
data() {
  return {
    data: [],
    assetD:[],
    locationName:'',
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
  const entityId = this.$route.params.id
    this.fetchAsset(entityId)
    this.fecthLocation(entityId)
},
methods: {
  fecthLocation(entityId){
      LocationServices.fetchBlyottLocationByCode(entityId)
      .then((response)=>{
        this.locationName=response.LocationName
      })
    },
  fetchAsset(entityId){
      // const a=86069
      AssetServices.GetDetailAsset(entityId)
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
