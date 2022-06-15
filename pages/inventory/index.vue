<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.SmartStore_2_548"
    class="specific-storage"
  >
    <template slot="content">
      <inventory />
      <a-card :bordered="false" class="default-border-radius">
        <h2 slot="title">Components</h2>
        <consumables />
      </a-card>
    </template>
  </page-layout>
</template>
<script>
import inventory from '~/components/root/inventory'
import consumables from '~/components/root/inventory/consumables'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { 'page-layout': PageLayout, inventory, consumables },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {},
}
</script>
