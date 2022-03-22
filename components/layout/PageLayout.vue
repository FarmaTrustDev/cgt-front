<template>
  <a-card
    :loading="loading"
    :title="title"
    :bordered="bordered"
    class="plain-header-border"
  >
    <span slot="extra">
      <slot name="headerMenus" />
      <a-button v-if="create" type="primary" @click="gotoState('create')"
        >Create</a-button
      >
      <a-button v-if="back" type="primary" @click="goBack()">Back</a-button>
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
      default: true,
    },
    back: {
      type: Boolean,
      default: true,
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
