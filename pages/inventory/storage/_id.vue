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
import fridge from '~/components/inventory/fridge'
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
import TimeLine from '~/components/timeline'
import { isEmpty } from '~/services/Helpers'

const tube = {
  id: 2,
  active: true,
  name: '5A',
  steps: [
    {
      title: 'Jack Black',
      date: '9:00',
      by: 'Inbound Date',
      detail: '21 Feb 2022',
    },
    {
      title: ' Simon Smith',
      date: '9:30',
      by: 'Inbound Process',
      detail: '21 Feb 2022',
    },
    {
      title: 'Ahmed Salaam',
      date: '10:00',
      by: 'Storage',
      detail: '21 Feb 2022',
    },
    {
      title: 'Claire Jones',
      date: '14:00',
      by: 'Visual Check',
      detail: '28 Feb 2022',
    },
    {
      title: 'Dwayne Morgan',
      date: '15:00',
      by: 'Packaging Depot',
      detail: '19 April 2022',
    },
    {
      title: 'RT456',
      date: '16:00',
      by: 'Courier Pick Up',
      detail: '19 April 2022',
    },
  ],
}
const tube2 = {
  id: 3,
  active: false,
  name: '5A',
  steps: [
    {
      title: 'Jack Black',
      date: '9:00',
      by: 'Inbound Date',
      detail: '21 Feb 2022',
    },
    {
      title: ' Simon Smith',
      date: '9:30',
      by: 'Inbound Process',
      detail: '21 Feb 2022',
    },
    {
      title: 'Ahmed Salaam',
      date: '10:00',
      by: 'Storage',
      detail: '21 Feb 2022',
    },
    {
      title: 'Claire Jones',
      date: '14:00',
      by: 'Visual Check',
      detail: '28 Feb 2022',
    },
    {
      title: 'Dwayne Morgan',
      date: '15:00',
      by: 'Packaging Depot',
      detail: '19 April 2022',
    },
    {
      title: 'RT456',
      date: '16:00',
      by: 'Courier Pick Up',
      detail: '19 April 2022',
    },
  ],
}
const tube3 = {
  id: 3,
  active: false,
  name: '5A',
  steps: [
    {
      title: 'Jack Black',
      date: '9:00',
      by: 'Inbound Date',
      detail: '21 Feb 2022',
    },
    {
      title: ' Simon Smith',
      date: '9:30',
      by: 'Inbound Process',
      detail: '21 Feb 2022',
    },
    {
      title: 'Ahmed Salaam',
      date: '10:00',
      by: 'Storage',
      detail: '21 Feb 2022',
    },
    {
      title: 'Claire Jones',
      date: '14:00',
      by: 'Visual Check',
      detail: '28 Feb 2022',
    },
    {
      title: 'Dwayne Morgan',
      date: '15:00',
      by: 'Packaging Depot',
      detail: '19 April 2022',
    },
    {
      title: 'RT456',
      date: '16:00',
      by: 'Courier Pick Up',
      detail: '19 April 2022',
    },
  ],
}
const portion = {
  id: 1,
  color: 'red',
  active: true,
  trays: [
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
  ],
}
const portion2 = {
  id: 2,
  color: 'red',
  active: false,
  trays: [
    {
      tubes: [tube2, tube3, tube, tube2, tube, tube],
    },
    {
      tubes: [tube, tube2, tube, tube, tube, tube],
    },
    {
      tubes: [tube, tube, tube, tube, tube, tube],
    },
    {
      tubes: [tube, tube, tube, tube, tube, tube],
    },
    {
      tubes: [tube, tube, tube, tube, tube, tube],
    },
  ],
}
const portion3 = {
  id: 2,
  color: 'red',
  active: false,
  trays: [
    {
      tubes: [tube2, tube3, tube2, tube2, tube2, tube],
    },
    {
      tubes: [tube2, tube, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube2, tube2],
    },
    {
      tubes: [tube2, tube2, tube2, tube2, tube, tube],
    },
  ],
}
const rack = {
  id: 1,
  portions: [portion, portion2, portion3],
}
const rack2 = {
  id: 1,
  portions: [portion, portion2, portion, portion2],
}
const rack3 = {
  id: 1,
  portions: [portion, portion2, portion3, portion2],
}

const fridgeData = {
  name: 'Fridge Atara 001',
  location: 'Storage Suite 3, Germany - Cellfuse',
  racks: [rack, rack2, rack3, rack2, rack],
}
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
      fridgeData,
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
