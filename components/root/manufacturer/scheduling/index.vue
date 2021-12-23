<template>
  <div>
    <a-tabs
      tab-position="left"
      :default-active-key="activeTab"
      @change="tabChange"
    >
      <a-tab-pane :key="1" tab="Detail"
        ><Form :treatment="treatment" />
      </a-tab-pane>
      <a-tab-pane :key="2" tab="Availability">Availability </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Form from '~/components/root/manufacturer/scheduling/Form'
export default {
  components: {
    Form,
  },
  data() {
    return {
      activeTab: 1,
      treatment: {},
    }
  },
  mounted() {
    // this.isTreatmentCreate()
  },
  methods: {
    tabChange(a, b, c) {
      console.log(a, b, c)
    },
  },
}
</script>
