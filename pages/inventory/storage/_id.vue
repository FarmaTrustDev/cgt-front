<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
  >
    <div slot="content">
      <a-row>
        <a-col :span="8"><fridge /></a-col>
        <a-col :span="8"><Shelf /></a-col>
        <a-col :span="8"><TestTube /></a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import fridge from '~/components/inventory/fridge'
import Shelf from '~/components/inventory/assets/Shelf'
import TestTube from '~/components/inventory/assets/TestTube'
export default {
  components: { PageLayout, Shelf, TestTube, fridge },
  data() {
    return {}
  },
}
</script>
