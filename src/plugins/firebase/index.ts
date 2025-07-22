import { initializeApp } from 'firebase/app'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics'
// import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
}

const FIREBASE_APP = initializeApp(FIREBASE_CONFIG)
const ANALYTICS = getAnalytics(FIREBASE_APP as FirebaseApp)

export function event (event: string, params?: Record<string, string | string[] | number | boolean | unknown>): void {
  logEvent(ANALYTICS, event, params || {})
}

try {
  event('app_start')
  setUserProperties(ANALYTICS, { search: window.location.search })

  // initializeAppCheck(FIREBASE_APP, {
  //   provider: new ReCaptchaV3Provider(import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY_V3),
  //   isTokenAutoRefreshEnabled: true,
  // })
} catch (error) {
  event('app_start', { error })
}
