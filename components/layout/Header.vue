<template>
  <div>
    <a-layout-header>
      <div class="user-detail">
        {{ translation['Welco_1_1'] }}, {{ user.name }}
      </div>

      <div class="hospital-detail">
        <!-- Header notifications -->
        <div class="notifications" style="margin: 0">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <!-- <a-icon type="bell" theme="filled" /> -->
              <a-badge :count="notificationCount">
                <!-- <a-avatar shape="square" icon="bell"/> -->
                <img
                  src="https://cdn-icons-png.flaticon.com/512/57/57167.png"
                  alt=""
                  width="25px"
                />
              </a-badge>
            </a>
            <a-menu slot="overlay" class="notifications-dropdown">
              <a-menu-item
                v-for="notification in notifications"
                :key="notification.id"
                @click="markRead(notification)"
                ><strong
                  ><p class="m-0">{{ notification.recipient_Name }}</p></strong
                >
                <span class="ellipsis border-bottom">{{
                  notification.message
                }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <!-- Header Logo -->
        <div class="org-title">
          <div class="login-logo-x">
            <img
              src="https://demoapi.qmaid.co/Logos/2020_10_22.14_48_51.jpg"
              width="20px"
              logo
              hendling
              for
              temp
              class="logo"
            />
            <span class="title">{{ user.organizationName }} </span>
          </div>
        </div>
        <!-- Header Lang Select -->
        <div>
          {{ translation.first }}
          <a-select
            :default-value="isEmpty(selectedLanguage) ? 'en' : selectedLanguage"
            style="width: 120px"
            @change="selectLanguage"
          >
            <a-select-option v-for="language in languages" :key="language.id">
              {{ language.name }}
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
import TranslationServices from '~/services/API/TranslationServices'
import translationHelpers from '~/mixins/translation-helpers'
import ChatServices from '~/services/API/ChatServices'
import { BASE_URL } from '~/services/Constant/index'

import routeHelpers from '~/mixins/route-helpers'
const connection = new HubConnectionBuilder()
  .withUrl(`${BASE_URL}NotificationUserHub`)
  .build()

connection.start()

export default {
  name: 'Header',
  mixins: [translationHelpers, routeHelpers],
  data() {
    return {
      languages: [
        { id: 'en', name: 'English' },
        { id: 'de', name: 'German' },
        { id: 'za', name: 'Chinese' },
        { id: 'ar', name: 'Arabic' },
        { id: 'fr', name: 'French' },
      ],
      lang: null,
      notificationCount: 0,
      notifications: [],
    }
  },
  async fetch() {
    let language = this.selectedLanguage

    if (isEmpty(language)) {
      language = 'en'
    }
    await this.fetchLanguages(language)
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    this.notificationHandler()
    this.genericNotificationHandler()
    this.fetchUnreadMessages()
    // this.uploadTranslations()
    // this.downloadTranslations()
  },
  methods: {
    isEmpty,
    uploadTranslations() {
      TranslationServices.getTranslation()
    },
    downloadTranslations() {
      TranslationServices.getTranslationFile().then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'translationData.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
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
    genericNotificationHandler() {
      const fetchUnreadMessages = this.fetchUnreadMessages
      connection.on('GenericNotification', (notification) => {
        fetchUnreadMessages()
      })
    },
    fetchUnreadMessages() {
      ChatServices.fetchUnreadMessages().then((response) => {
        this.notificationCount = response.count
        this.notifications = response.data
      })
    },
    emitNotification(notification) {
      this.$nuxt.$emit(EVENT_CHAT_NOTIFICATION, notification)
    },
    selectLanguage(language) {
      this.fetchLanguages(language)
      // this.goto(`${this.$route.path}`)
    },
    async fetchLanguages(language) {
      await TranslationServices.get({ [language]: true }).then(
        (translations) => {
          this.$store.commit('setSelectedLanguage', language)
          this.$store.commit('setTranslation', translations.data)
          this.lang = translations.data
        }
      )
    },
    markRead(notification) {
      ChatServices.markAsRead(notification.id)
        .then((response) => {
          this.fetchUnreadMessages()
        })
        .then(() => {
          this.goto(`/chat`)
        })
    },
  },
}
</script>
