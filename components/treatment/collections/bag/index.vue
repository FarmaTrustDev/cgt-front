<template>
  <div>
    <a-tabs type="card" @change="callback">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
        <Process :collections="bag.collection" />
        <a-button type="primary" @click="completeBag"
          >Complete This Sample</a-button
        >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Process from '~/components/treatment/collections/bag/Process'
export default {
  components: { Process },
  props: {
    treatment: { required: true, type: Object },
    bags: { required: true, type: Array },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    completeBag() {
      console.log(this.bags)
    },
    callback(key) {},
  },
}
</script>
