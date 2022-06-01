<template>
  <div class="chat-page">
    <!-- <a-button type="primary" @click="showUsersModal(true)">Add Users</a-button> -->
    <a-row class="grey-card">
      <a-col :span="9" class="left-bar">
        <a-card :bordered="false" class="default-card chat-container-height"
          ><a-spin :spinning="conversationLoader">
            <List
              :conversations="conversations"
              @getConversation="getConversation" /></a-spin
        ></a-card>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="14" class="right-bar">
        <a-card :bordered="false" class="default-card">
          <div class="max-h-200">
            <a-spin class="p-0" :spinning="endToEndConversationLoader">
              <Conversation
                v-if="!isEmpty(recipient)"
                :recipient="recipient"
                :data="endToEndConversation"
                @fetch="loadFromChat"
                @loadScrollMethod="loadScrollMethod"
              />
              <a-empty v-else class="h-100vh">
                <span slot="description">
                  {{translation.SelecUser_5_117}}
                </span>
                <a-button type="primary" @click="showUsersModal(true)">
                  {{translation.StartNow_2_457}}
                </a-button>
              </a-empty>
            </a-spin>
          </div></a-card
        >
      </a-col>
    </a-row>
    <a-modal
      :width="1200"
      :visible="groupModal"
      :title="translation.adduser_2_464"
      :footer="null"
      @cancel="handleGroupModal(false)"
    >
      <Group />
    </a-modal>
    <a-modal
      :visible="usersModal"
      :title="translation.adduser_2_464"
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
import Group from '~/components/chat/groups'
import ChatServices from '~/services/API/ChatServices'
import { EVENT_CHAT_NOTIFICATION } from '~/services/Constant/Events'
import UserList from '~/components/users/ChatList'
import { isEmpty } from '~/services/Helpers'
export default {
  components: { Conversation, List, UserList, Group },
  data() {
    return {
      conversations: [],
      conversationLoader: false,
      endToEndConversation: [],
      opponentId: null,
      messageTo: null,
      usersModal: false,
      recipient: {},
      endToEndConversationLoader: false,
      scrollMethod: () => {},
      groupModal: false,
    }
  },
  mounted() {
    this.fetchConversation()
    this.registerEventNotification()

    this.$emit('loadShowModal', this.showUsersModal)
    this.$emit('handleGroupModal', this.handleGroupModal)
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
    loadScrollMethod(method) {
      this.scrollMethod = method
    },
    isEmpty,
    fetchConversation() {
      this.conversationLoader = true

      ChatServices.getConversations()
        .then((conversations) => {
          this.conversations = conversations.data
        })
        .catch((e) => {})
        .finally(() => {
          this.conversationLoader = false
        })
    },
    fetch(params = {}) {
      // End to End conversation right side
      this.endToEndConversationLoader = true
      ChatServices.get(params)
        .then((response) => {
          this.endToEndConversation = response.data
        })
        .then(() => {
          this.scrollMethod()
        })
        .finally(() => (this.endToEndConversationLoader = false))
    },
    getConversation(conversation) {
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
    /// this method works when auto message generate
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
    handleGroupModal(show) {
      this.groupModal = show
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
  },
}
</script>
