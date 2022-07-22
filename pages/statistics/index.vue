<template>
  <div>
    <div class="page-header clearfix">
    <div class="page-title ml-6">{{translation.Stati_1_19}}</div>
    </div>
    <a-card :bordered="false" class="grey-card">
        <a-col :span="11" class="mtminus-6">
          <treatmentStats />
        </a-col>
        <a-col :span="2"></a-col>
        <a-col :span="11" class="mtminus-5">
          <hospitalStats />
        </a-col>
    </a-card>
  </div>
</template>
<script>
import treatmentStats from '~/components/statistics/treatment'
import hospitalStats from '~/components/statistics/hospital'
export default {
  components: { treatmentStats, hospitalStats },
  data() {
    return {
      loading: false,
      organizationType:`${this.$store.getters.getUser}`,
    }
  },
  methods: {},
  computed:{
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
}
</script>
