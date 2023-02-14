<template>
    <page-layout
      :create="false"
      :bordered="false"
      title="Office Report"
      class="container"
    >
      <template slot="content">
        <a-row>
            <h2>Available Tags {{assetData.length}}</h2>
            <a-table
            :columns="columns"
            :data-source="assetData"
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
import TagServices from '~/services/API/TagServices'
import routeHelpers from '~/mixins/route-helpers'
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
      columns: [
        {
          title: 'Tag',
          dataIndex: 'blyottTagId',
          key: 'blyottTagId',
        },
        {
          title: 'Battaery Status',
          dataIndex: 'batteryStaus',
          key: 'batteryStaus',
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
    this.fetchAsset()
  },
  methods: {
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
