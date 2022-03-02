<template>
  <page-layout :loading="loading" title="Users" :bordered="false">
    <template slot="content">
      <a-table
        :columns="columns"
        :data-source="datasource"
        class="rounded-table"
        :pagination="{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '100']}"
      >
        <template slot="action" slot-scope="action">
          <a-button type="link" @click="goto(`/users/${action.globalId}`)"
            ><a-icon type="edit"
          /></a-button>
        </template>
      </a-table>
    </template>
  </page-layout>
</template>
<script>
import UserServices from '~/services/API/UserServices'
// import { success } from '~/services/Helpers/notifications'
import routeHelpers from '~/mixins/route-helpers'

import PageLayout from '~/components/layout/PageLayout'
const columns = [
  {
    title: 'firstName',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
  }, 
  {
    title: 'UserName',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: 'Phone',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  components: { 'page-layout': PageLayout },
  mixins: [routeHelpers],
  data() {
    return {
      datasource: [],
      columns,
      loading: true,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      UserServices.get()
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    // remove(id) {
    //   OrganizationServicesServices.destroy(id).then((response) => {
    //     success(this, { message: response.message })
    //     this.fetch()
    //   })
    // },
  },
}
</script>