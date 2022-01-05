<template>
  <div>
    <a-tabs @change="callback">
      <a-tab-pane v-for="bag in bags" :key="bag.id" :tab="bag.puid">
        {{ bag.collection }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Utilities'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import { COLLECTION_TYPE } from '~/services/Constant'
export default {
  props: { treatment: { required: true, type: Object } },
  data() {
    return {
      COLLECTION_TYPE,
      bags: [],
      //   apiService: TreatmentBagServices,
      //   fetchIdFromParams: false,
    }
  },
  mounted() {
    this.fetchOnMount()
  },
  methods: {
    callback(key) {
      console.log(key)
    },
    fetchOnMount() {
      if (!isEmpty(this.treatment)) {
        TreatmentBagServices.getByTreatmentId(this.treatment.id, {
          type: COLLECTION_TYPE.hospital.id,
        }).then((response) => {
          this.bags = response.data
        })
      }
    },
  },
}
</script>
