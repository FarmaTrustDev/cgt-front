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
      <a-button type="primary" @click="showZoomModal(true)"
        >Zoom Meeting</a-button
      >
      <a-button type="primary" @click="showModal(true)">Add Users</a-button>
    </template>
    <template slot="content">
      <chat @loadShowModal="loadShowModal" />
      <zoom @showZoomModal="loadZoomModal" />
    </template>
  </page-layout>
</template>
<script>
import chat from '~/components/chat'
import zoom from '~/components/zoom'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { chat, PageLayout, zoom },
  data() {
    return {
      loading: false,
      borderCard: false,
      showModal: () => {},
      showZoomModal: () => {},
    }
  },
  methods: {
    loadShowModal(show) {
      this.showModal = show
    },
    loadZoomModal(zoomModal) {
      this.showZoomModal = zoomModal
    },
  },
}
</script>
