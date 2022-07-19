<template>
  <div class="container min-vh-100">
    <AuthResetPassword />
  </div>
</template>

<script>
import AuthResetPassword from "~/components/auth/ResetPassword.vue";
export default {
  layout: 'auth',
  middleware: 'no-auth',
  components: { AuthResetPassword }
}
</script>
<style scoped>
.min-vh-100 {
  min-height: 100%;
}
</style>
