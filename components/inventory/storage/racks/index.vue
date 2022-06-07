<template>
  <div class="text-center">
    <div class="racks">
      <span v-for="rack in data" :key="rack.id" @click="getRack(rack)">
        <rack />
      </span>
    </div>
  </div>
</template>

<script>
import rack from '~/components/inventory/storage/racks/rack'
export default {
  components: { rack },
  props: { data: { type: Array, default: () => [{}] } },
  methods: {
    getRack(rack) {
      this.$emit('getRack', rack)
    },
  },
}
</script>
<style lang="scss" scoped>
.racks {
  width: 100%;
  max-width: 200px;
  margin: auto;
}
</style>
