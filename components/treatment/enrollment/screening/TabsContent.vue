<template>
  <div>
    <a-alert
      v-if="screenings <= 0"
      type="info"
      message="No Screenings available"
    ></a-alert>
    <a-list v-else item-layout="horizontal" :data-source="screenings">
      <a-list-item slot="renderItem" slot-scope="item"
        >{{ item.name }}
        <a slot="actions">
          <a-dropdown>
            <a-icon type="more" />
            <a-menu slot="overlay">
              <a-menu-item key="1"> <a-icon type="edit" />Edit </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="delete" />Delete
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
const data = []
export default {
  props: {
    screenings: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      data,
    }
  },
  mounted() {},
  methods: {},
}
</script>
