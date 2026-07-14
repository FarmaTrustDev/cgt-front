<template>
  <div class="chat-page chat-card-padding">
    <!-- <a-button type="primary" @click="showUsersModal(true)">Add Users</a-button> -->
    <a-row class="grey-card" style="margin: 0">
      <a-col :span="9" class="left-bar">
        <a-card :bordered="false" class="default-card chat-container-height"
          ><a-spin :spinning="conversationLoader"> 
            <List
              :conversations="conversations"
              @getConversation="getConversation" /></a-spin
        ></a-card>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="14" class="right-bar clearfix">
        <a-card :bordered="false" class="default-card height-100">
          <div class="max-h-200">
            <a-spin class="p-0" :spinning="endToEndConversationLoader">
              <Conversation
  v-if="!isEmpty(recipient)"
  :recipient="recipient"
  :data="endToEndConversation"
  :colorMap="colorMap"
  @fetch="loadFromChat"
  @sendLocalMessage="sendLocalMessage"
  @loadScrollMethod="loadScrollMethod"
/>
              <a-empty v-else class="h-100vh">
                <span slot="description">
                  {{ translation.SelecUser_5_117 }}
                </span>
                <a-button type="primary" @click="showUsersModal(true)">
                  {{ translation.StartNow_2_457 }}
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
      title="Groups"
      :dialog-style="{ top: '10px' }"
      :footer="null"
      :destroy-on-close="true"
      @cancel="handleGroupModal(false)"
    >
      <Group @getGroup="getGroup" />
    </a-modal>
    <a-modal
      :visible="usersModal"
      :title="translation.UsersList_2_575"
      :footer="null"
      width="40%"
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
  /* data() {
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
      newConversations: [],
      uniqueIds: [],
      colorMap: {},
    }
  }, */
  data() {
  return {
    useMockChat: true,

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
    newConversations: [],
    uniqueIds: [],
    colorMap: {},

    mockConversations: [
      {
    id: 1,
    isGroup: false,
    isOwner: true,
    opponentId: 101,
    recipient_Name: 'Timothy Hornstein',
    sender_Name: 'Harley Raddix',
    message: '',
    organizationId: 1,
    group_Image:
      'https://demoapi.qmaid.co/Uploads//user/806b4314-55ef-43b1-a4c9-e9ab5e2907d6/6b1f4de1-3a8a-43c5-a3ca-859adf0bf5fe.jpg',
  },
  {
    id: 2,
    isGroup: false,
    isOwner: false,
    opponentId: 102,
    recipient_Name: 'Tyler Jackson',
    sender_Name: 'Dr. Smith',
    message: '',
    organizationId: 2,
    group_Image:
      'https://demoapi.qmaid.co/Uploads//user/9f9152ea-63e0-4f33-8ddd-7582bf7a526d/4a33c2e3-6574-45c1-8be3-60e238ad4497.jpg',
  },
      
    ],

    mockMessages: {
      101: [
        {
          id: 1001,
          isGroup: false,
          isOwner: false,
          sender_Id: 101,
          sender_Name: 'Harley Raddix',
          message: 'Hello - one of my treatments is missing, please can you check status and get back to me ASAP',
          created_at: '2026-06-16 10:00 AM',
        },
        {
          id: 1002,
          isGroup: false,
          isOwner: true,
          sender_Id: 1,
          sender_Name: 'Timothy Hornstein',
          message: 'OK let me check it and get back to you in 15 minutes',
          created_at: '2026-06-16 10:01 AM',
        },
        
      ],

      102: [
        {
          id: 2001,
          isGroup: false,
          isOwner: false,
          sender_Id: 102,
          sender_Name: 'Dr. Smith',
          message: 'Please note that treatment BG2035 is delayed by the courier, we are getting a new courier and the treatment should be with you in the next 6 hours',
          created_at: '2026-06-16 11:00 AM',
        },
        {
          id: 2002,
          isGroup: false,
          isOwner: true,
          sender_Id: 1,
          sender_Name: 'Nathan Green',
          message: 'OK thanks',
          created_at: '2026-06-16 11:02 AM',
        },
      ],

      group_501: [
        {
          id: 3001,
          isGroup: true,
          isOwner: false,
          sender_Id: 101,
          sender_Name: 'Ali Raza',
          ownerName: 'Ali Raza',
          group_Id: 501,
          group_Name: 'Development Team',
          message: 'Backend API is pending',
          created_at: '2026-06-16 12:00 PM',
        },
        {
          id: 3002,
          isGroup: true,
          isOwner: true,
          sender_Id: 1,
          sender_Name: 'Zulqrnain Ali',
          ownerName: 'Zulqrnain Ali',
          group_Id: 501,
          group_Name: 'Development Team',
          message: 'Okay, use hardcoded data for now',
          created_at: '2026-06-16 12:01 PM',
        },
        {
          id: 3003,
          isGroup: true,
          isOwner: false,
          sender_Id: 102,
          sender_Name: 'Ahmed Khan',
          ownerName: 'Ahmed Khan',
          group_Id: 501,
          group_Name: 'Development Team',
          message: 'I will connect API later',
          created_at: '2026-06-16 12:03 PM',
        },
      ],
    }, 
  }
},
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    this.fetchConversation()
    this.registerEventNotification()

    this.$emit('loadShowModal', this.showUsersModal)
    this.$emit('handleGroupModal', this.handleGroupModal)
  },
  methods: {
    loadScrollMethod(method) {
      this.scrollMethod = method
    },
    isEmpty,
    /* fetchConversation() {
      this.conversationLoader = true
      ChatServices.getConversations()
        .then((conversations) => {
          for (const dat in conversations.data) {
            if (
              conversations.data[dat].id === 925 ||
              conversations.data[dat].id === 913
            ) {
              console.log('hello remove tis if printed')
            } else {
              this.newConversations.push(conversations.data[dat])
              this.conversations.push(conversations.data[dat])
            }
          }
          // console.log(this.conversations)
          // this.conversations = conversations.data
        })
        .catch((e) => {})
        .finally(() => {
          this.conversationLoader = false
        })
    }, */
    fetchConversation() {
  this.conversationLoader = true

  if (this.useMockChat) {
    this.conversations = [...this.mockConversations]
    this.conversationLoader = false
    return
  }

  ChatServices.getConversations()
    .then((conversations) => {
      this.conversations = conversations.data
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      this.conversationLoader = false
    })
},
sendLocalMessage(message) {
  this.endToEndConversation.push(message)

  if (this.recipient.type === 'recipient_Id') {
    const id = this.recipient.id

    if (!this.mockMessages[id]) {
      this.$set(this.mockMessages, id, [])
    }

    this.mockMessages[id].push(message)
  }

  if (this.recipient.type === 'group_Id') {
    const key = `group_${this.recipient.id}`

    if (!this.mockMessages[key]) {
      this.$set(this.mockMessages, key, [])
    }

    this.mockMessages[key].push(message)
  }

  this.extractUniqueIds(this.endToEndConversation)

  this.$nextTick(() => {
    this.scrollMethod()
  })
},
    /* fetch(params = {}) {
      // End to End conversation right side
      this.endToEndConversationLoader = true
      ChatServices.get(params)
        .then((response) => {
          this.endToEndConversation.splice(0)
          for (const dt in response.data) {
            if (
              response.data[dt].id === 973 ||
              response.data[dt].id === 903 ||
              response.data[dt].id === 905
            ) {
              console.log(response.data[dt])
            } else {
              this.endToEndConversation.push(response.data[dt])
            }
          }
          this.extractUniqueIds(this.endToEndConversation)
        })
        .then(() => {
          this.scrollMethod()
        })
        .finally(() => (this.endToEndConversationLoader = false))
    }, */

fetch(params = {}) {
  this.endToEndConversationLoader = true

  if (this.useMockChat) {
    let messages = []

    if (params.recipient_Id) {
      messages = this.mockMessages[params.recipient_Id] || []
    }

    if (params.group_Id || params.Group_Id) {
      const groupId = params.group_Id || params.Group_Id
      messages = this.mockMessages[`group_${groupId}`] || []
    }

    this.endToEndConversation = [...messages]

    this.extractUniqueIds(this.endToEndConversation)

    this.$nextTick(() => {
      this.scrollMethod()
    })

    this.endToEndConversationLoader = false
    return
  }

  ChatServices.get(params)
    .then((response) => {
      this.endToEndConversation.splice(0)

      for (const dt in response.data) {
        this.endToEndConversation.push(response.data[dt])
      }

      this.extractUniqueIds(this.endToEndConversation)
    })
    .then(() => {
      this.scrollMethod()
    })
    .finally(() => {
      this.endToEndConversationLoader = false
    })
},

    extractUniqueIds(data) {
      const uniqueIdsSet = new Set();
      data.forEach((item) => {
        uniqueIdsSet.add(item.sender_Id);
      });
      this.uniqueIds = Array.from(uniqueIdsSet);
      // console.log(this.uniqueIds)
      this.assignColors();
    },
    /* assignColors() {
      this.uniqueIds.forEach((id) => {
        const color = this.generateRandomColor();
        this.colorMap[id] = color;
      });
      console.log(this.colorMap)
    }, */
    assignColors() {
  this.uniqueIds.forEach((id) => {
    if (!this.colorMap[id]) {
      this.$set(this.colorMap, id, this.generateRandomColor())
    }
  })
},
    generateRandomColor() {
      const letters = 'BCEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 4)];
      }
      return color;
    },
    getColor(id) {
      return this.colorMap[id] || ''; // Return color from colorMap or empty string if not found
    },
    getConversation(conversation) {
      let params = {}
      const recipientData = {}

      if (conversation.isGroup) {
        recipientData.type = 'group_Id'
        recipientData.name = !isEmpty(conversation.group_Name)
          ? conversation.group_Name
          : conversation.group_name
        recipientData.id = conversation.group_Id
        params = {
          group_Id: conversation.group_Id,
        }
      } else {
        recipientData.type = 'recipient_Id'
        recipientData.name = conversation.recipient_Name
        recipientData.id = conversation.opponentId
        params = {
          recipient_Id: conversation.opponentId,
        }
      }

      this.recipient = recipientData
      this.fetch(params)
    },
    registerEventNotification() {
      const getNotification = this.getNotification
      this.$nuxt.$on(EVENT_CHAT_NOTIFICATION, (notification) => {
        getNotification(notification.data)
      })
    },
    // this method works when auto message generate
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
    getGroup(group) {
      this.recipient = {
        type: 'group_Id',
        name: group.name,
        id: group.id,
      }

      this.fetch({
        Group_Id: group.id,
        sender_id: this.$store.getters.getUser.id,
      })
      this.handleGroupModal(false)
    },
    loadFromChat(notification) {
      this.getConversation(notification.data)
    },

  },
}
</script>
