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
          heading=" Box Atara 001"
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
      <FormActionButton @click="clickImage" :loading="loading" custom-text="Submit" />
    </a-form-item>
      <a-modal
      :visible="showModal"
      title="Confirm sample storage"
      ok-text="Confirm"
      cancel-text="Cancel"
      @ok="confirm(false)"
      @cancel="handleModal(false)"
      >
      <div>
        <a-row><a-col>Freezer : Atara 001</a-col></a-row>
        <a-row><a-col>Shelf : Shelf 01</a-col></a-row>
        <a-row><a-col>Box location : 1A</a-col></a-row>
      </div>
      <!--<img class="img-responsive" :src="qrUrl" />-->
      <!-- <template slot="footer">
        <a-button @click="handleModal(false)">Cancel</a-button>
        <a-button @click="confirm(false)" type="primary">Confirm</a-button>     
      </template>         -->
    </a-modal>    
  </div>
</template>

<script>
import TileCenter from '~/components/inventory/storage/TileCenter'
import racks from '~/components/inventory/storage/racks'
import Trays from '~/components/inventory/storage/trays'
import Tile from '~/components/inventory/storage/Tile'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
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
  mixins: [routeHelpers,notifications],
  data() {
    return {
      fridgeData,
      storages: baseStorageQuarantine,
      loading: false,
      racks: [],
      tubes: [],
      trayData: [],
      showModal: false,
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
    clickImage() {
      this.handleModal(true)
    },    
    handleModal(show) {
      this.showModal = show
    },
    confirm(show) {
      this.showModal = show
      this.success('Sample quarantined successfully')
      this.goto('/inventory/storage/quarantine/status')
    },     
  },
}
</script>
