<template>
    <div>
      <a-card :bordered="null" class="default-border-radius shadow">
        <a-tabs>
          <a-tab-pane key="1" class="display-inline-block border-bottom-none font-size-18" tab="Kit A">
            <!-- <a-tab-pane key="1" :tab="translation.ClassB_3_572"> -->
            <ImageHeading 
                v-for="(c, index) in classA" 
                :key="index+'A'" 
                :detail="c"
            >
            
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)"></span>
              </span>
            
              <!-- :img-properties="{ width: '50px', height: '50px' }" -->
            </ImageHeading>
          </a-tab-pane>
              
          <a-tab-pane key="2" class="display-inline-block border-bottom-none font-size-18" tab="Kit B">
            <ImageHeading
              v-for="(c, index) in classB"
              :key="index+'B'"
              :detail="c"
            >
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)"></span>
              </span>
            </ImageHeading>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </a-tab-pane>
          <a-tab-pane key="3" class="display-inline-block border-bottom-none font-size-18" tab="Kit C">
            <ImageHeading
              v-for="(c, index) in classC"
              :key="index+'C'"
              :detail="c"
            >
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)"></span>
              </span>
            </ImageHeading>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </a-tab-pane>
          <!-- <a-tab-pane
            key="3"
            class="display-inline-block border-bottom-none border-bottom-line"
            tab="Cell Collection Kit A"
          >
            <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
              <span slot="extra">
                <span class="count-bar suite-pg">70</span>
              </span></ImageHeading
            ></a-tab-pane
          > -->
          <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          <!-- <a-tab-pane key="4" class="border-bottom-none border-bottom-line" tab="Cell Collection Kit B">
            <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
              
              <span slot="extra">
                <span class="count-bar suite-pg">98</span>
              </span>
            </ImageHeading></a-tab-pane
          > -->
          <!-- <a-tab-pane key="2" :tab="translation.ClassC_3_570">
            <ImageHeading class="mt-15" :detail="{ img: '', heading: '' }"
          /></a-tab-pane> -->
        </a-tabs>
      </a-card>
    </div>
  </template>
  <script>
  import ImageHeading from '~/components/cards/KitImageHeading'
  import imagesHelper from '~/mixins/images-helper'
  export default {
    components: { ImageHeading },
    mixins: [imagesHelper],
    data() {
      return {
        classA: [
          {
            // img: 'Icons/kits.svg',
            img: 'web/inventory/Group-masks.svg',
            heading: 'Masks',
            qty: 7
          },
          {
            img: 'web/inventory/Group-plasters.svg',
            heading: 'Plasters',
            qty: 15
          },
          {
            img: 'web/inventory//Group-needles.svg',
            heading: 'Needles',
            qty: 10
          },
          {
            img: 'web/inventory//Group-antiseptic.svg',
            heading: 'Antiseptic wipes',
            qty: 50
          },
          {
            img: 'web/inventory//Group-cotton.svg',
            heading: 'Cotton swabs',
            qty: 30
          },
        ],
        classB: [
        {
            // img: 'Icons/kits.svg',
            img: 'web/inventory/Group-masks.svg',
            heading: 'Masks',
            qty: 7
          },
          {
            img: 'web/inventory/Group-plasters.svg',
            heading: 'Plasters',
            qty: 15
          },
          {
            img: 'web/inventory//Group-needles.svg',
            heading: 'Needles',
            qty: 10
          },
          {
            img: 'web/inventory//Group-antiseptic.svg',
            heading: 'Antiseptic wipes',
            qty: 50
          },
          {
            img: 'web/inventory//Group-cotton.svg',
            heading: 'Cotton swabs',
            qty: 30
          },
        ],
        classC: [
        {
            // img: 'Icons/kits.svg',
            img: 'web/inventory/Group-masks.svg',
            heading: 'Masks',
            qty: 7
          },
          {
            img: 'web/inventory/Group-plasters.svg',
            heading: 'Plasters',
            qty: 15
          },
          {
            img: 'web/inventory//Group-needles.svg',
            heading: 'Needles',
            qty: 10
          },
          {
            img: 'web/inventory//Group-antiseptic.svg',
            heading: 'Antiseptic wipes',
            qty: 50
          },
          {
            img: 'web/inventory//Group-cotton.svg',
            heading: 'Cotton swabs',
            qty: 30
          },
        ],
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  }
  </script>
  