<template>
  <div>
    <div class="page-header clearfix">
    <h3 class="page-title pl-5 float-left" style="margin-left:8%">{{translation.Stati_1_19}}</h3>
    </div>
    <a-card :bordered="false" class="default-border-radius pb-15" style="width: 80%; margin-left:10%">

      <a-row class="grey-card">
        <a-col :span="1"> </a-col>
        <a-col :span="10" style="margin-bottom:40px;">
          <treatmentStats />
        </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="10" style="margin-top:20px;">
          <hospitalStats />
        </a-col>
        <a-col :span="1"></a-col>
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
