<template>
  <div class="clearfix">
    <div class="counter">Shelf {{ counter }}</div>
    <div class="rack-container">
      <div class="rack light-shadow" :class="active ? 'active' : ''">
        
        <div
          v-for="(portion, index) in portions"
          :key="index"
          class="portion"
          :class="portion.active  ? 'active' : ''"
          :style="(portion.active && (activeIndex===index) && (currentCounter===counter)) ? 'border: 3px solid;' : portion.active  ? '' : (((activeIndex===index) && (currentCounter===counter))) ? 'border: 3px solid;': ((autoSelect!==null) && (activeIndex===null) && (counter===1) && (index===1)) ? 'border: 3px solid;' :''"
          @click="getRackPortion(portion, index, counter)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean },
    portions: { type: Array, default: () => [{}] },
    counter: { type: Number, default: 0 },
    currentCounter:{ type: Number },
    activeIndex: { type: Number },
    autoSelect: {type: Number},
  },
  data() {
    return {
      autoSelectData:this.autoSelect
      // activeIndex:null,
      // currentCounter:null,
    }
  },  
  methods: {
    getRackPortion(portion,index,counter) {
      this.autoSelectData=null
      this.$emit('getRackPortion', portion, index, counter, this.autoSelectData)
    },
  },
}
</script>

<style lang="scss" scoped>
.portion.active {
  background-color: #eb101066;
  // &:hover {
  //   background-color: #2f79e366;
  // }
}
.portion {
  border: 1px solid #2f78e366;
  display: flex;
  flex: 1;
  &:hover {
  border: 3px solid;
  padding: 2px;    
    //background-color: #eb101066;
  }
}
.rack {
  background-color: #2f78e366;
  height: 35px;
  margin-bottom: 10px;
  display: flex;
  width: 90%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
}
.active {
  background-color: #eb101066;
}
.active-clicked {
  // background-color: #eb101066;
  border: 3px solid;
  padding: 2px;
  // box-shadow: 2px 5px red;
}
.counter {
  float: left;
  width: 60px;
  font-weight: bold;
}
.rack-container {
  float: left;
  width: 80%;
}
</style>
