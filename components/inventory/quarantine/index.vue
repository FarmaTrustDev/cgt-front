<template>
  <div>
    <a-row :gutter="24">
      <a-col
        v-for="(consume, index) in consumables"
        :key="index"
        class="text-center"
        :span="8"
      >
        <card :data="consume" />
      </a-col>
    </a-row>
    <a-row class="mt-15" :gutter="24">
      <a-col :span="12">
        <TileCenter
          heading="Shelf Atara 001"
          footer="Storage Suite 3, Germany - Cellfuse"
        >
          <div slot="center" class="text-center">
            <racks :data="fridgeData.racks" @getRackPortion="getRackPortion" />
          </div>
        </TileCenter>
      </a-col>
      <a-col :span="12">
        <TileCenter
          heading=" Box Atara 001, Shelf 3 "
          footer="Storage Suite 3, Germany - Cellfuse"
        >
          <div slot="center" class="text-center">
            <Trays
              v-if="!isEmpty(trayData)"
              :trays="trayData"
              @getTube="getTube"
            />
            <a-empty v-else description=" select the rack" />
          </div> </TileCenter
      ></a-col>
    </a-row>
  </div>
</template>

<script>
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
import { fridgeData, consumables } from '~/services/Constant/DummyData'
import card from '~/components/root/inventory/consumables/Card'

import { isEmpty } from '~/services/Helpers'

export default {
  components: {
    racks,
    Trays,
    TileCenter,
    card,
  },
  data() {
    return {
      fridgeData,
      consumables,
      loading: false,
      steps: [
        // {
        //   title: 'Jack Black',
        //   date: '9:00',
        //   by: 'Inbound Date',
        //   detail: '21 Feb 2022',
        // },
        // {
        //   title: ' Simon Smith',
        //   date: '9:30',
        //   by: 'Inbound Process',
        //   detail: '21 Feb 2022',
        // },
        // {
        //   title: 'Ahmed Salaam',
        //   date: '10:00',
        //   by: 'Storage',
        //   detail: '21 Feb 2022',
        // },
        // {
        //   title: 'Claire Jones',
        //   date: '14:00',
        //   by: 'Visual Check',
        //   detail: '28 Feb 2022',
        // },
        // {
        //   title: 'Dwayne Morgan',
        //   date: '15:00',
        //   by: 'Packaging Depot',
        //   detail: '19 April 2022',
        // },
        // {
        //   title: 'RT456',
        //   date: '16:00',
        //   by: 'Courier Pick Up',
        //   detail: '19 April 2022',
        // },
      ],
      tubes: [],
      trayData: [],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    isEmpty,
    getRackPortion(portions) {
      this.trayData = portions.trays
    },
    getTube(tube) {
      this.steps = tube.steps
    },
  },
}
</script>
