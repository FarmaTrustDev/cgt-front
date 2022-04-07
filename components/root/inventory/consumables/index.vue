<template>
  <div>
    <a-row :gutter="80">
      <a-col :span="6"> <card /></a-col>
      <a-col :span="6"> <card /></a-col>
      <a-col :span="6"> <card /></a-col>
      <a-col :span="6"> <card /></a-col>
    </a-row>
  </div>
</template>
<script>
import card from '~/components/root/inventory/consumables/Card.vue'
export default {
  components: { card },
}
</script>
