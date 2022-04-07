<template>
  <div>
    <a-row :gutter="80" class="flex-child-container">
      <a-col v-for="consume in consumables" :key="consume.heading" :span="6">
        <card :data="consume" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import card from '~/components/root/inventory/consumables/Card'
const color = {
  blue: '#2359e8',
  red: '#ff0909',
  yellow: '#ffbf00',
}
export default {
  components: { card },
  data() {
    return {
      consumables: [
        {
          threshold: 46,
          heading: 'Consumables HAS (GIBCO MEM)',
          color: color.red,
        },
        {
          threshold: 50,
          heading: ' Cells stacks  (MSC culture)',
          color: color.red,
        },
        {
          threshold: 90,
          heading: ' Platelet lysate ',
          color: color.blue,
        },
        {
          threshold: 46,
          heading: ' Pipette A size 1',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: ' Platelet lysate (luer lock)',
          color: '#ff0909',
        },
        {
          threshold: 50,
          heading: '(luer lock) (CD34, CD45)',
          color: '#ff0909',
        },
        {
          threshold: 90,
          heading: '(CD34, CD45) B',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: 'BSA',
          color: '#2359e8',
        },

        {
          threshold: 46,
          heading: ' Pipette Tip A ',
          color: '#ff0909',
        },
        {
          threshold: 50,
          heading: ' Pippette Ti',
          color: '#ff0909',
        },
        {
          threshold: 90,
          heading: ' Consumables 123 ',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: 'Consumables 648',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: 'Consumables 648 ',
          color: '#2359e8',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.flex-child-container {
  display: flex;
  flex-flow: wrap;
}
</style>
