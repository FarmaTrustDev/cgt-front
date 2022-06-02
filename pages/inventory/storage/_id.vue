<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
  >
    <div slot="content">
      <a-row>
        <a-col :span="8">
          <TileCenter
            heading="Fridge Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center"><fridge /></div>
          </TileCenter>
        </a-col>
        <a-col :span="8">
          <TileCenter
            heading="Fridge Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <Shelf />
            </div> </TileCenter
        ></a-col>
        <a-col :span="8">
          <TileCenter
            heading="Fridge Atara 001"
            footer="Storage Suite 3, Germany - Cellfuse"
          >
            <div slot="center" class="text-center">
              <TestTube />
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
import Shelf from '~/components/inventory/assets/Shelf'
import TestTube from '~/components/inventory/assets/TestTube'
export default {
  components: { PageLayout, Shelf, TestTube, fridge, TileCenter },
  data() {
    return {}
  },
}
</script>
