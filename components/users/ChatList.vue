<template>
  <div>
    <a-table :data-source="data" :columns="column">
      <template slot="message" slot-scope="text, record">
        <a-button type="" @click="getUser(text, record)"> view</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import UserServices from '~/services/API/UserServices'
const column = [
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'name',
    width: '90%',
  },
  {
    title: 'Action',
    scopedSlots: { customRender: 'message' },
  },
]

export default {
  data() {
    return { column, UserServices, data: [] }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    getUser(user) {
      this.$emit('getUser', user)
    },
    fetch() {
      UserServices.get().then((response) => {
        this.data = response.data
      })
    },
  },
}
</script>
