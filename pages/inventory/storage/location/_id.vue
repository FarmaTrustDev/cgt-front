<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.StoraServi_2_532"
    class="specific-storage"
  >
    <div slot="content" class="w-1200 margin-auto">
      <a-row>
        <a-col class="mb-15" :span="24">
          <detail />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col v-if="false" :span="8">
          <TileCenter
            heading="Freezer Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <fridge style="zoom: 2.5" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="12">
          <TileCenter
            heading="Shelf Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <racks
                :data="fridgeData.racks"
                @getRackPortion="getRackPortion"
              />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="12">
          <TileCenter
            heading=" Box Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <Trays
                v-if="!isEmpty(trayData)"
                :trays="trayData"
                :autoSelect="autoSelect"
                @getTube="getTube"
              />
              <a-empty v-else description=" select the rack" />
            </div> </TileCenter
        ></a-col>
      </a-row>

      <!-- 
        title="Provenance Data - Asset DEC123" -->
      <a-card :bordered="false">
        <div class="view-screen">
          <span v-if="!isEmpty(steps)">
            <h2 slot="title" class="pad-bottom">
              Provenance Data - Asset DEC123
            </h2>
            <TimeLine :steps="steps" />
          </span>
          <a-empty v-else description="No tube selected" />
        </div>
      </a-card>
    </div>
  </page-layout>
</template>

<script>
import detail from '~/components/root/inventory/detail'
import PageLayout from '~/components/layout/PageLayout'
import fridge from '~/components/inventory/freezers/Fridge'
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
import TimeLine from '~/components/timeline'
import { isEmpty } from '~/services/Helpers'
import { fridgeDataStatic } from '~/services/Constant/DummyData'

/// The code on the page is total no tolerated
export default {
  components: {
    PageLayout,
    racks,
    Trays,
    fridge,
    TileCenter,
    TimeLine,
    detail,
  },
  data() {
    return {
      fridgeData: fridgeDataStatic,
      loading: false,
      steps: [],
      tubes: [],
      trayData: [],
      autoSelect:null,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    const m = this.getRackPortion
    const g = this.getTube
    setTimeout(function () {
      m()
      g()
    }, 100)
  },
  methods: {
    isEmpty,
    getRackPortion(portions,autoSelect) {
      // console.log(autoSelect)
      this.autoSelect=autoSelect
      if (!isEmpty(this.fridgeData.racks[0])) {
        this.trayData = this.fridgeData.racks[0].portions[0].trays
      }
    },
    getTube(tube) {
      this.steps = this.fridgeData.racks[0].portions[0].trays[0].tubes[0].steps
    },
  },
}
</script>
