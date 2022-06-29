<template>
  <div>
    <a-row>
      <a-col :span="4"></a-col>
      <a-col :span="20">
        <table class="testTubeTable w-100">
          <tr>
            <td v-for="c in getColumns()" :key="c" class="fake-column">
              <span class="">{{ toLetters(c) }} </span>
            </td>
          </tr>
        </table>
      </a-col>
      <a-col :span="4">
        <div v-for="c in getRows()" :key="c" class="fake-row">
          <span class="">{{ c }} </span>
        </div>
      </a-col>
      <a-col :span="20">
        <table class="testTubeTable w-100">
          <tr v-for="(tray, indexParent) in trays" :key="indexParent">
            <td v-for="(tube, index) in tray.tubes" :key="index" class="border">
              <span @click="getTube(tube)"><div v-if="(count<=totCount) ? increment() : ''"></div>
                <tray :tube="tube" :isHovers="(count<=totCount) ? true : false" />
              </span>
            </td>
          </tr>
        </table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import tray from '~/components/inventory/storage/trays/tray'
import { isEmpty, toLetters } from '~/services/Helpers'
export default {
  components: { tray },
  props: { trays: { type: Array, default: () => [] }, numVials:{type: Number}, },
  data() {
    return {
      row: 0,
      column: 0,
      count: 0,
      totCount: this.numVials
    }
  },
  methods: {
    toLetters,
    getTube(tube) {
      // console.log(tube)
      this.$emit('getTube', tube)
    },
    getRows() {
      if (!isEmpty(this.trays)) {
        return this.trays.length
      }
      return 0
    },
    getColumns() {
      if (!isEmpty(this.trays) && !isEmpty(this.trays[0].tubes)) {
        return this.trays[0].tubes.length
      }
      return 0
    },
    increment(){
      this.count=this.count+1
    }
  },
}
</script>
<style lang="scss" scoped>
.testTubeTable {
  td {
    padding: 5px 10px;
    cursor: pointer;
  }
  .fake-column {
    min-width: 51px;
    min-height: 41px;
  }
}
.fake-row {
  min-height: 41px;
  span {
    padding-top: 10px;
    display: inherit;
  }
}
</style>
