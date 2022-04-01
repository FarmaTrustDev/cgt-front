<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :back="false"
  >
    <template slot="content">
      <div class="grey-card">
        <a-card :bordered="false" class="default-border-radius">
          <h2>Statistic</h2>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { 'page-layout': PageLayout },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
}
</script>
