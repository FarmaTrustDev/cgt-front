<template>
  <div>
    <a-layout-header>
      <div class="user-detail">Welcome, {{ user.name }}</div>

      <div class="hospital-detail">
        <!-- Header notifications -->
        <div class="notifications">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-icon type="bell" theme="filled" />
            </a>
            <a-menu slot="overlay" class="notifications-dropdown">
              <a-menu-item key="0"> Notifications here </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <!-- Header Logo -->
        <div class="login-logo">
          <img
            src="https://demoapi.qmaid.co/Logos/2020_10_22.14_48_51.jpg"
            logo
            hendling
            for
            temp
            class="logo"
          />
          <span class="title">{{ user.organizationName }} </span>
        </div>
        <!-- Header Lang Select -->
        <div>
          <a-select :default-value="langData[0]" style="width: 120px">
            <a-select-option v-for="lang in langData" :key="lang">
              {{ lang }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import { HubConnectionBuilder } from '@aspnet/signalr'
import { isEmpty } from '~/services/Utilities'
import { isArray } from '~/services/Helpers'
import { EVENT_CHAT_NOTIFICATION } from '~/services/Constant/Events'
const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:22462/NotificationUserHub')
  .build()
connection.start()
export default {
  name: 'Header',
  data() {
    return {
      langData: ['English', 'German', 'Chinese', 'Arabic'],
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    this.notificationHandler()
  },
  methods: {
    isEmpty,
    notificationHandler() {
      connection.on('Notification', (notification) => {
        const notify = notification

        if (!isEmpty(notify.data) && isArray(notify.data.notify_To)) {
          const notifyTo = notify.data.notify_To
          //  *check if the user is in the notify to
          if (notifyTo.includes(`${this.user.id}`)) {
            this.emitNotification(notification)
          }
        }
      })
    },
    emitNotification(notification) {
      this.$nuxt.$emit(EVENT_CHAT_NOTIFICATION, notification)
    },
  },
}
</script>
