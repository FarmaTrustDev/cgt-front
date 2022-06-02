<template>
  <div>
    <table class="testTubeTable border">
      <tr v-for="tray in trays" :key="tray.id">
        <td class="border" v-for="tube in tray.tubes" :key="tube.id">
          <tray />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import tray from '~/components/inventory/storage/trays/tray'
const t = {
  tubes: [
    {
      id: 2,
      active: true,
      name: '5A',
    },
    {
      id: 1,
      active: true,
      name: '5A',
    },
    {
      id: 8,
      active: true,
      name: '5A',
    },
    {
      id: 3,
      active: true,
      name: '5A',
    },
    {
      id: 4,
      active: true,
      name: '5A',
    },
    {
      id: 5,
      active: true,
      name: '5A',
    },
    {
      id: 6,
      active: true,
      name: '5A',
    },
    {
      id: 7,
      active: true,
      name: '5A',
    },
  ],
}
export default {
  components: { tray },
  data() {
    return {
      trays: [t, t, t, t],
    }
  },
}
</script>
<style lang="scss" scoped>
.testTubeTable {
  td {
    padding: 5px;
  }
}
</style>
