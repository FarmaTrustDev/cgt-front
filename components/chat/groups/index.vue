<template>
  <div>
    <a-table :data-source="data" :loading="loading" :columns="columns">
      <template slot="title">
        <a-button type="primary" @click="handleGroupModal(true)">
          {{translation.CreatGroup_2_479}}</a-button
        >
      </template>
      <template slot="message" slot-scope="text, record">
        <a-button type="" @click="getUser(text, record)"> {{translation.view_1_750}}</a-button>
      </template>
    </a-table>
    <a-modal
      :destroy-on-close="true"
      :width="800"
      :visible="groupModal"
      :footer="false"
      :title="translation.CreatGroup_2_479"
      @cancel="handleGroupModal(false)"
    >
      <a-form :form="form" @submit="onSubmit">
        <FormFields @getImage="getImage" />
        <FormActionButton :loading="loading" :custom-text="translation.CreatGroup_2_479"
      @cancel="handleGroupModal(false)" />
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
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
