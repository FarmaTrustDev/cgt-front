<template>
  <div>
    <a-table :data-source="data" :columns="[]">
      <template slot="title">
        <a-button type="primary" @click="handleGroupModal(true)">
          create group</a-button
        >
      </template>
      <template slot="message" slot-scope="text, record">
        <a-button type="" @click="getUser(text, record)"> view</a-button>
      </template>
    </a-table>
    <a-modal
      :width="800"
      :visible="groupModal"
      title="Create Group"
      @cancel="handleGroupModal(false)"
    >
      <a-form :form="form" @submit="onSubmit">
        <FormFields />
        <FormActionButton :loading="loading" custom-text="Create Group" />
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import ChatServices from '~/services/API/ChatServices'
import FormFields from '~/components/chat/groups/FormFields'
export default {
  components: { FormFields },
  data() {
    return {
      loading: false,
      groupModal: false,
      data: [],
      form: this.$form.createForm(this, {
        name: 'createForm',
      }),
    }
  },
  mounted() {},
  methods: {
    fetch() {
      ChatServices.fetchGroup().then((response) => {
        console.log(response)
      })
    },
    handleGroupModal(show) {
      this.groupModal = show
    },
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
