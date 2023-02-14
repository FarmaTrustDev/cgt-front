<template>
    <page-layout
      :create="false"
      :bordered="false"
      :loading="loading"
      title="Manual Allocation"
      class="container page-search-input-container"
    >
      <template slot="headerMenus">
        <a-input
          ref="userNameInput"
          :placeholder="translation.searc_1_488"
          class="page-search-input"
          @change="searchLabel"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </template>
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
          <div slot="name" slot-scope="value, row">
              <span :id="row.id" @click="goto(`/blyott/asset/report?id=${row.code}`)">
                {{ row.name }}
              </span>
            </div>
            <div slot="blyottTagId" slot-scope="value, row">
              <span v-if="row.tagResponseDTO==null && row.endDate==null" :id="row.id" @click="goto(`/blyott/asset/report/allocation/allocateTag?id=${row.globalId}`)">
                <div style="color:blue; font-weight:bold">Commission Asset</div>
              </span>
              <span v-else-if="row.tagResponseDTO!=null" :id="row.id">
                {{ row.tagResponseDTO.blyottTagId}}
              </span>
            </div>
            <div slot="startDate" slot-scope="value, row">
              <span v-if="row.tagResponseDTO!=null && row.startDate==null" :id="row.id" @click="startUsing(row.id)">
                <div style="color:blue; font-weight:bold">Start Using</div>
              </span>
              <span v-else :id="row.id">
                {{ row.startDate }}
              </span>
            </div>
            <div slot="endDate" slot-scope="value, row">
              <span v-if="row.startDate!=null && row.endDate==null" :id="row.id" @click="decommission(row.id, row.code, row.name)">
                <div style="color:blue; font-weight:bold">Decommission</div>
              </span>
              <span v-else :id="row.id">
                {{ row.endDate }}
              </span>
            </div>


            <div slot="action" slot-scope="value, row">
              <span v-if="row.endDate!=null" :id="row.id">
                <div style="color:blue; font-weight:bold">Chemical consumed</div>
              </span>
              <span v-else-if="row.endDate==null && row.startDate!=null" :id="row.id">
                Chemical opened
              </span>
              <span v-else-if="row.startDate==null && row.tagResponseDTO!=null" :id="row.id">
                Ready to be used
              </span>
              <span v-else-if="row.tagResponseDTO==null" :id="row.id">
                Comissioning Stage
              </span>
            </div>


          </a-table>
        </a-row>
      </template>
    </page-layout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout'
  // import Table from '~/components/labeling/Listing'
  import AssetServices from '~/services/API/AssetServices'
  import routeHelpers from '~/mixins/route-helpers'
  import LabelServices from '~/services/API/LabelServices'
  import { isEmpty } from '~/services/Utilities'
  import { preventDefault } from '~/services/Helpers'
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
            key: 'id',
            scopedSlots: { customRender: 'name' },
          },
          {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
          },              
          {
            title: 'Location',
            dataIndex: 'locationResponseDTO.name',
            key: 'location',
          },              
          {
            title: 'Volume (L)',
            dataIndex: 'assetModel',
            key: 'assetModel',
          },
          {
            title: 'Tag Assigned',
            dataIndex: 'tagResponseDTO.blyottTagId',
            key: 'blyottTagId',
            scopedSlots: { customRender: 'blyottTagId' },
          },
          {
            title: 'Commissioned At',
            dataIndex: 'commissioninDate',
            key: 'commissioninDate',
          },
          {
            title: 'Started At',
            dataIndex: 'startDate',
            key: 'startDate',
            scopedSlots: { customRender: 'startDate' },
          },
          {
            title: 'Ended At',
            dataIndex: 'endDate',
            key: 'endDate',
            scopedSlots: { customRender: 'endDate' },
          },
          {
            title: 'Status',
            key: 'action',
            scopedSlots: { customRender: 'action' },
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
      preventDefault,
      fetchAsset(){
          AssetServices.fetchAssetsFromCGTBlyott()
          .then((response) => {
              this.assetData = response.data.data
          })
          .finally(()=>(this.loading=false))
      },
      isEmpty,
      startUsing(assetId){
        const data =JSON.parse(JSON.stringify({
          id: assetId,
        }));
        AssetServices.startUsingAsset(data)
          .then((response) => {
              this.fetchAsset()
          })
          .finally(()=>(this.loading=false))
      },
      decommission(assetId, code, name){
        const data =JSON.parse(JSON.stringify({
          id: assetId,
        }));
        const blyottData=JSON.stringify(
          {
            AssetId:assetId,
            AssetName:name,
            TagId:null,
            AssetCode:code,
            AccessLevels:[278],
          }
        )
        AssetServices.updateBlyott(blyottData).then((response)=>{
          AssetServices.decommission(data)
          .then((response) => {
              this.fetchAsset()
          }).finally(()=>(this.loading=false))
        })
        .finally(()=>(this.loading=false))
      },      
      fetchSearch(params) {
        this.loading = true
        LabelServices.hospital(params)
          .then((response) => {
            this.data = response.data
          })
          .finally(() => (this.loading = false))
      },
      searchLabel(e) {
        const search = e.target.value
        if (search !== '') {
          this.fetchSearch({
            patientEnrollmentNumber: search,
            TreatmentTypeName: search,
          })
        } else {
          this.fetch()
        }
      },
    },
  }
  </script>
  