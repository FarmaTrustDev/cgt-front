<template>
  <div>
    <a-table :data-source="data" :loading="loading" :columns="columns">
      <template slot="title">
        <a-button type="primary" @click="handleGroupModal(true)">
          create group</a-button
        >
      </template>
    </a-table>
    <a-modal
      :destroy-on-close="true"
      :width="800"
      :visible="groupModal"
      :footer="false"
      title="Create Group"
      @cancel="handleGroupModal(false)"
    >
      <a-form :form="form" @submit="onSubmit">
        <FormFields @getImage="getImage" />
        <FormActionButton :loading="loading" custom-text="Create Group" />
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import ChatServices from '~/services/API/ChatServices'
import FormFields from '~/components/chat/groups/FormFields'
import { isEmpty } from '~/services/Utilities'

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
]
export default {
  components: { FormFields },
  data() {
    return {
      loading: false,
      groupModal: false,
      data: [],
      columns,
      files: [],
      form: this.$form.createForm(this, {
        name: 'createForm',
      }),
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.loading = true
      ChatServices.fetchGroup()
        .then((response) => {
          this.data = response.groups
        })
        .finally(() => (this.loading = false))
    },
    handleGroupModal(show) {
      this.groupModal = show
    },
    getImage(files) {
      if (!isEmpty(files)) {
        this.files = files
      }
    },
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()

          for (const key in values) {
            formData.append(key, values[key])
          }

          this.files.forEach((files) => {
            formData.append('files', files)
          })

          ChatServices.createGroup(formData).then((response) => {
            this.handleGroupModal(false)
            this.fetch()
          })
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
