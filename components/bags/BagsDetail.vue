<template>
  <div class="qr_bag">
    <h4 class="heading pl-0">{{translation.InbouSampl_2_306}}</h4>
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
          title: `${this.$store.getters.getTranslation.qrcode_2_55}`,
          dataIndex: 'qrUrl',
          key: 'qrUrl',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: `${this.$store.getters.getTranslation.BagID_2_540}`,
          dataIndex: 'puid',
          key: 'puid',
        },
        {
          title: `${this.$store.getters.getTranslation['ColleDate/_2_830']}`,
          dataIndex: 'collectionDateTime',
          key: 'collDateTime',
          scopedSlots:{customRender: 'collDateTime'}
        },
        {
          title: `${this.$store.getters.getTranslation.Descr_1_69}`,
          dataIndex: 'notes',
          key: 'description',
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
