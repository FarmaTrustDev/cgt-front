<template>
  <a-card :loading="loading" :bordered="null" class="plain-header-border">
    <span slot="title" class="page-title">{{ title }}</span>
    <span slot="extra">
      <slot name="headerMenus" />
      <a-button v-if="create" type="primary" @click="gotoState('create')">{{translation.Creat_1_123}}</a-button>
      <a-button v-if="back" type="primary" class="mr-10 btn-back" @click="goBack()">{{translation.Back_1_538}}</a-button>
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    gotoState(id, query = {}) {
      this.goto(`${this.$route.path}/${id}`, query)
    },
  }
}
</script>
<style scoped>
.btn-back {
  background: #ececec;
  border: transparent;
  color: #000;
}
</style>