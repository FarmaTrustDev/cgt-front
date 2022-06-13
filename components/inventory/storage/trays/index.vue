<template>
  <div>
    <table class="testTubeTable border w-100">
      <tr v-for="(tray, indexParent) in trays" :key="indexParent">
        <td v-for="(tube, index) in tray.tubes" :key="index" class="border">
          <span @click="getTube(tube)">
            <tray :tube="tube" />
          </span>
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
      this.$emit('getTube', tube)
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
