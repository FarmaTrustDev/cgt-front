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
          <a-list-item slot="renderItem" slot-scope="item" :class="'message-'+ item.type">
            <a-comment
              :author="item.author"
              :content="item.content"

            >
            <template slot="content"><div class="message-time">Raja Sharif, 29 September 2021 19:33</div></template>
          </a-comment>
            
          </a-list-item>
        </a-list>
    </a-col>
    </a-row>
    
    <a-row>
      <a-col>
        <a-form-item>
          <a-input class="send-message-input" placeholder="Type message here" :value="value" @change="handleChange" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
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

  </div>
</template>
<script>
import moment from 'moment'
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
          type:'sent'
        },
        {
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.value,
          datetime: moment().fromNow(),
          type: 'received'
        },
        {
          author: 'Han Solo',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: this.value,
          datetime: moment().fromNow(),
          type: 'sent'
        },
      ],
      submitting: false,
      value: '',
      moment,
    }
  },
  methods: {
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
