<template>
  <span class="rack light-shadow" :class="active ? 'active' : ''"></span>
</template>

<script>
export default {
  props: {
    active: { type: Boolean },
  },
}
</script>

<style lang="scss" scoped>
.rack {
  background-color: #d9d9d9;
  height: 35px;
  margin-top: 10px;
  display: inline-block;
  border: 1px solid #1943ae;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fa6363;
  }
}
.active {
  background-color: #fa6363;
}
</style>
