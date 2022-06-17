<template>
  <div>
    <div class="counter">Shelf {{ counter }}</div>
    <div class="rack-container">
      <div class="rack light-shadow" :class="active ? 'active' : ''">
        <div
          v-for="(portion, index) in portions"
          :key="index"
          class="portion"
          :class="portion.active ? 'active' : ''"
          @click="getRackPortion(portion)"
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
  },
  methods: {
    getRackPortion(portion) {
      this.$emit('getRackPortion', portion)
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
    background-color: #eb101066;
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
.counter {
  float: left;
  width: 60px;
  font-weight: bold;
  margin-top: 9px;
}
.rack-container {
  float: left;
  width: 80%;
}
</style>
