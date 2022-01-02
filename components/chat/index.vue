<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-card title="Messages"><List /></a-card
      ></a-col>
      <a-col :span="16">
        <a-card title="Conversation"><Conversation /></a-card
      ></a-col>
    </a-row>
  </div>
</template>
<script>
import List from '~/components/chat/List'
import Conversation from '~/components/chat/Conversation.vue'
export default {
  components: { Conversation, List },
}
</script>
