<template>
  <div>
    <a-tabs :active-key="activeTab" type="card" @change="callback">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
        <Process :collections="bag.collection" @fetchBags="fetchBags" />
        <a-button class="w-100" type="primary" @click="completeBag(bag)"
          >Complete All Bags</a-button
        >
      </a-tab-pane>
    </a-tabs>
    <!-- <a-button type="primary" @click="completeBag(bag)"
      >Save & Continue</a-button
    > -->
  </div>
</template>
<script>
import Process from '~/components/treatment/collections/bag/Process'
import { isEmpty } from '~/services/Utilities'
import notifications from '~/mixins/notifications'
export default {
  components: { Process },
  mixins: [notifications],
  props: {
    treatment: { required: true, type: Object },
    bags: { required: true, type: Array },
  },
  data() {
    return { activeTab: null }
  },
  mounted() {
    // phela tab active hojae ga
  },
  methods: {
    completeBag(bag) {
      if (this.validateCollectionComplete(bag)) {
        return this.error('Mark all collection steps')
      }
      this.markComplete(bag)
    },
    markComplete(bag) {
      console.log(bag)
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
