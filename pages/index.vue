<template>
  <div>
    <PagesHomeInOutBoundCapsule />
    <TreatmentsTable />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
