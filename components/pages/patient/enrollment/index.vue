<template>
  <div>
    <a-tabs
      tab-position="left"
      :default-active-key="activeTab"
      @change="tabChange"
    >
      <a-tab-pane :key="1" tab="Patient Detail"><enrollment /> </a-tab-pane>
      <a-tab-pane :key="2" tab="Consent"> Content of Tab Pane 2 </a-tab-pane>
      <a-tab-pane :key="3" tab="Screening"> Content of Tab Pane 3 </a-tab-pane>
      <a-tab-pane :key="4" tab="Scheduling"> Content of Tab Pane 4 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import enrollment from '~/components/patient/enrollment'
export default {
  components: {
    enrollment,
  },
  data() {
    return {
      activeTab: 1,
    }
  },

  methods: {
    tabChange(a, b, c) {
      console.log(a, b, c)
    },
  },
}
</script>
