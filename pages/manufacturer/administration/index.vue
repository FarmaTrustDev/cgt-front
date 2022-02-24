<template>
  <div class="admin-page">
    <h3 class="page-title">Administration</h3>
    <!-- <a-row :gutter="16" class="grey-card">
      <a-col :span="10">
        <div class="admin-tab">
          
          <a :href="screeningUrl">
            <img
              src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
            />
            <h4 class="heading-home">Screening Criteria</h4>
          </a>
        </div>
      </a-col>
      <a-col :span="2"></a-col>
      <a-col :span="10">
        <div class="admin-tab">
          <a :href="logisticsTo">
            <img
              src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
            />
            <h4 class="heading-home">Logistics Partner</h4>
          </a>
        </div>
      </a-col>
    </a-row> -->

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
      screeningUrl: '/manufacturer/administration/screening',
      logisticsTo: 'logisticsTo',
      navigation: [
        {
          heading: 'Screening Adminstration',
          menus: [
            {
              icon: 'https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg',
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
              icon: 'https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg',
              id: 0,
              initial: null,
              key: '3',
              name: 'Hospital',
              to: '/manufacturer/administration/collections/hospital',
            },
            {
              icon: 'https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg',
              id: 0,
              initial: null,
              key: '4',
              name: 'Manufacturer',
              to: '/manufacturer/administration/collections/manufacturer',
            },
            {
              icon: 'https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg',
              id: 0,
              initial: null,
              key: '5',
              name: 'Treatment',
              to: '/manufacturer/administration/collections/treatment',
            },
          ],
        },
        {
          heading: 'Logistics Partner',
          menus: [
            {
              icon: 'https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg',
              id: 0,
              initial: null,
              key: '3',
              name: 'Logistics Partner',
              to: '/manufacturer/administration/logistics',
            },
          ],
        },
      ],
    }
  },
}
</script>
