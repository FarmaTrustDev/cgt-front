<template>
  <div>
    <table class="testTubeTable border w-100">
      <tr v-for="tray in trays" :key="tray.id">
        <td v-for="tube in tray.tubes" :key="tube.id" class="border">
          <tray @click="getTube" />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import tray from '~/components/inventory/storage/trays/tray'

export default {
  components: { tray },
  props: { trays: { type: Array, default: () => [] } },
  data() {
    return {}
  },
  methods: {
    getTube(tube) {
      console.log(tube)
    },
  },
}
</script>
<style lang="scss" scoped>
.testTubeTable {
  td {
    padding: 5px 10px;
    cursor: pointer;
  }
}
</style>
