<template>
  <div>{{ treatment }}</div>
</template>
<script>
export default {
  props: {
    treatment: { type: Object, required: true },
  },
}
</script>
