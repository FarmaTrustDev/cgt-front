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
        <a-card :bordered="false" class="default-card">
          <div ref="container" class="max-h-200">
            <Conversation
              v-if="!isEmpty(recipient)"
              :recipient="recipient"
              :data="endToEndConversation"
              @fetch="loadFromChat"
            /></div
        ></a-card>
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
import { isEmpty } from '~/services/Helpers'
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
      recipient: {},
    }
  },
  mounted() {
    this.fetchConversation()
    this.registerEventNotification()
  },
  methods: {
    isEmpty,
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
        // this.scrollToElement()
      })
    },
    getConversation(conversation) {
      console.log('getConversation', conversation)
      let params = {}
      const recipientData = {}
      if (conversation.isGroup) {
        recipientData.type = 'group_Id'
        params = {
          group_Id: conversation.opponentId,
        }
      } else {
        recipientData.type = 'recipient_Id'
        params = {
          recipient_Id: conversation.opponentId,
        }
      }

      recipientData.id = conversation.opponentId
      recipientData.name = conversation.recipient_Name
      this.recipient = recipientData
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
      const recipientData = {}
      if (notification.isGroup) {
        recipientData.type = 'group_Id'
        params = {
          group_Id: notification.group_Id,
        }
        recipientData.id = notification.group_Id
      } else {
        recipientData.id = opponentId
        recipientData.type = 'recipient_Id'
        recipientData.name = notification.recipient_Name
        params = {
          recipient_Id: opponentId,
        }
      }
      this.recipient = recipientData
      this.fetchConversation()
      this.fetch(params)
    },
    showUsersModal(show) {
      this.usersModal = show
    },
    getUser(users) {
      this.recipient = {
        type: 'recipient_Id',
        name: users.firstName,
        id: users.id,
      }

      this.fetch({ recipient_Id: users.id })
      this.showUsersModal(false)
    },
    loadFromChat(notification) {
      this.getConversation(notification.data)
    },
    scrollToElement() {
      const content = this.$refs.container
      content.scrollTop = content.scrollHeight
    },
  },
}
</script>
