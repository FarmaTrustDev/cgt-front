<template>
  <div>
    <a-row :gutter="16" justify="center">
      <a-col
        v-for="menu in navigation"
        :key="menu.heading"
        class="mt-15"
        :xs="{ span: 24 }"
        :md="{ span: 8 }"
      >
        <a-list size="small" bordered :data-source="menu.menus">
          <a-list-item slot="renderItem" slot-scope="item">
            <nuxt-link :to="item.to"> {{ item.name }}</nuxt-link>
          </a-list-item>
          <div slot="header" class="bg-gray-100">{{ menu.heading }}</div>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation: [
        {
          heading: 'Screening Adminstration',
          menus: [
            {
              icon: null,
              id: 0,
              initial: null,
              key: '1',
              name: 'Screening',
              to: '/manufacturer/administration/screening',
            },
          ],
        },
        {
          heading: 'Collection',
          menus: [
            {
              icon: null,
              id: 0,
              initial: null,
              key: '1',
              name: 'Hospital',
              to: '/manufacturer/administration/collections/hospital',
            },
          ],
        },
      ],
    }
  },
}
</script>
