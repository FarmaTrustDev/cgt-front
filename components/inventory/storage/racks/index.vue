<template>
  <div class="text-center">
    <div class="racks">
      <span v-for="(rack, index) in data" :key="index">
        <rack
          :portions="rack.portions"
          :counter="index + 1"
          :current-counter="currentCounter"
          :active-index="activeIndex"
          :autoSelect="autoSelects"
          @getRackPortion="getRackPortion"
        />
      </span>
    </div>
  </div>
</template>

<script>
import rack from '~/components/inventory/storage/racks/rack'
export default {
  components: { rack },
  props: { data: { type: Array, default: () => [{}] }, autoSelect: {type: Number} },
  data(){
    return{
      currentCounter:null,
      activeIndex:null,
      autoSelects:this.autoSelect
    }
  },
  methods: {
    getRackPortion(portion,index,counter,autoSelect) {
      this.autoSelects=autoSelect
      this.currentCounter=counter
      this.activeIndex=index
      this.$emit('getRackPortion', portion, this.autoSelects)
    },
  },
}
</script>
<style lang="scss" scoped>
.racks {
  width: 100%;
  max-width: 320px;
  margin: auto;
}
</style>
