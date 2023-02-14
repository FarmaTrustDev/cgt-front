<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Tags"
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
          @click="goto('/blyott/tag/create')"
          >Add Tag</a-button
        >
    </template>
    <template slot="content">
      <a-row class="">
        <a-table
          :columns="columns"
          :data-source="tagData"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
          class="rounded-table"
        >
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              {{ translation['Admin_1_142'] }} <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a @click="goto(`/blyott/tag/${action.globalId}`)">{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template> 
          <div slot="blyottTagId" slot-scope="value, row">
            <span :id="row.id" @click="goto(`/blyott/tag/report?id=${row.blyottTagId}`)">
              {{ row.blyottTagId }}
            </span>
          </div>
        </a-table>
      </a-row></template
    ></page-layout
  >
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
// import Table from '~/components/labeling/Listing'
import routeHelpers from '~/mixins/route-helpers'
import TagServices from '~/services/API/TagServices'
import LabelServices from '~/services/API/LabelServices'
import { preventDefault } from '~/services/Helpers'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      loading: true,
      tagData:[],
      columns: [
        {
          title: 'Tag ID',
          // dataIndex: 'blyottTagId',
          key: 'blyottTagId',
          scopedSlots: { customRender: 'blyottTagId' },
        },
        {
          title: 'Hardware Model',
          dataIndex: 'tagHardwareModelName',
          key: 'tagHardwareModelName',
        },
        {
          title: 'NFC ID',
          dataIndex: 'nfcId',
          key: 'nfcId',
        },
        {
          title: 'Commissioning Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  mounted() {
    this.fetchTag()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    preventDefault,
    fetchTag(){
        TagServices.fetchTagsFromCGTBlyott()
        .then((response) => {
            this.tagData = response.data.data
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
