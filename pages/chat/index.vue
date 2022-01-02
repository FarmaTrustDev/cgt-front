<template>
  <page-layout
    :loading="loading"
    title="Chat"
    :bordered="borderCard"
    class="patient-page"
  >
    <template slot="content"><chat /></template>
  </page-layout>
</template>
<script>
import chat from '~/components/chat'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { chat, PageLayout },
  data() {
    return {
      loading: false,
      borderCard: false,
    }
  },
}
</script>
