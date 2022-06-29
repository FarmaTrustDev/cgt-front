<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :back="false"
    title="Client Hubs"
  >
    <template slot="content">
      <div class="grey-card">
        
        <a-row :gutter="16">
          <a-col v-for="c in [6,1,2,3,4,5]" :key="c" :span="8">
            
            <div class="client-hub-tile">
              <figure>
                <img
                  :src="
                    getImageUrl(
                      'web/inventory/storage/hub/clients/'+c+'.png'
                    )
                  "
                  height="100px"
                  width="250px"
                />
                <figcaption></figcaption>
              </figure>
              
              <div class="icons">
                <span><a href="/inventory/clients/messages"><img :src="getImageUrl('web/icons/inbox.svg')" /></a></span>
                <span><a href="/inventory/clients/clients"> <img :src="getImageUrl('web/icons/stock.svg')" /></a></span>
                <span @click="goto(`status`)"> <img :src="getImageUrl('web/icons/bill1.svg')" /></span>
              </div>
              <div>Upcoming Tasks: </div>
              <div class="list">
                <ul>
                  <li
                    v-for="task in tasks"
                    :key="task.id"
                    class="task-list-item clearfix"
                  >
                    <span class="date">{{ task.date }} </span>
                    <span class="title"><a :href="task.url">{{ task.name }}</a></span>
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
import routeHelpers from '~/mixins/route-helpers'
// import detail from '~/components/root/inventory/detail'
export default {
  components: { 'page-layout': PageLayout },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      tasks: [
        { id: 1, name: 'Store Sample', date: '14/06/2022', url:'/inventory/storage/ColorFridge?inbound=true' },
        { id: 2, name: 'Outbound Process', date: '17/06/2022', url:'/inventory/treatment/outboundProcess/' },
        { id: 3, name: 'Inbound Shipment', date: '11/08/2022', url:'/inventory/treatment/process/' },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    clickToGo(url){
      this.goto(url)
    },
    gotoClient(){
      this.goto('/inventory/clients/clients')
    },    
  },
  mixins: [imagesHelper,routeHelpers],
}
</script>
