<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :back="false"
  >
    <template slot="content">
      <div class="grey-card">
        <a-row :gutter="16">
          <a-col v-for="c in [1, 2, 3, 4]" :key="c" :span="8">
            <div class="client-hub-tile">
              <figure>
                <img
                  :src="
                    getImageUrl(
                      'web/inventory/storage/hub/clients/IMG-20220608-WA0003.png'
                    )
                  "
                />
                <figcaption></figcaption>
              </figure>

              <div class="icons">
                <span> <img :src="getImageUrl('web/icons/bill1.svg')" /></span>
                <span><img :src="getImageUrl('web/icons/inbox.svg')" /></span>
                <span> <img :src="getImageUrl('web/icons/stock.svg')" /></span>
              </div>

              <div class="list">
                <ul>
                  <li
                    v-for="task in tasks"
                    :key="task.id"
                    class="task-list-item clearfix"
                  >
                    <span class="date">{{ task.date }} </span>
                    <span class="title">{{ task.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import imagesHelper from '~/mixins/images-helper'
// import detail from '~/components/root/inventory/detail'
export default {
  components: { 'page-layout': PageLayout },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      tasks: [
        { id: 1, name: 'Store Sample', date: '14/06/2022' },
        { id: 2, name: 'Outbound Process', date: '17/06/2022' },
        { id: 3, name: 'Inbound Shipment', date: '11/08/2022' },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {},
  mixins: [imagesHelper],
}
</script>
