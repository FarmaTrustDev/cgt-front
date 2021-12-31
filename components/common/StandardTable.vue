<template>
  <a-table
    :loading="loading"
    :columns="columns"
    :pagination="pagination"
    :data-source="data"
  >


    <span slot="treatment_status" slot-scope="text, record">
      {{text}}
      <div class="patient-timeline">
        <a class="btn btn-timeline-success btn-icon-sm" href="">Screening</a>
        <span class="sep-line-success"></span>
        <a class="btn btn-timeline-success btn-icon-sm" href="">Scheduling</a>
        <span class="sep-line-disabled"></span> 
        <a class="btn btn-outline-secondary disabled">Collection</a>
        <!-- <span class="sep-line-disabled"></span> 
        <a class="btn btn-outline-secondary disabled">Shipment</a>
        <span class="sep-line-disabled"></span> 
        <a class="btn btn-outline-secondary disabled">After care</a> -->
        <span class="ml-0 line"></span> <a class="link ml-2 viewBtn  p-15  btn-secondry" :href="`${actionLink}/${record.globalId}`">View</a>
      </div>
    </span>


    <span slot="action" slot-scope="text, record">
      <a-dropdown :trigger="['click']">
        <a-button class="action-button" @click="e => e.preventDefault()">
          <b><a-icon type="more" /></b>
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a :href="`${actionLink}/${record.globalId}`">Open Ticket</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="http://www.taobao.com/">Add New Treatment</a>
          </a-menu-item>
          <a-menu-item key="3"> Hide Patient </a-menu-item>
        </a-menu>
      </a-dropdown>  
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
