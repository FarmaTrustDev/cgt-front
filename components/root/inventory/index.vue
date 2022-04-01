<template>
  <div class="inventory-page">
    <a-tabs
      :animated="false"
      class="h-tabs no-border-bottom"
      default-active-key="1"
      @change="callback"
    >
      <a-tab-pane key="1" tab="Germany - Cellfuse ">
        <detail />
        <div class="mt-15 mb-15">
          <h2 class="mt-15">Equipment</h2>
          <a-row :gutter="20">
            <a-col :span="2"></a-col>
            <a-col :span="8">
              <suite />
            </a-col>
            <a-col :span="2"></a-col>
            <a-col :span="8">
              <div class="">
                <a-card
                  class="shadow mb-15 default-border-radius"
                  :bordered="false"
                  title=""
                >
                  <h4><a-button type="link">Cold Storage</a-button></h4>
                  <ImageHeading
                    :detail="{
                      img: 'web/inventory/Group-1000002120.svg',
                      heading:
                        '1x Class II cabinets, Grade A in Grade B background',
                    }"
                  />
                </a-card>
              </div>
              <div class="">
                <a-card
                  :bordered="false"
                  class="shadow mb-15 default-border-radius"
                >
                  <h4>
                    <a-button type="link"
                      >Support Equipment outside Clean Room</a-button
                    >
                  </h4>
                  <span v-for="(cl, index) in outsideEquipment" :key="index">
                    <ImageHeading :detail="cl" />
                  </span>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import detail from '~/components/root/inventory/detail'
import suite from '~/components/root/inventory/equipment/Suite'
import ImageHeading from '~/components/cards/ImageHeading'
export default {
  components: { detail, suite, ImageHeading },

  data() {
    return {
      outsideEquipment: [
        {
          img: 'web/inventory/Group-1000002120.svg',
          heading: '1x Class II cabinets, Grade A in Grade B background',
        },
        {
          img: 'web/inventory/Group-1000002120.svg',
          heading: '1x Class II cabinets, Grade A in Grade B background',
        },
      ],
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
