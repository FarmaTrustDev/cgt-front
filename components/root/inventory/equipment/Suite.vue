<template>
  <div>
    <a-card :bordered="null" class="default-border-radius shadow">
      <a-tabs>
        <a-tab-pane key="1" tab="Blood Collection Kit A">
          <ImageHeading
            v-for="(c, index) in classB"
            :key="index"
            :detail="c"
          >
           <span slot="extra">
                <span class="count-bar suite-pg">2</span>
                </span>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
          </ImageHeading>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Blood Collection Kit B">
          <ImageHeading
            v-for="(c, index) in classB"
            :key="index"
            :detail="c"
          > <span slot="extra">
                <span class="count-bar suite-pg">2</span>
                </span></ImageHeading>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
        </a-tab-pane>
        <a-tab-pane key="3" tab="Cell Collection Kit A">
          <ImageHeading
            v-for="(c, index) in classB"
            :key="index"
            :detail="c"
        > <span slot="extra">
                <span class="count-bar suite-pg">2</span>
                </span></ImageHeading></a-tab-pane>
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
        <a-tab-pane key="4" tab="Cell Collection Kit B">

          <ImageHeading
            v-for="(c, index) in classB"
            :key="index"
            :detail="c"
          >
            <!-- :img-properties="{ width: '50px', height: '50px' }" -->
                <span slot="extra">
                <span class="count-bar suite-pg">2</span>
                </span>
        </ImageHeading></a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import ImageHeading from '~/components/cards/ImageHeading'
export default {
  components: { ImageHeading },
  data() {
    return {
      classB: [
        {
          // img: 'Icons/kits.svg',
          heading: 'Kits Available with Current Supplies',
        },
        // {
        //   
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
        // {
        //   img: 'web/inventory//Group-1000002115.svg',
        //   heading: '1x Class II cabinets, Grade A in Grade B background',
        // },
      ],
    }
  },
}
</script>
