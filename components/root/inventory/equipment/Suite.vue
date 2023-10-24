<template>
  <div>
    <a-card :bordered="null" class="default-border-radius shadow" style="margin-bottom: -30px;">
      <a-tabs>
        <a-tab-pane v-if="data.id===1" key="1" class="display-inline-block border-bottom-none font-size-14" tab="Class B Suite">
          <!-- <a-tab-pane key="1" :tab="translation.ClassB_3_572"> -->
          <ImageHeading v-for="(c, index) in classB" :key="index" :detail="c">
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)" height="50px" width="40px"></span>
            </span>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </ImageHeading>
        </a-tab-pane>
            
        <a-tab-pane v-if="data.id===1" key="2" class="font-size-14" tab="Class C Suite">
          <ImageHeading
            v-for="(c, index) in classC"
            :key="index"
            :detail="c"
          >
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)" height="50px" width="40px"></span>
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
      <div v-if="data.id>1">
        <ImageHeading
            v-for="(c, index) in WithOutClass"
            :key="index"
            :detail="c"
          >
            <span slot="extra">
              <span><img :src="getImageUrl(c.img)" height="50px" width="40px"></span>
            </span></ImageHeading
          >
      </div>  
    </a-card>
  </div>
</template>
<script>
import ImageHeading from '~/components/cards/ImageHeading'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { ImageHeading },
  mixins: [imagesHelper],
  props: { data: { type: Object, default: () => ({}) } },
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
          heading: '2x Cobe 2991 Cell processing instrument',
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: '3x CliniMACS Prodigy instrument',
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
          heading: 'Weighing Scales (grams)',
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: 'PLaner Controlled rate freezer',
        },
        {
          img: 'web/inventory//Group-1000002115.svg',
          heading: 'Vacuum bag sealer',
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        {
          img: 'web/inventory//Group-1000002123.svg',
          heading: 'Liquid nitrogen Dewars',
        },
      ],
      WithOutClass: [
        {
          // img: 'Icons/kits.svg',
          img: 'web/inventory//Group-1000002115.svg',
          heading: 'Centrisart®  Centrifuge',
        },
        {
          img: 'web/inventory/Group-1000002123.svg',
          heading: 'Centrisart® A-14 — Micro-Centrifuge',
        },
        {
          img: 'web/inventory/AllPurposeCentrifuge.svg',
          heading: 'Centrisart® G-16 — All Purpose Centrifuge',
        },
        {
          img: 'web/inventory//CentrisartG-26C.svg',
          heading: 'Centrisart® G-26C',
        },
        // {
        //
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        {
          img: 'web/inventory//BenchtopFreezingPlatform.svg',
          heading: 'Celsius® S3 Benchtop Freezing Platform',
        },
        {
          img: 'web/inventory//PicusElectronicPipette.svg',
          heading: 'Picus® Electronic Pipette',
        },
        {
          img: 'web/inventory/Group-1000002117.svg',
          heading: 'Sartolab® Multistation - Hands-Free Cell Culture Filtration for Small Volumes',
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