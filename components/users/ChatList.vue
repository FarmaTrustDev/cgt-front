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

export default {
  data() {
    return { column:[
  {
    title: `${this.$store.getters.getTranslation.Name_1_138}`,
    dataIndex: 'userName',
    key: 'name',
    width: '90%',
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    scopedSlots: { customRender: 'message' },
  },
], 
UserServices, 
data: [] }
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
