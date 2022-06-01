<template>
  <div>
    <a-table :data-source="data" :columns="[]">
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
      :width="800"
      :visible="groupModal"
      :title="translation.CreatGroup_2_479"
      @cancel="handleGroupModal(false)"
    >
      <a-form :form="form" @submit="onSubmit">
        <FormFields />
        <FormActionButton :loading="loading" :custom-text="translation.CreatGroup_2_479" />
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
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
