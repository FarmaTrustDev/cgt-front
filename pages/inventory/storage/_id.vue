<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
    class="specific-storage"
  >
    <div slot="content" class="w-1200 margin-auto">
      <a-row>
        <a-col class="mb-15" :span="24">
          <detail />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <TileCenter
            heading="Freezer Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <fridge style="zoom: 2.5" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="8">
          <TileCenter
            heading="Shelf Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <racks :data="fridgeData.racks" @getRack="getRack" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="8">
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

      <a-card
        :bordered="false"
        title="Provenance Data - Asset DEC123"
      >
        <div class="view-screen">
          <span v-if="!isEmpty(steps)">
            <h2 slot="title">Provenance Data - Platelet Lycate Asset DEC123</h2>
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
      date: 26.33,
      by: 'Received Date',
      detail: '21 Feb 2022',
    },
    {
      title: ' Simon Smith',
      date: 26.33,
      by: 'Opened',
      detail: '23 March 2022',
    },
    {
      title: 'Ahmed Salaam',
      date: 26.33,
      by: 'Opened',
      detail: '15 April 2022',
    },
    {
      title: 'Claire Jones',
      date: 26.33,
      by: 'Received Date',
      detail: '19 April 2022',
    },
    {
      title: 'Dwayne Morgan',
      date: 26.33,
      by: 'Packaging Depot',
      detail: '19 April 2022',
    },
    {
      title: 'RT456',
      date: 26.33,
      by: 'Courier Pick Up',
      detail: '19 April 2022',
    },
  ],
}

const rack = {
  id: 1,
  trays: [
    {
      tubes: [tube, tube, tube, tube, tube, tube],
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
    {
      tubes: [tube, tube, tube, tube, tube, tube],
    },
    {
      tubes: [tube, tube, tube, tube, tube, tube],
    },
  ],
}
const fridgeData = {
  name: 'Fridge Atara 001',
  location: 'Storage Suite 3, Germany - Cellfuse',
  racks: [rack, rack, rack, rack, rack],
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
      tubes: [],
      trayData: [],
    }
  },
  methods: {
    isEmpty,
    getRack(rack) {
      this.trayData = rack.trays
    },
    getTube(tube) {
      this.steps = tube.steps
    },
  },
}
</script>
