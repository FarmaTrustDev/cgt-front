<template>
  <div>
    <a-tabs :active-key="activeTab" type="card" @change="callback">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
        <Process
          :collections="bag.collection"
          :bag-id="bag.puid"
          :bag-key-id="bag.id"
          :treatment="treatment"
          @fetchBags="fetchBags"
        />
        <div class="text-right mt-15">
          <!-- <a-button type="primary" @click="completeBag(bag)"
            >Complete Sample( #{{ bag.puid }})</a-button
          > -->
          <a-button
            v-if="!bag.isCollectionCompleted"
            type="primary"
            @click="completeBag(bag)"
            >{{translation.ComplThis_3_526}}</a-button
          >
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Process from '~/components/treatment/collections/bag/Process'

import { isEmpty } from '~/services/Utilities'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import notifications from '~/mixins/notifications'
export default {
  components: { Process },
  mixins: [notifications],
  props: {
    treatment: { required: true, type: Object },
    bags: { required: true, type: Array },
  },
  data() {
    return { activeTab: null, showCompleteBag: true,  }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch: {
    bags(newBags, oldVal) {
      // watch it
      // console.log(this.activeTab)
      if (newBags !== oldVal) {
        if (!isEmpty(newBags) && this.activeTab === null) {
          this.activeTab = newBags[0].id
          // console.log(this.activeTab)
        }
      }
    },
  },
  mounted() {
    this.setActiveTab()
  },
  methods: {
    setActiveTab() {
      if (!isEmpty(this.bags)) {
        this.activeTab = this.bags[0].id
      }
    },
    completeBag(bag) {
      if (this.validateCollectionComplete(bag)) {
        return this.error(`Confirm all collection steps `)
      }
      this.markComplete(bag)
    },
    markComplete(bag) {
      TreatmentBagServices.markCollectionComplete(bag.id).then((response) => {
        this.showCompleteBag = false
        this.fetchBags(bag.id)
      })
    },
    validateCollectionComplete(bags) {
      if (!isEmpty(bags.collection)) {
        // check if Treatment has bags
        return (
          bags.collection.filter((collection) => {
            // check if Bag has collection and all are completeBag
            return this.hasIncompleteCollection(collection)
          }).length > 0
        )
      }
      return true
    },
    // r
    hasIncompleteCollection(collection) {
      return !collection.isCollected
    },
    callback(key) {
      this.activeTab = key
    },
    fetchBags(bagKeyId) {
      this.$emit('fetchBags',bagKeyId)
      this.activeTab = bagKeyId
    },
  },
}
</script>
