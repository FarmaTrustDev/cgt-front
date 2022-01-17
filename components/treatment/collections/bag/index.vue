<template>
  <div>
    <a-tabs :active-key="activeTab" type="card" @change="callback">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
        <Process :collections="bag.collection" @fetchBags="fetchBags" />
        <a-button type="primary" @click="completeBag(bag)"
          >Complete All Bags</a-button
        >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Process from '~/components/treatment/collections/bag/Process'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { Process },
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
      this.validateCollectionComplete(bag)
    },
    validateCollectionComplete(bags) {
      if (!isEmpty(bags)) {
        // check if Treatment has bags
        return bags.filter((bag) => {
          // check if Bag has collection and all are completeBag
          return this.hasIncompleteCollection(bag)
        })
      }
    },
    hasIncompleteCollection(bag) {
      let isCompleted = true
      if (!isEmpty(bag.collection)) {
        const filterValue = bag.collection.filter(
          (collection) => !collection.isCollected
        )
        if (filterValue.length > 0) {
          this.activeTab = bag.id
          isCompleted = false
        }
      }
      return isCompleted
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
