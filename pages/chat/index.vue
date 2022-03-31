getUser(users) {},
<template>
  <page-layout
    :loading="loading"
    title="Chat"
    :bordered="borderCard"
    class="patient-page"
    :create="false"
  >
    <template slot="headerMenus">
      <a-button type="primary" @click="showModal(true)"
        >Add Users</a-button
      ></template
    >
    <template slot="content"><chat @loadShowModal="loadShowModal" /> </template>
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
      showModal: () => {},
    }
  },
  methods: {
    loadShowModal(show) {
      this.showModal = show
    },
  },
}
</script>
