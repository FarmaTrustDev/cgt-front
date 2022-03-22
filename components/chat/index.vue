<template>
  <div class="chat-page">
    <a-row class="grey-card">
      <a-col :span="9" class="left-bar">
        <a-card :bordered="false" class="default-card"
          ><a-skeleton :loading="conversationLoader">
            <List
              :conversations="conversations"
              @getConversation="getConversation" /></a-skeleton
        ></a-card>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="14" class="right-bar">
        <a-card :bordered="false" class="default-card"
          ><Conversation
            v-if="messageTo != null"
            :message-to-id="opponentId"
            :message-to="messageTo"
            :data="endToEndConversation"
        /></a-card>
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
  data() {
    return {
      conversations: [],
      conversationLoader: true,
      endToEndConversation: [],
      opponentId: null,
      messageTo: null,
    }
  },
  mounted() {
    this.fetchConversation()
    this.fetch()
  },
  methods: {
    fetchConversation() {
      ChatServices.getConversations()
        .then((conversations) => {
          this.conversations = conversations.data
        })
        .finally(() => (this.conversationLoader = false))
    },
    fetch(params = {}) {
      ChatServices.get(params).then((response) => {
        this.endToEndConversation = response.data
      })
    },
    getConversation(conversation) {
      let params = {}
      if (conversation.isGroup) {
        this.messageTo = 'group_Id'
        params = {
          group_Id: conversation.opponentId,
        }
      } else {
        this.messageTo = 'recipient_Id'
        params = {
          recipient_Id: conversation.opponentId,
        }
      }

      this.opponentId = conversation.opponentId
      this.fetch(params)
    },
  },
}
</script>
