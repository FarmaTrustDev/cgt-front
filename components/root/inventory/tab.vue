<template>
  <div>
    <div class="mb-15 pr-15 clearfix">
      <h2 class="mt-10">
        <strong v-if="user.organizationTypeAlias != 'SMARTLAB'">Equipment</strong>
        <strong v-if="user.organizationTypeAlias == 'SMARTLAB'" class="">Equipment</strong>
      </h2>
      <a-row class="display-inline-block" :gutter="10" style="margin-bottom: -20px;">
        <a-col class="suit" :span="8" :gutter="10" style="margin-top: -5px;">
          <suite :data="data" />
        </a-col>
        <a-col :span="7" :gutter="10" style="margin-top: -5px;">
          <div>
            <a-card
              class="default-border-radius r-shadow"
              :bordered="false"
              title=""
              style="margin-bottom: 5px; border-radius: 10px; height: 245px;"
            >
              <h1 style="margin-top: -10px;">
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
                :img-properties="{ width: '40px', height: '50px' }"
                
              >
              <span slot="extra">
              <span><img :src="getImageUrl('web/inventory/Group-1000002122.svg')" @click="openViewModal" height="50px" width="40px" style="margin-top: 8px;" /></span>
            </span>
            </ImageHeading>
            <a-modal :visible="showModal" :title="translation.Docum_1_507">
              <img class="img-responsive" :src="getImageUrl(qrUrl)" />
              <template slot="footer">
                <a-button @click="handleModal(false)">{{translation.cance_1_296}}</a-button>
                <a-button @click="printWindow()">Print</a-button>
              </template>
            </a-modal>
            </a-card>
          </div>
        </a-col>
        <a-col :span="8" :gutter="10" style="margin-top: -5px;">
          <div>
            <a-card
              class="default-border-radius r-shadow"
              :bordered="false"
              title=""
              style="border-radius: 10px; height: 245px;"
            >
              
              <h4 style="margin-top: -12px;">
                <a-button type="link">Support Equipment</a-button>
              </h4>
              <span v-for="(cl, index) in outsideEquipment" :key="index">
                <TabImageHeading
                  :img-properties="{ width: '40px', height: '50px' }"
                  class="mt-5"
                  :detail="cl"
                >
                <span slot="extra">
              <span><img :src="getImageUrl(cl.img)" height="50px" width="40px" style="margin-top: 2px;"></span>
            </span>
                </TabImageHeading>
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
import TabImageHeading from '~/components/cards/TabImageHeading'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { suite, ImageHeading, TabImageHeading },
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
      showModal: false,
      qrUrl: 'web/inventory/storage/coldStorage.jpeg',
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
  methods:{
    handleModal(show) {
      this.showModal = show
    },
    openViewModal(id) {
      this.showModal = true
    },
  }
}
</script>