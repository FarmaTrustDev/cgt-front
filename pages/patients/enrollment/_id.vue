<template>
  <PatientEnrollment />
</template>
<script>
export default {
  mounted() {
    console.log(this.$route)
    console.log(this.$route.params.id)
  },
}
</script>
