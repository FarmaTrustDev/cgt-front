<template>
  <div>
    <a-row>
      <a-col>
        <a-list
          v-if="comments.length"
          :data-source="comments"
          :header="`${comments.length} ${
            comments.length > 1 ? 'replies' : 'reply'
          }`"
          item-layout="horizontal"
          :bordered="false"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            :class="'message-' + item.type"
          >
            <a-comment :author="item.author" :content="item.content">
              <template slot="content"
                ><div class="message-time">
                  Raja Sharif, 29 September 2021 19:33
                </div></template
              >
            </a-comment>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
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
              @change="handleSubmit"
            />
            <a-input
              v-decorator="[
                `recipient_Id`,
                {
                  rules: [
                    { required: true, message: 'Please input your name!' },
                  ],
                  initialValue: 2,
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
                  initialValue: 'Paige Turner',
                },
              ]"
              type="hidden"
            />
          </a-form-item>
        </a-col>
        <a-col class="text-right">
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="handleSubmit"
            >
              Submit
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'
import ChatServices from '~/services/API/ChatServices'
export default {
  data() {
    return {
      comments: [
        {
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.value,
          datetime: moment().fromNow(),
          type: 'sent',
        },
        {
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.value,
          datetime: moment().fromNow(),
          type: 'received',
        },
        {
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.value,
          datetime: moment().fromNow(),
          type: 'sent',
        },
      ],
      submitting: false,
      value: '',
      moment,
      form: this.$form.createForm(this, {
        name: 'chat',
      }),
      formLayout: 'vertical',
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        // console.log(values)

        if (!err) {
          this.postMessage(values)
          this.form.resetFields()
        } else {
          this.loading = false
        }
      })
    },
    postMessage(params) {
      ChatServices.create(params).then((response) => {
        console.log(response)
      })
    },
    handleSubmit() {
      if (!this.value) {
        return
      }

      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow(),
          },

          ...this.comments,
        ]
        this.value = ''
      }, 1000)
    },
    handleChange(e) {
      this.value = e.target.value
    },
  },
}
</script>
