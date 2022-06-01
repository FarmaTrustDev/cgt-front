<template>
  <div>
    <div class="img"><fridge :color="color" /></div>
    <div class="location">Storage Suite 3, Germany - Cellfuse</div>
    <div class="title">Fridge Atara 001</div>
  </div>
</template>
<script>
import fridge from '~/components/inventory/fridge'
export default {
  components: { fridge },
  data() {
    return {
      color: '#1943AE',
    }
  },
}
</script>
