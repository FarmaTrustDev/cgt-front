<template>
  <div>
    <a-card :bordered="false">
      <strong slot="title">
        {{ recipient.name }} <a-divider></a-divider>
      </strong>

      <a-row>
        <div ref="container" class="peer-to-peer-chat-list">
          <a-col>
            <!-- <pre> {{ data }}</pre> -->
            <a-list
              id="chatListContainer"
              class="conversation-list"
              :data-source="data"
              item-layout="horizontal"
              :bordered="false"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                :class="'message-' + getType(item.isOwner)"
              >
                <a-comment :author="item.ownerName" :content="item.content">
                  <template slot="content"
                    ><div class="content-body">
                      {{ item.message }}
                    </div></template
                  >
                  <a-tooltip slot="datetime" :title="item.created_at">
                    <span>{{ item.created_at }}</span>
                  </a-tooltip>
                </a-comment>
              </a-list-item>
            </a-list>
          </a-col>
        </div>
      </a-row>

      <!-- /// Form for chat -->
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <a-row>
          <a-col>
            <a-form-item>
              <a-input
                v-decorator="[
                  'message',
                  {
                    rules: [
                      { required: true, message: 'Empty message not allow' },
                    ],
                  },
                ]"
                class="send-message-input"
                placeholder="Type message here"
              />
              <a-input
                v-decorator="[
                  recipient.type,
                  {
                    rules: [
                      { required: true, message: 'Please input your name!' },
                    ],
                    initialValue: `${recipient.id}`,
                  },
                ]"
                type="hidden"
              />

              <a-input
                v-decorator="[
                  `Recipient_Name`,
                  {
                    rules: [
                      { required: true, message: 'Please input your name!' },
                    ],
                    initialValue: recipient.name,
                  },
                ]"
                type="hidden"
              />
            </a-form-item>
          </a-col>
          <a-col class="text-right">
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary">
                Submit
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- /// Form for chat -->
    </a-card>
  </div>
</template>
<script>
import moment from 'moment'
import ChatServices from '~/services/API/ChatServices'
export default {
  props: {
    data: { type: Array, default: () => {} },
    // messageToId: { type: String, default: null, required: true },
    // messageTo: { type: String, default: `recipient_Id`, required: true },
    recipient: { type: Object, default: () => {}, required: true },
  },
  data() {
    return {
      submitting: false,
      value: '',
      moment,
      form: this.$form.createForm(this, {
        name: 'chat',
      }),
      formLayout: 'vertical',
    }
  },
  mounted() {
    this.$emit('loadScrollMethod', this.scrollToElement)
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        // console.log(values)

        if (!err) {
          this.postMessage(values)
          this.form.resetFields()
          this.scrollToElement()
        } else {
          this.loading = false
        }
      })
    },
    postMessage(params) {
      ChatServices.create(params).then((response) => {
        // console.log(response)
        this.$emit('fetch', response)
      })
    },

    handleChange(e) {
      this.value = e.target.value
    },
    getType(isOwner) {
      return !isOwner ? 'received' : 'sent'
    },
    scrollToElement() {
      const content = this.$refs.container

      content.scrollTop = content.scrollHeight
    },
  },
}
</script>
