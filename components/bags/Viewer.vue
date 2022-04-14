<template>
  <div>
    <a-skeleton :loading="loading">
      <StandardTable
        v-if="bags.length > 0"
        :should-fetch="false"
        :dump-data="bags"
        :columns="columns"
        @clickImage="clickImage"
      />
    </a-skeleton>
    <a-modal
      :visible="showModal"
      title="Qr Code"
      @cancel="handleModal(false)"
      @ok="handleModal(false)"
    >
      <img class="img-responsive" :src="qrUrl" />
    </a-modal>
  </div>
</template>
<script>
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import StandardTable from '~/components/common/StandardTable'
const columns = [
  {
    title: 'Bag Id',
    dataIndex: 'puid',
    key: 'puid',
  },
  {
    title: 'Image',
    dataIndex: 'qrUrl',
    key: 'qrUrl',
    scopedSlots: { customRender: 'image' },
  },
]
export default {
  components: { StandardTable },
  props: {
    treatment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bags: [],
      columns,
      loading: true,
      qrUrl: null,
      showModal: false,
    }
  },
  mounted() {
    this.fetchBags()
  },
  methods: {
    fetchBags() {
      TreatmentBagServices.get({ treatmentId: this.treatment.id })
        .then((bags) => {
          this.bags = bags.data
        })
        .then(() => {
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    clickImage(record) {
      console.log(record)
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
  },
}
</script>
