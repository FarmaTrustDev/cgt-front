<template>
  <div>
    <!-- // make its component -->
    <a-row>
      <a-col :span="3">
        <figure>
          <img class="responsive_img" :src="getImageUrl(url)" />
          <figcaption></figcaption>
        </figure>
      </a-col>

          <a-col :span="16" style="padding-left:15px">    
            <a-row>
              <a-col :span="5" style="font-weight: bold; line-height:20px">{{translation.Clien_1_505}}:</a-col>
              <a-col :span="11">{{isEmpty(client)? 'Autolus' : client}}</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">{{translation.ClienName_2_540}}:</a-col>
              <a-col :span="11">{{isEmpty(clientNames) ? 'James Anderson' : clientNames}}</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">{{translation.ContaNumbe_2_404}}:</a-col>
              <a-col :span="11">+44 1286 132475</a-col>
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">{{translation.Addre_1_559}}:</a-col>
              <a-col :span="11"
                >The WestWorks, 195 Wood Ln, London W12 7FQ</a-col
              >
            </a-row>
            <a-row>
              <a-col :span="5" style="font-weight: bold">{{translation.date_1_510}}:</a-col>
              <a-col :span="11"
                >{{moment(_getFutureMomentStandardFormatted()).format('DD MMMM YYYY') }}</a-col
              >
            </a-row>
          </a-col>
          <a-col v-if="showButton" :span="5" style="text-align:right">
              <a-button size="large" class="mb-10 mtm-20" type="primary" html-type="submit" @click="openViewModal()" :loading="false"> {{translation.TempoRelea_2_612}}</a-button>
              <a-button size="large" class="mt-10" type="primary" html-type="submit" :loading="false" @click="goto('/inventory/storage/quarantine/quarantineProcess?view=PROCESS_SAMPLE')">{{translation.ResolQuara_2_613}}</a-button>
          </a-col>
        </a-row>
        <a-modal :visible="showModal"
        :ok-text="translation.save_1_462"
        :cancel-text="translation.cance_1_296"
        :dialog-style="{ right: '150px' }"
        @cancel="handleModal(false)"
        @ok="handleModal(false)"
        class="modal-design"
        >
          <p class="align-left font-size">{{translation.Youare_9_607}} DAC12356</p>
          <p class="mt-15 font-size">{{translation.Pleasprovi_6_608}}:</p>
          <p class="mt-15">{{translation.Whydoes_8_609}}</p>
          <template>
          <a-textarea :placeholder="translation.Pleasinput_4_578" :rows="4" style="width: 100%"
            size="large" />
          </template>
          <p class="mt-15">{{translation.Whatactio_9_610}}</p>
          <a-textarea :placeholder="translation.Pleasinput_4_578" :rows="4"/>
          <p class="align-left mt-15">{{translation.UploaSuppo_3_611}} <a-upload> <a-icon class="ml-5 upload-button" type="upload" /></a-upload></p>
        </a-modal>
    </div>
</template>
<script>
import moment from 'moment'
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Helpers'
import {
  _getFormatMoment,
  getMomentByStandardFormat,
} from '~/services/Helpers/MomentHelpers'
import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
export default {
  mixins: [routeHelpers, imagesHelper],
  props: {
    url: { type: String },
    showButton: { type: Boolean },
    clientNames:{ type: String},
    client:{type: String},
  },
  data() {
    return {
      showModal: false,
      isEmpty,
      clientInfo: [
        {
          clientBrand: 'Novida',
          clientName: 'James',
          clientContact: '009-xxxxx',
          clientAdress: 'new Orlene, 78589',
          key: 0,
          url: '',
        },
        {
          clientBrand: 'test',
          clientName: 'James',
          clientContact: '009-xxxxx',
          clientAdress: 'new Orlene, 78589',
          key: 0,
          url: '',
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    _getFormatMoment,
    moment,
    getMomentByStandardFormat,
    _getFutureMomentStandardFormatted,
    openViewModal() {
      this.showModal = true
      // this.qrUrl = id
      // LabelServices.scheduling(id);
    },
    handleModal(show) {
      this.showModal = show
    },
  },
}
</script>
