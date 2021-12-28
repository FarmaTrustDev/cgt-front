<template>
  <a-table
    :loading="loading"
    :columns="columns"
    :pagination="pagination"
    :data-source="data"
  >
    <span slot="action" slot-scope="text, record">
      <a-button type="link" @click="goto(`${actionLink}/${record.globalId}`)">
        <a-icon type="edit" />
      </a-button>
    </span>
    <span slot="nameTags" slot-scope="tags">
      <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
    </span>
  </a-table>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'

export default {
  mixins: [routeHelpers, notifications],
  props: {
    columns: { type: Array, default: () => [] },
    // data: { type: Array, default: () => [] },
    pagination: { type: Boolean, default: false },
    actionLink: { type: String, default: '' },
    apiService: { type: Object, required: true },
    params: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch(params = {}) {
      this.loading = true
      this.apiService
        .get(this.params)
        .then((response) => {
          this.$emit('afterFetch', response)
          this.data = response.data
        })
        .catch(this.error)
        .finally(() => {
          this.$emit('finally')
          this.loading = false
        })
    },
  },
}
</script>
