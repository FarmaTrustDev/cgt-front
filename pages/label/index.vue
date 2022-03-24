<template>
  <div class="label-page">
    <a-row class="p-10 mb-10">
      <div class="page-header">
        <h3 class="page-title float-left">Label</h3>

        <a-input
          ref="userNameInput"
          placeholder="Search"
          class="float-right page-search-input"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
    </a-row>

    <a-row class="">
      <a-skeleton :loading="loading">
        <Table :data="data"></Table>
      </a-skeleton>
    </a-row>
  </div>
</template>

<script>
import Table from '~/components/labeling/Listing'
import LabelServices from '~/services/API/LabelServices'
export default {
  components: { Table },
  data() {
    return {
      data: [],
      loading: true,
    }
  },
  mounted() {
    this.fetch()
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
  },
}
</script>
