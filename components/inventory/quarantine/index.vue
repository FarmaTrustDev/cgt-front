<template>
  <div>
    <a-row :gutter="24">
      <a-col
        v-for="(storage, index) in storages"
        :key="index"
        class="text-center"
        :span="8"
      >
        <div @click="getRacks(storage)">
          <Tile class="light-shadow border" :storage="storage" />
        </div>
      </a-col>
    </a-row>
    <a-row class="mt-15" :gutter="24">
      <a-col :span="12">
        <TileCenter
          heading="Shelf Atara 001"
          footer="Storage Suite 3, Germany - Cellfuse"
        >
          <div slot="center" class="text-center">
            <racks :data="racks" @getRackPortion="getRackPortion" />
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
    <a-form-item class="mt-15">
      <FormActionButton @click="submit" />
    </a-form-item>
  </div>
</template>

<script>
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
import Tile from '~/components/inventory/storage/Tile'
import {
  fridgeData,
  baseStorageQuarantine,
} from '~/services/Constant/DummyData'

import { isEmpty } from '~/services/Helpers'

export default {
  components: {
    racks,
    Trays,
    TileCenter,
    Tile,
  },
  data() {
    return {
      fridgeData,
      storages: baseStorageQuarantine,
      loading: false,
      racks: [],
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
    getRacks(fridge) {
      this.racks = fridge.racks
    },
    getRackPortion(portions) {
      this.trayData = portions.trays
    },
    getTube(tube) {
      this.steps = tube.steps
    },
    submit() {
      this.$emit('submit', true)
    },
  },
}
</script>
