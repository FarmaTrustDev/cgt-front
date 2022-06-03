<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
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
            heading="Fridge Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <fridge style="zoom: 2.5" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="8">
          <TileCenter
            heading="Fridge Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <racks :count="5" />
            </div>
          </TileCenter>
        </a-col>
        <a-col :span="8">
          <TileCenter
            heading=" Fridge Atara 001, Shelf 3 "
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <Trays />
            </div> </TileCenter
        ></a-col>
      </a-row>

      <a-card
        :bordered="false"
        title="Provenance Data - Platelet Lycate Asset DEC123"
      >
        <div class="view-screen">
          <TimeLine :steps="steps" />
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
      loading: false,
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
  },
}
</script>
