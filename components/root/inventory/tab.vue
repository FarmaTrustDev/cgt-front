<template>
  <div>
    <div class="mb-15 pr-15 clearfix">
      <h2 class="">
        <strong v-if="user.organizationTypeAlias != 'SMARTLAB'">Equipment</strong>
        <strong v-if="user.organizationTypeAlias == 'SMARTLAB'" class="">Equipment</strong>
      </h2>
      <a-row class="display-inline-block" :gutter="10">
        <a-col class="suit" :span="10">
          <suite :data="data" />
        </a-col>
        <a-col :span="2"></a-col>
        <a-col :span="11">
          <div>
            <a-card
              class="r-shadow mb-15"
              :bordered="false"
              title=""
            >
              <h1>
                <a-button type="link">{{
                  translation.ColdStora_2_588
                }}</a-button>
              </h1>
              <ImageHeading
                :detail="{
                  img: 'web/inventory/Group-1000002120.svg',
                  heading:
                    'Liquid nitrogen tanks (Planer 1411V and 320 models) -80 Freezers',
                }"
                :img-properties="{ width: '50px', height: '50px' }"
              >
              <span slot="extra">
              <span><img :src="getImageUrl('web/inventory/Group-1000002122.svg')"/></span>
            </span>
            </ImageHeading>
            </a-card>
          </div>
          <div class="">
            <a-card
              :bordered="false"
              class="r-shadow mb-15 default-border-radius"
            >
              <h4>
                <a-button type="link">Support Equipment</a-button>
              </h4>
              <span v-for="(cl, index) in outsideEquipment" :key="index">
                <ImageHeading
                  :img-properties="{ width: '50px', height: '50px' }"
                  class="mt-15"
                  :detail="cl"
                >
                <span slot="extra">
              <span><img :src="getImageUrl(cl.img)"></span>
            </span>
                </ImageHeading>
              </span>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import suite from '~/components/root/inventory/equipment/Suite'
import ImageHeading from '~/components/cards/ImageHeading'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { suite, ImageHeading },
  mixins:[imagesHelper],
  props: { data: { type: Object, default: () => ({}) } },
  data() {
    return {
      outsideEquipment: [
        {
          img: 'web/inventory/Group-1000002123.svg',
          heading: 'Phase–contrast microscope',
        },
        {
          img: 'web/inventory/Group-1000002124.svg',
          heading: 'CO2 incubator',
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