<template>
  <page-layout
    :create="false"
    :loading="loading"
    :title="translation.Shipm_1_756 + ' ' + translation.Statu_1_202"
  >
    <template slot="content">
      <div class="grey-card enrollment-page green-on-update">
        <a-card class="default-border-radius ant-card">
          <a-tabs
            :active-key="activeKey"
            :tab-position="mode"
            @change="changeTabs"
          >
            <a-tab-pane :key="1">
              <div
                slot="tab"
                class="tab-title main"
                :class="isCompleted(!isEmpty(pickupShipment))"
              >
                {{ translation.PickuShipm_2_861 }}
              </div>
              <pickup
                v-if="isEmpty(pickupShipment)"
                :scheduling="entity"
                @onCreate="fetchList"
              />

              <pickup-detail
                v-else
                :scheduling="entity"
                :shipment="pickupShipment"
              />
            </a-tab-pane>
            <a-tab-pane :key="2" :disabled="checkTabStatus(deliveryShipment)">
              <div
                slot="tab"
                class="tab-title main"
                :class="isCompleted(!isEmpty(deliveryShipment))"
              >
                {{ translation.DelivShipm_2_863 }}
              </div>
              <delivery
                v-if="isEmpty(deliveryShipment)"
                :shipment="deliveryShipment"
                :scheduling="entity"
                @onCreate="fetchList"
              />

              <delivery-detail
                v-else
                :scheduling="entity"
                :shipment="deliveryShipment"
              />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import pickup from '~/components/root/logistic/shipment/pickup'
import delivery from '~/components/root/logistic/shipment/delivery'
import pickupDetail from '~/components/root/logistic/shipment/pickup/Detail'
import deliveryDetail from '~/components/root/logistic/shipment/delivery/Detail'
import withFetch from '~/mixins/with-fetch'
import SchedulingServices from '~/services/API/SchedulingServices'
import { isEmpty } from '~/services/Utilities'
import tabsHelpers from '~/mixins/tabs-helpers'
export default {
  components: {
    'page-layout': PageLayout,
    'pickup-detail': pickupDetail,
    'delivery-detail': deliveryDetail,
    delivery,
    pickup,
  },
  mixins: [withFetch, tabsHelpers],
  data() {
    return {
      loading: false,
      pickedUp: true,
      mode: 'left',
      fetchMethod: SchedulingServices.getDetailById,
      schedule: null,
      pickupShipment: null,
      deliveryShipment: null,
      activeKey: 1,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    changeTabs(tabs) {
      this.activeKey = tabs
    },
    beforeFetch() {
      this.loading = true
    },
    afterFetch() {
      this.schedule = this.entity
      this.markShipmentFlags()
    },
    checkTabStatus(deliveryShipment){
      if(!isEmpty(deliveryShipment) === true && this.pickedUp === true)
      {
        return false
      }
      else if(this.pickedUp === false)
      {
        return false
      }
      else{
        return true
      }
    },
    fetchList() {
      this.pickedUp = false
      this.fetch(this.entity.globalId)
    },
    markShipmentFlags() {
      const schedule = this.schedule

      if (!isEmpty(schedule)) {
        schedule.shipments.forEach((shipment) => {
          this.activeKey = this.activeKey === 1 ? 2 : this.activeKey
          if (!isEmpty(shipment.pickupAt)) {
            this.pickupShipment = shipment
          }
          if (!isEmpty(shipment.deliveryAt)) {
            this.deliveryShipment = shipment
          }
        })
      }
    },
  },
}
</script>
