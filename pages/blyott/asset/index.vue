<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Assets"
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
      <a-button
          type="primary"
          @click="goto('/blyott/asset/create')"
          >Add Asset</a-button
        >
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
          <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              Action <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a @click="goto(`/blyott/asset/${action.globalId}`)">{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template> 
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
          // dataIndex: 'name',
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
        },
        {
          title: 'Ended At',
          dataIndex: 'endDate',
          key: 'endDate',
        },
        {
          title: 'Action',
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
