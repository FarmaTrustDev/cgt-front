<template>
  <page-layout :create="false" :loading="loading" :bordered="false">
    <template slot="content">
      <div>
        <a-card :bordered="false" class="default-border-radius pb-15">
          <h2>Statistic</h2>

          <a-row class="grey-card">
            <a-col :span="2"> </a-col>
            <a-col :span="8">
              <treatmentStats />
            </a-col>
            <a-col :span="4"> </a-col>
            <a-col :span="8">
              <div><hospitalStats /></div>
            </a-col>
            <a-col :span="2"> </a-col>
          </a-row>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import treatmentStats from '~/components/statistics/treatment'
import hospitalStats from '~/components/statistics/hospital'
export default {
  components: { 'page-layout': PageLayout, treatmentStats, hospitalStats },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
}
</script>
