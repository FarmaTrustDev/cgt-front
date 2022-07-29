<template>
  <div>
    <a-tabs :active-key="activeTab" type="card" @change="callback">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
        <Process
          :collections="bag.collection"
          :bag-id="bag.puid"
          @fetchBags="fetchBags"
        />
        <div class="text-right mt-15">
          <!-- <a-button type="primary" @click="completeBag(bag)"
            >Complete Sample( #{{ bag.puid }})</a-button
          > -->

          <a-button
            v-if="!bag.isCollectionCompleted && showCompleteBag"
            type="primary"
            @click="completeBag(bag)"
            >Complete this Sample</a-button
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
    return { activeTab: null, showCompleteBag: true }
  },
  watch: {
    bags(newBags, oldVal) {
      // watch it
      if (newBags !== oldVal) {
        if (!isEmpty(newBags)) {
          this.activeTab = newBags[0].id
        }
      }
    },
  },
  mounted() {},
  methods: {
    completeBag(bag) {
      if (this.validateCollectionComplete(bag)) {
        return this.error(`Mark all collection steps `)
      }
      this.markComplete(bag)
    },
    markComplete(bag) {
      TreatmentBagServices.markCollectionComplete(bag.id).then((response) => {
        this.showCompleteBag = false
        this.fetchBags()
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
    fetchBags() {
      this.$emit('fetchBags')
    },
  },
}
</script>
