<template>
    <div>
    <a-row>
      <a-col :span="24">
        <detail class="" :data="data.description" />
        <br />
      </a-col>
    </a-row>
      <div class="mb-15 pr-15 clearfix">
        <h2 class="">
          <strong v-if="user.organizationTypeAlias != 'SMARTLAB'">Collection Kits</strong>
          <strong v-if="user.organizationTypeAlias == 'SMARTLAB'" class="">Collection Kits</strong>
        </h2>
        <a-row class="display-inline-block" :gutter="10">
          <a-col class="suit" :span="23">
            <kitDetail :tabId="data.id" />
          </a-col>
          
        </a-row>
      </div>
    </div>
  </template>
  <script>
  import detail from '~/components/root/inventory/detail'
  import kitDetail from '~/components/root/inventory/equipment/kitDetail'
  // import ImageHeading from '~/components/cards/ImageHeading'
  import imagesHelper from '~/mixins/images-helper'
  export default {
    components: { detail, kitDetail },
    mixins:[imagesHelper],
    props: { 
      data: { type: Object, default: () => ({}) },
    },
    data() {
      return {
        outsideEquipment: [
          {
            img: 'web/inventory/Group-1000002123.svg',
            heading: '1x Class II cabinets, Grade A in Grade B background',
          },
          {
            img: 'web/inventory/Group-1000002124.svg',
            heading: '1x Class II cabinets, Grade A in Grade B background',
          },
        ],
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  }
  </script>
  