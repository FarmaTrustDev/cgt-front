<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.SmartStore_2_548"
    class="specific-storage container Component_body"
    style="margin-top: -25px;"
  >
    <!--  -->
    <template slot="content">

      <inventory />
      <a-card :bordered="false" class="default-border-radius">
        <h2 slot="title" style="margin-top: -10px;"><strong>Consumables</strong></h2>
        <a-row :gutter="16">
          <consumables />
          <!-- <a-col :span="2"> </a-col>
          <a-col :span="20"> </a-col>
          <a-col :span="2"> </a-col> -->
        </a-row>
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
