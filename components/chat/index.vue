<template>
  <div class="chat-page">
    <a-button type="primary" @click="showUsersModal(true)">Add Users</a-button>
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
            :message-to-id="`${opponentId}`"
            :message-to="`${messageTo}`"
            :data="endToEndConversation"
            @fetch="loadFromChat"
        /></a-card>
      </a-col>
    </a-row>
    <a-modal
      :visible="usersModal"
      title="Add users"
      :footer="null"
      @cancel="showUsersModal(false)"
    >
      <UserList @getUser="getUser" />
    </a-modal>
  </div>
</template>
<script>
import List from '~/components/chat/List'
import Conversation from '~/components/chat/Conversation'
import ChatServices from '~/services/API/ChatServices'
import { EVENT_CHAT_NOTIFICATION } from '~/services/Constant/Events'
import UserList from '~/components/users/ChatList'
export default {
  components: { Conversation, List, UserList },
  data() {
    return {
      conversations: [],
      conversationLoader: true,
      endToEndConversation: [],
      opponentId: null,
      messageTo: null,
      usersModal: false,
    }
  },
  mounted() {
    this.fetchConversation()
    this.registerEventNotification()
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
    registerEventNotification() {
      const getNotification = this.getNotification
      this.$nuxt.$on(EVENT_CHAT_NOTIFICATION, (notification) => {
        getNotification(notification.data)
      })
    },
    // ! hot fix need to optimize the code
    getNotification(notification) {
      const opponentId = notification.sender_Id

      let params = {}
      if (notification.isGroup) {
        this.messageTo = 'group_Id'
        params = {
          group_Id: notification.group_Id,
        }
        this.opponentId = notification.group_Id
      } else {
        this.opponentId = opponentId
        this.messageTo = 'recipient_Id'
        params = {
          recipient_Id: opponentId,
        }
      }
      this.fetchConversation()
      this.fetch(params)
    },
    showUsersModal(show) {
      this.usersModal = show
    },
    getUser(users) {
      this.messageTo = 'recipient_Id'
      this.opponentId = users.id
      this.fetch({ recipient_Id: users.id })
      this.showUsersModal(false)
    },
    loadFromChat(notification) {
      this.getConversation(notification.data)
    },
  },
}
</script>
