<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.StoraServi_2_532"
    class="specific-storage"
  >
    <div slot="content">
      <a-row>
        <a-col class="mb-15" :span="24">
          <detail v-if="false" />

          <a-form class="filter-search" :form="form" layout="inline">
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
      <div class="w-1200 margin-auto p-15 default-border-radius">
        <a-row :gutter="16">
          <a-col v-for="storage in storages" :key="storage.id" :span="6">
            <span @click="goto(`/inventory/storage/1`)">
              <Tile class="light-shadow" :storage="storage"
            /></span>
          </a-col>
        </a-row>
      </div>
    </div>
  </page-layout>
</template>

<script>
import detail from '~/components/root/inventory/detail'
import Tile from '~/components/inventory/storage/Tile'
import PageLayout from '~/components/layout/PageLayout'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Utilities'
import { isNumber } from '~/services/Helpers'

const baseStorage = [
  {
    id: 1,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 1,
    zoneId: 1,
    temperature: '-20C',
    zone: 'Zone A',
  },
  {
    id: 2,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 2,
    zoneId: 3,
    temperature: '-20C',
    zone: 'Zone C',
  },
  {
    id: 3,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 2,
    zoneId: 1,
  },
  {
    id: 4,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 3,
    zoneId: 1,
  },
  {
    id: 5,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 1,
    zoneId: 2,
  },
  {
    id: 6,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 2,
    zoneId: 2,
  },
  {
    id: 7,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 20,
    temperatureId: 3,
    zoneId: 2,
  },
  {
    id: 8,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 2,
    zoneId: 1,
  },
  {
    id: 9,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 11,
    temperatureId: 3,
    zoneId: 1,
  },
  {
    id: 10,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 18,
    temperatureId: 2,
    zoneId: 2,
  },
  {
    id: 11,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 8,
    temperatureId: 1,
    zoneId: 1,
  },
  {
    id: 12,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 16,
    temperatureId: 2,
    zoneId: 3,
  },
  {
    id: 13,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 18,
    temperatureId: 2,
    zoneId: 2,
  },
  {
    id: 14,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 3,
    zoneId: 1,
  },
  {
    id: 15,
    color: '#FA6363',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 2,
    zoneId: 1,
  },
  {
    id: 16,
    color: '#1943AE',
    title: 'Freezer Atara 001',
    location: 'Storage Suite 3, Germany - Cellfuse',
    quantity: 14,
    temperatureId: 2,
    zoneId: 1,
  },
]
export default {
  components: { Tile, PageLayout, detail },
  mixins: [routeHelpers],
  data() {
    return {
      storages: baseStorage,
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
  methods: {
    search(value, key) {
      let filters = this.filters
      filters[key] = value
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = baseStorage.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              return storage
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter] == filterValue
          })
        }

        storages = JSON.stringify(storages)
        this.storages = JSON.parse(storages)
      } else {
        this.storages = baseStorage
      }
    },
  },
}
</script>
