<template>
  <div class="rack light-shadow" :class="active ? 'active' : ''">
    <div v-for="portion in portions" :key="portion.id" class="portion">
      <!-- <pre>{{ portion }}</pre> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean },
    portions: { type: Array, default: () => [{}] },
  },
}
</script>

<style lang="scss" scoped>
.portion {
  border: 1px solid #d9d9d9;
  display: flex;
  flex: 1;
  &:hover {
    background-color: #fa6363;
  }
}
.rack {
  background-color: rgba(47, 121, 227, 0.4);
  height: 35px;
  margin-top: 10px;
  display: flex;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
}
.active {
  background-color: #fa6363;
}
</style>
