<template>
  <page-layout :loading="loading" title="Support Detail">
    <template slot="content">
      <div class="grey-card">
        <a-row :gutter="56">
          <a-col :span="12">
            <Detail />
          </a-col>
          <a-col :span="12">
            <a-card class="default-border-radius"> <Comment /> </a-card
          ></a-col>
        </a-row>
      </div> </template
  ></page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import Detail from '~/components/support/detail/index'
import Comment from '~/components/support/detail/Comment'
export default {
  components: { PageLayout, Detail, Comment },
  data() {
    return { loading: false }
  },
}
</script>
