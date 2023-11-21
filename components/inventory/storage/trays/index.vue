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
              <span @click="getTube(tube)">
                <tray :tube="tube" :isHovers="((autoSelect==-1)) ? false : (count<=totCount) ? true : false" :col="index" :row="indexParent" @getColRow="getColRow" />
                <div v-if="(count<=totCount) ? increment() : ''"></div>
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
  props: { 
    trays: { type: Array, default: () => [] }, 
    numVials:{type: Number}, 
    autoSelect: { type: Number},
  },
  data() {
    return {
      row: 0,
      column: 0,
      count: 1,
      selectedVals:[],
      shelfId:'',
      // autoSelects: this.autoSelect,
      totCount: this.numVials,
    }
  },
  methods: {
    toLetters,
    getTube(tube) {
      // alert(rowId)
      console.log(tube)
      // this.autoSelects=null
      
      // this.shelfId=rowId
      // this.$emit('getData', this.selectedVals, this.shelfId)
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
    getColRow(col,row){
      const index = this.selectedVals.findIndex((item) => item.colIndex === col && item.rowIndex===row)
      if(index===-1){
        this.selectedVals.push({
          colIndex: col, 
          rowIndex: row, 
        })
      }else{
        this.selectedVals.splice(index,1)
      }
      this.$emit('getData', this.selectedVals)
      // console.log(this.selectedVals)
    },
    increment(){
      console.log(this.count)
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
