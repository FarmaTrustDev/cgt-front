<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
  >
    <div slot="content">
      <div class="w-1200 p-15 default-border-radius">
        <a-row :gutter="16">
          <a-col v-for="storage in storages" :key="storage.id" :span="6">
            <Tile class="light-shadow" :storage="storage" />
          </a-col>
        </a-row>
      </div>
    </div>
  </page-layout>
</template>

<script>
import Tile from '~/components/inventory/storage/Tile'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { Tile, PageLayout },
  data() {
    return {
      storages: [
        {
          id: 1,
          color: '#1943AE',
          title: 'Fridge Atara 001',
          location: 'Storage Suite 3, Germany - Cellfuse',
        },
        {
          id: 2,
          color: '#1943AE',
          title: 'Fridge Atara 001',
          location: 'Storage Suite 3, Germany - Cellfuse',
        },
        {
          id: 3,
          color: '#FA6363',
          title: 'Fridge Atara 001',
          location: 'Storage Suite 3, Germany - Cellfuse',
        },
        {
          id: 4,
          color: '#1943AE',
          title: 'Fridge Atara 001',
          location: 'Storage Suite 3, Germany - Cellfuse',
        },
        {
          id: 5,
          color: '#FA6363',
          title: 'Fridge Atara 001',
          location: 'Storage Suite 3, Germany - Cellfuse',
        },
        {
          id: 6,
          color: '#1943AE',
          title: 'Fridge Atara 001',
          location: 'Storage Suite 3, Germany - Cellfuse',
        },
      ],
      loading: false,
    }
  },
}
</script>
