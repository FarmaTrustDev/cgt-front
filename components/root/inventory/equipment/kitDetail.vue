<template>
    <div>
      <a-card :bordered="null" class="default-border-radius shadow" style="margin-bottom: -5px;">
        <a-tabs>
          <a-tab-pane key="1" class="display-inline-block border-bottom-none font-size-14" tab="All" style="margin-top: -10px; margin-bottom: -30px;">
            <!-- <a-tab-pane key="1" :tab="translation.ClassB_3_572"> -->
            <ImageHeading 
                v-for="(c, index) in classAll" 
                :key="index+'A'" 
                :detail="c"
            >
            
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)" height="50px" width="40px" style="margin-top: 2px;"></span>
              </span>
            
              <!-- :img-properties="{ width: '50px', height: '50px' }" -->
            </ImageHeading>
          </a-tab-pane>
          <a-tab-pane v-if="tabId===1 || tabId===3" key="2" class="display-inline-block border-bottom-none font-size-18" tab="Kit A">
            <!-- <a-tab-pane key="1" :tab="translation.ClassB_3_572"> -->
            <ImageHeading 
                v-for="(c, index) in classA" 
                :key="index+'A'" 
                :detail="c"
            >
            
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)" height="50px" width="40px" style="margin-top: 3px;"></span>
              </span>
            
              <!-- :img-properties="{ width: '50px', height: '50px' }" -->
            </ImageHeading>
          </a-tab-pane>
              
          <a-tab-pane v-if="tabId===1" key="3" class="display-inline-block border-bottom-none font-size-18" tab="Kit B">
            <ImageHeading
              v-for="(c, index) in classB"
              :key="index+'B'"
              :detail="c"
            >
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)" height="50px" width="40px"></span>
              </span>
            </ImageHeading>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </a-tab-pane>
          <a-tab-pane v-if="tabId===1 || tabId===4" key="4" class="display-inline-block border-bottom-none font-size-18" tab="Kit C">
            <ImageHeading
              v-for="(c, index) in classC"
              :key="index+'C'"
              :detail="c"
            >
              <span slot="extra">
                <span><img :src="getImageUrl(c.img)" height="50px" width="40px"></span>
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
    props: { tabId: { type: Number } },
    data() {
      return {
        classAll: [
          {
            img: 'web/inventory//label.svg',
            heading: 'Labels',
            qty: 1000
          },
          
          {
            img: 'web/inventory/gloves.svg',
            heading: 'Gloves',
            qty: 500
          },
          {
            img: 'web/inventory//container.svg',
            heading: 'Containers',
            qty: 910
          },
          {
            img: 'web/inventory//vials.svg',
            heading: 'Vials',
            qty: 990
          },
          {
            img: 'web/inventory//liquid.svg',
            heading: 'Liquid Bags',
            qty: 450
          },
          {
            // img: 'Icons/kits.svg',
            img: 'web/inventory/tubes.svg',
            heading: 'Tubes',
            qty: 950
          },
          {
            img: 'web/inventory//needles.svg',
            heading: 'Needles',
            qty: 1200
          },
          {
            img: 'web/inventory//trocars.svg',
            heading: 'Trocars',
            qty: 450
          },
          {
            img: 'web/inventory//needle_holder.svg',
            heading: 'Needle holders',
            qty: 990
          },
          {
            img: 'web/inventory//masks.svg',
            heading: 'Masks',
            qty: 200
          },
          {
            img: 'web/inventory//antiseptic.svg',
            heading: 'Antiseptic wipes',
            qty: 50
          },
          {
            img: 'web/inventory//cotton.svg',
            heading: 'Cotton swabs',
            qty: 500
          },
         
        ],
        classA: [
        
          {
            img: 'web/inventory/gloves.svg',
            heading: 'Gloves',
            qty: 300
          },
          {
            img: 'web/inventory//container.svg',
            heading: 'Containers',
            qty: 120
          },
          {
            img: 'web/inventory//vials.svg',
            heading: 'Vials',
            qty: 150
          },
          {
            img: 'web/inventory//liquid.svg',
            heading: 'Liquid Bags',
            qty: 120
          },
          
          {
            img: 'web/inventory//needles.svg',
            heading: 'Needles',
            qty: 200
          },
          
          {
            img: 'web/inventory//needle_holder.svg',
            heading: 'Needle holders',
            qty: 500
          },
          {
            img: 'web/inventory//masks.svg',
            heading: 'Masks',
            qty: 300
          },
        ],
        classB: [
        
          {
            img: 'web/inventory/gloves.svg',
            heading: 'Gloves',
            qty: 250
          },
          {
            img: 'web/inventory//container.svg',
            heading: 'Containers',
            qty: 300
          },
          
          {
            img: 'web/inventory//liquid.svg',
            heading: 'Liquid Bags',
            qty: 450
          },
          {
            img: 'web/inventory//label.svg',
            heading: 'Labels',
            qty: 750
          },
          
          {
            img: 'web/inventory//trocars.svg',
            heading: 'Trocars',
            qty: 450
          },
          
          {
            img: 'web/inventory//masks.svg',
            heading: 'Masks',
            qty: 300
          },
        ],
        classC: [
        
          {
            img: 'web/inventory/gloves.svg',
            heading: 'Gloves',
            qty: 500
          },
          
          {
            img: 'web/inventory//vials.svg',
            heading: 'Vials',
            qty: 600
          },
          
          {
            img: 'web/inventory//label.svg',
            heading: 'Labels',
            qty: 500
          },
          {
            img: 'web/inventory//needles.svg',
            heading: 'Needles',
            qty: 500
          },
          
          {
            img: 'web/inventory//needle_holder.svg',
            heading: 'Needle holders',
            qty: 50
          },
          
          {
            img: 'web/inventory//antiseptic.svg',
            heading: 'Antiseptic wipes',
            qty: 300
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
  <style scoped>
  .ant-tabs-tab {
    width: 150px; /* Set the desired width for each tab heading */
  }
  </style>
  