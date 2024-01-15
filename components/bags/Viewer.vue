<template>
  <div class="qr_bag">
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
      :title="translation.qrcode_2_55"
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
// const columns = 
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
      columns:[
        {
          title: `${this.$store.getters.getTranslation.BagID_2_540}`,
          dataIndex: 'puid',
          key: 'puid',
        },
        {
          title: `${this.$store.getters.getTranslation.Image_1_412}`,
          dataIndex: 'qrUrl',
          key: 'qrUrl',
          scopedSlots: { customRender: 'image' },
        },
      ],
      loading: true,
      qrUrl: null,
      showModal: false,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
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
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
  },
}
</script>
