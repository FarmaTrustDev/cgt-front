<template>
    <page-layout
      :create="false"
      :bordered="false"
      title="Available Tags"
      class="container"
    >
      <template slot="content">
        <a-row>
            <a-table
            :columns="columns"
            :data-source="assetData"
            class="rounded-table"
            :pagination="false"
            >
            <div slot="btn" slot-scope="row">
              <a-button type="primary" @click="allocateTagToAsset(row.blyottTagId,assetId)">Assign Tag</a-button>
            </div>
            </a-table>
        </a-row>
      </template>
    </page-layout>
  </template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import TagServices from '~/services/API/TagServices'
import routeHelpers from '~/mixins/route-helpers'
import AssetServices from '~/services/API/AssetServices'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      assetData:[
        {
            code:'60C0BF87DE36',
            batteryStaus:'95%',
        },
        {
            code:'60C0BF875B8E',
            batteryStaus:'85%',
        },
        {
            code:'60C0BF884871',
            batteryStaus:'80%',
        },
        {
            code:'60C0BF884871',
            batteryStaus:'80%',
        },
        {
            code:'60C0BF884871',
            batteryStaus:'80%',
        },
      ],
      loading: true,
      assetId:'',
      columns: [
        {
          title: 'Tag',
          dataIndex: 'blyottTagId',
          key: 'blyottTagId',
        },
        {
          title: 'Assign Tag',
          scopedSlots: { customRender: 'btn' },
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
    this.setAssetId(this.$route.query.id)
    this.fetchAsset()
  },
  methods: {
    allocateTagToAsset(tagId,assetId){
        TagServices.fetchBlyottTagByCode(tagId).then((response)=>{
            const locId=response.LocationDetails.LocationId
            const blyottData=JSON.parse(JSON.stringify(
                {
                    globalId:assetId,
                    blyottTagId:tagId,
                    locationId:locId
                }
            ))
            AssetServices.tagAllocation(blyottData).then((response)=>{
                console.log(response)
            })
            // console.log(response.LocationDetails.LocationId)
        })
        console.log(tagId)
        console.log(assetId)

    },
    setAssetId(assetId){
        this.assetId=assetId
    },
    fetchAsset(){
      TagServices.getAvailableTags()
      .then((response) => {
        this.assetData=response.data.data
        console.log(this.assetData.length)
      })
      .finally(()=>(this.loading=false))
    },
  },
}
</script>
