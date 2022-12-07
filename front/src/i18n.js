import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    ...require('@/locales/en.json'),
  },
  ar:{
    ...require('@/locales/ar.json'),

  },
  gr:{
    ...require('@/locales/gr.json'),
  },
  fr:{
    ...require('@/locales/fr.json'),
  }
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
})
