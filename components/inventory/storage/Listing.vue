<template>
  <div>
    <a-row>
      <a-col class="mb-15" :span="24">
        <detail v-if="false" />

        <a-form class="filter-search mt-15" :form="form" layout="inline" v-if="false">
          <a-form-item> <h2 class="mt-5">{{translation.searc_1_488}}</h2></a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['quantity']"
              :allow-clear="true"
              size="large"
              placeholder="Quantity of Vials"
              @change="(e) => search(e.target.value, 'quantity')"
            />
          </a-form-item>
          <a-form-item>
            <a-select
              v-decorator="[`temperature`]"
              class="w-min-200"
              placeholder="Temperature"
              :allow-clear="true"
              @change="(e) => search(e, 'temperatureId')"
            >
              <a-select-option
                v-for="temperature in temperatures"
                :key="temperature.id"
                >{{ temperature.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              v-decorator="[`zone`]"
              placeholder=" Storage Zone"
              class="w-min-200"
              :allow-clear="true"
              @change="(e) => search(e, 'zoneId')"
            >
              <a-select-option v-for="zone in zones" :key="zone.id">{{
                zone.name
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <div class="margin-auto p-15 default-border-radius">
      <a-row :gutter="16">
        <a-col v-for="storage in storages" :key="storage.id" :span="6">
          <span @click="typeId === true ? goto(`/inventory/storage/location/save?vial=${selectedVials}`) : goto(`/inventory/storage/1`)">
            <Tile class="light-shadow" :storage="storage"
          /></span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Tile from '~/components/inventory/storage/Tile'
import detail from '~/components/root/inventory/detail'
import routeHelpers from '~/mixins/route-helpers'

export default {
  components: { Tile, detail },
  mixins: [routeHelpers],
  props: {
    storages: { type: Array, default: () => [] },
    typeId:{ type: Boolean},
    selectedVials:{type: String},
  },
  data() {
    return {
      // storages: baseStorage,
      loading: false,
      filters: {},
      zones: [
        { id: 1, name: 'Zone A' },
        { id: 2, name: 'Zone B' },
        { id: 3, name: 'Zone C' },
      ],
      temperatures: [
        { id: 1, name: '-20C' },
        { id: 2, name: '-80°C' },
        { id: 3, name: 'LN2' },
      ],
      form: this.$form.createForm(this, {
        name: 'login',
      }),
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
