<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
  >
    <div slot="content" class="w-1200 margin-auto">
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
              <racks :count="4" />
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
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import fridge from '~/components/inventory/fridge'
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
export default {
  components: { PageLayout, racks, Trays, fridge, TileCenter },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
