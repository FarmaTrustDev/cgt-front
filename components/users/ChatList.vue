<template>
  <div>
    <a-table :data-source="data" :columns="column" class="rounded-table">
      <template slot="userName" slot-scope="text, record">
        <p> {{record.firstName}} {{record.lastName}}</p>
      </template>
      <template slot="message" slot-scope="text, record">
        <a-button type="primary" @click="getUser(text, record)"> Message</a-button>
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
    // dataIndex: ['firstName',"lastName"],
    key: 'name',
    width: '40%',
    scopedSlots: { customRender: 'userName' },
  },
  {
    title: `Email Address`,
    dataIndex: 'email',
    key: 'email',
    width: '40%',
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
