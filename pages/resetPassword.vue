<template>
  <div class="container min-vh-100">
    <AuthResetPassword />
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'no-auth',
}
</script>
<style scoped>
.min-vh-100 {
  min-height: 100%;
}
</style>
