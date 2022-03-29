<template>
  <div>
    <a-tabs :active-key="activeTab" type="card" @change="onTabChange">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid"
        ><Steps class="view-screen" :bag="bag" :treatment="treatment"
      /></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import Steps from '~/components/treatment/view/Steps'

export default {
  components: { Steps },
  props: {
    treatment: { required: true, type: Object },
    // bags: { required: true, type: Object },
  },
  data() {
    return { activeTab: null, showCompleteBag: true, bags: null }
  },
  mounted() {
    this.fetchBags()
  },
  methods: {
    fetchBags() {
      TreatmentBagServices.get({ treatmentId: this.treatment.id }).then(
        (bags) => {
          this.bags = bags.data
        }
      )
    },
    onTabChange(bagId) {
      this.activeTab = bagId
    },
  },
}
</script>
