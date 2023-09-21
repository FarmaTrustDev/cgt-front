<template>
  <div class="qr_bag">
    <h4 class="heading pl-0">Inbound Samples</h4>
    <a-skeleton :loading="loading">
      <StandardTable
        v-if="bags.length > 0"
        :should-fetch="false"
        :dump-data="bags"
        :columns="columns"
        :show-pagination="false"
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
    title: 'QR Code',
    dataIndex: 'qrUrl',
    key: 'qrUrl',
    scopedSlots: { customRender: 'image' },
  },
  {
    title: 'Bag Id',
    dataIndex: 'puid',
    key: 'puid',
  },
  {
    title: 'Collection Date/Time',
    dataIndex: 'collectionDateTime',
    key: 'collDateTime',
    scopedSlots:{customRender: 'collDateTime'}
  },
  {
    title: 'Description',
    dataIndex: 'notes',
    key: 'description',
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
      this.loading = true
      TreatmentBagServices.get({ treatmentId: this.treatment.id })
        .then((bags) => {
          this.bags = bags.data
        })
        .finally((this.loading = false))
    },
    clickImage(record) {
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
  },
}
</script>
