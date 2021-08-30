<template>
  <div>
    <a-row :gutter="12" class="grey-card">
      <a-col :span="12">
        <CardsCapsule title="Scan" description="Inbound Sample" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
