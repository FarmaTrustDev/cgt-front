<template>
  <div class="inventory-page">
    <a-tabs
      :animated="false"
      class="h-tabs no-border-bottom"
      default-active-key="1"
      @change="callback"
    >
      <a-tab-pane key="1" tab="Germany - Cellfuse ">
        <tab />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Germany - Cellfuse ">
        <tab />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Germany - Cellfuse ">
        <tab />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Germany - Cellfuse ">
        <tab />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import tab from '~/components/root/inventory/tab'
export default {
  components: { tab },
  data() {
    return {}
  },
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
