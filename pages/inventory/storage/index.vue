<template>
  <div>
    <a-row :gutter="16">
      <a-col v-for="storage in storages" :span="6" :key="storage.id">
        <Tile :storage="storage" />
      </a-col>
    </a-row>
    >
  </div>
</template>

<script>
import Tile from '~/components/inventory/storage/Tile'
export default {
  components: { Tile },
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
      ],
    }
  },
}
</script>
