<template>
  <div>
    <a-card :bordered="null" class="default-border-radius shadow">
      <a-tabs>
        <a-tab-pane key="1" class="display-inline-block border-bottom-none font-size-18" tab="Class B Suite">
          <!-- <a-tab-pane key="1" :tab="translation.ClassB_3_572"> -->
          <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)"></span>
            </span>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </ImageHeading>
        </a-tab-pane>
            
        <a-tab-pane key="2" class="font-size-18" tab="Class C Suite">
          <ImageHeading
            v-for="(c, index) in classC"
            :key="index"
            :detail="c"
          >
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)"></span>
            </span></ImageHeading
          >
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
import ImageHeading from '~/components/cards/ImageHeading'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { ImageHeading },
  mixins: [imagesHelper],
  data() {
    return {
      classB: [
        {
          // img: 'Icons/kits.svg',
          img: 'web/inventory/Group-1000002120.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        // {
        //   img: 'web/inventory//Group-1000002115.svg',
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
      ],
      classC: [
        {
          // img: 'Icons/kits.svg',
          img: 'web/inventory/Group-1000002120.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: `${this.$store.getters.getTranslation['1xClass_10_574']}`,
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        {
          img: 'web/inventory//Group-1000002123.svg',
          heading: '1x Class II cabinets, Grade A in Grade B background',
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
