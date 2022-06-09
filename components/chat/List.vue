<template>
  <a-list
    item-layout="horizontal"
    :data-source="conversations"
    :bordered="false"
    class="reduce-margin"
  >
    <a-list-item slot="renderItem" slot-scope="conversation">
      <a-list-item-meta :description="conversation.message">
        <a slot="title" @click="getConversation(conversation)">
          <span v-if="conversation.isOwner">{{
            conversation.recipient_Name
          }}</span>
          <span v-else>{{ conversation.sender_Name }}</span>
        </a>
        <a-avatar slot="avatar" :src="conversation.group_Image" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
export default {
  props: {
    conversations: { type: Array, default: () => [] },
  },
  data() {
    return {}
  },
  methods: {
    getConversation(conversation) {
      this.$emit('getConversation', conversation)
    },
  },
}
</script>
