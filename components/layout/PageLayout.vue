<template>
  <a-card :loading="loading" :title="title" :bordered="bordered">
    <span slot="extra">
      <a-button v-if="create" type="primary" @click="gotoState('create')"
        >Create</a-button
      >
      <a-button type="primary" @click="goBack()">Back</a-button>
      <slot name="extra"></slot>
    </span>
    <slot name="content" />
  </a-card>
</template>

<script>
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [routeHelpers],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    bordered: {
        type: Boolean,
        default: true
    },
    create: { type: Boolean, default: true },
  },
  methods: {
    gotoState(id, query = {}) {
      this.goto(`${this.$route.path}/${id}`, query)
    },
  },
}
</script>
