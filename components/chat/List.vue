<template>
  <a-list
    item-layout="horizontal"
    :data-source="conversations"
    :bordered="false"
    class="reduce-margin"
  >
    <a-list-item
      slot="renderItem"
      slot-scope="conversation"
      style="cursor: pointer"
      @click="getConversation(conversation)"
    > 
      <a-list-item-meta v-if="conversation.organizationId === user.organizationId" :description="conversation.message">
        <span slot="title" style="text-decoration: none">
          <span v-if="conversation.isGroup">
            {{ conversation.group_Name }}
          </span>

          <span v-else>
            {{ conversation.isOwner ? conversation.recipient_Name : conversation.sender_Name }}
          </span>
        </span>

        <a-avatar slot="avatar" :src="getImageName(conversation.group_Image)" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    conversations: { type: Array, default: () => [] },
  },

  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    user() {
      return this.$store.getters.getUser
    },
  },

  methods: {
    getConversation(conversation) {
      this.$emit('getConversation', conversation)
    },

    getImageName(str) {
      if (!str) {
        return ''
      }

      if (str.startsWith('http')) {
        return str
      }

      if (str.startsWith('Uploads')) {
        return 'https://demoapi.qmaid.co/' + str
      }

      return str
    },
  },
}
</script>