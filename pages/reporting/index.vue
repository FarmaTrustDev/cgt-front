<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    title="Reporting"
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
          :data-source="datasource"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
          class="rounded-table"
        >
          <div slot="status" slot-scope="value, row">
            <div v-if="row.statusId === 'tag1'">
              <span :id="row.statusId">{{ value }}</span>
            </div>
            <div v-else>
              <span :id="row.statusId">{{ value }}</span>
            </div>
          </div>
          <div slot="doc" slot-scope="value">
            <a-button
              icon="printer"
              class="print-btn"
              type="primary"
              size="small"
              @click="goto(`/report`)"
              >{{ value }}</a-button
            >
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
import LabelServices from '~/services/API/LabelServices'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      loading: true,
      datasource: [
        {
          id: 'DAC49784',
          sample: 'Novartis',
          name: 'Stephen Jones',
          date: '12/07/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC517847',
          sample: 'Adaptimmune',
          name: 'Chris Smith',
          date: '15/08/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC69254',
          sample: 'TCR',
          name: 'Stephen Jones',
          date: '19/08/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC79798',
          sample: 'Novartis',
          name: 'Oliver Jack',
          date: '20/08/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC795412',
          sample: 'Novartis',
          name: 'John Smith',
          date: '29/07/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        // {
        //   id: 'DAC37790',
        //   sample: 'Adaptimmune',
        //   name: 'Jack Connor',
        //   date: '20/08/2022',
        //   status: 'Saved',
        //   statusId: 'tag2',
        //   doc: 'View Form',
        // },
      ],
      columns: [
        {
          title: 'Sample ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Client',
          dataIndex: 'sample',
          key: 'sample',
        },
        {
          title: 'Qualified Person',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Arrival Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          class: 'status-sample',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'Document',
          dataIndex: 'doc',
          key: 'doc',
          scopedSlots: { customRender: 'doc' },
        },
      ],
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    fetch() {
      this.loading = true
      LabelServices.hospital()
        .then((response) => {
          this.data = response.data
        })
        .finally(() => (this.loading = false))
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
