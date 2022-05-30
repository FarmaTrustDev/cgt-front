<template>
  <div>
    <a-card :bordered="false" class="default-border-radius pb-15">
      <h2>{{translation.Stati_1_19}}</h2>

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
<script>
import treatmentStats from '~/components/statistics/treatment'
import hospitalStats from '~/components/statistics/hospital'
export default {
  components: { treatmentStats, hospitalStats },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
}
</script>
