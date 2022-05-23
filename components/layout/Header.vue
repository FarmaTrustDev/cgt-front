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
          {{ translation.first }}
          <a-select
            :default-value="selectedLanguage"
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
const connection = new HubConnectionBuilder()
  .withUrl('https://demoapi.qmaid.co/NotificationUserHub')
  .build()
connection.start()
export default {
  name: 'Header',
  mixins: [translationHelpers],
  data() {
    return {
      languages: [
        { id: 'en', name: 'English' },
        { id: 'de', name: 'German' },
        { id: 'za', name: 'Chinese' },
        { id: 'ar', name: 'Arabic' },
      ],
      lang: null,
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
    selectLanguage(language) {
      this.fetchLanguages(language)
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
  },
}
</script>
