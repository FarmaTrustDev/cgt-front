<template>
  <div>
    <a-row>
      <a-col :span="24">
        <detail class="mb-15" :data="data.description" />
        <br />
        <h2 class="mt-15">
          <strong v-if="user.organizationTypeAlias!='SMARTLAB'">{{ translation.Equip_1_568 }}</strong>
          <strong v-if="user.organizationTypeAlias=='SMARTLAB'" class="ml-20">{{translation.Kits_1_547}}</strong>
        </h2>
      </a-col>
    </a-row>
    <div class="mt-15 mb-15">
      <a-row class="p-15 w-135" :gutter="24">
        <a-col class="suit" :span="12">
          <suite />
        </a-col>

        <a-col v-if="false" :span="11">
          <div class="">
            <a-card
              class="shadow mb-15 default-border-radius"
              :bordered="false"
              title=""
            >
              <h4>
                <a-button type="link">{{
                  translation.ColdStora_2_588
                }}</a-button>
              </h4>
              <ImageHeading
                :detail="{
                  img: 'web/inventory/Group-1000002120.svg',
                  heading:
                    '1x Class II cabinets, Grade A in Grade B background',
                }"
                :img-properties="{ width: '50px', height: '50px' }"
              />
            </a-card>
          </div>
          <div class="">
            <a-card
              :bordered="false"
              class="shadow mb-15 default-border-radius"
            >
              <h4>
                <a-button type="link">{{
                  translation.SuppoEquip_5_584
                }}</a-button>
              </h4>
              <span v-for="(cl, index) in outsideEquipment" :key="index">
                <ImageHeading
                  :img-properties="{ width: '50px', height: '50px' }"
                  class="mt-15"
                  :detail="cl"
                />
              </span>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import detail from '~/components/root/inventory/detail'
import suite from '~/components/root/inventory/equipment/Suite'
import ImageHeading from '~/components/cards/ImageHeading'
export default {
  components: { detail, suite, ImageHeading },
  props: { data: { type: Object, default: () => ({}) } },
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
  computed: {
     user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
