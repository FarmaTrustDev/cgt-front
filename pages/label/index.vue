<template>
  <page-layout
    :create="false"
    :bordered="false"
    :title="translation.Label_1_27"
    class="container page-search-input-container header-page"
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
        <span  class="specific-card p-0">
          <Table :data="data" :loading="loading"></Table>
        </span>
      </a-row>
    </template>
  </page-layout>
</template>
<script>
// import layout from 'ant-design-vue/lib/layout'

import Table from '~/components/labeling/Listing'
import LabelServices from '~/services/API/LabelServices'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { Table, PageLayout },
  data() {
    return {
      data: [],
      loading:false,
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
          PUID:search
        })
      } else {
        this.fetch()
      }
    },
  },
}
</script>
