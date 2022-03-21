<template>
  <div class="chat-page">
    <a-row class="grey-card">
      <a-col :span="9" class="left-bar">
        <a-card :bordered="false" class="default-card"><List /></a-card>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="14" class="right-bar">
        <a-card :bordered="false" class="default-card"><Conversation /></a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import List from '~/components/chat/List'
import Conversation from '~/components/chat/Conversation'
import ChatServices from '~/services/API/ChatServices'
export default {
  components: { Conversation, List },
  mounted() {
    this.fetchConversation()
  },
  methods: {
    fetchConversation() {
      ChatServices.getConversations().then((conversation) => {
        console.log('conversation', conversation)
      })
    },
  },
}
</script>
