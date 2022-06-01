<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
  >
    <div slot="content">
      <div class="w-800 margin-auto">
        <a-row :gutter="16">
          <a-col v-for="storage in storages" :key="storage.id" :span="6">
            <Tile :storage="storage" />
          </a-col>
        </a-row>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { PageLayout },
  data() {
    return {}
  },
}
</script>
