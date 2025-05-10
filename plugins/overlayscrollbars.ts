import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/styles/overlayscrollbars.css'

export default defineNuxtPlugin({
  name: 'overlayscrollbars',
  setup(nuxtApp) {
    nuxtApp.vueApp.component('OverlayScrollbars', OverlayScrollbarsComponent)
  }
})
