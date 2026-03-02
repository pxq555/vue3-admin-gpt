/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

import defaultSettings from '@/config'

const { tabsBar, logo, layout, header, themeBar } = defaultSettings
const theme = JSON.parse(localStorage.getItem('vue3-admin-theme')) || ''

export const useSettingsStore = defineStore('settings', () => {
  // state
  const tabsBarValue = ref(theme.tabsBar || tabsBar)
  const logoValue = ref(logo)
  const collapse = ref(false)
  const layoutValue = ref(theme.layout || layout)
  const headerValue = ref(theme.header || header)
  const device = ref('desktop')
  const themeBarValue = ref(themeBar)

  // getters
  const getTabsBar = () => tabsBarValue.value
  const getLogo = () => logoValue.value
  const getCollapse = () => collapse.value
  const getLayout = () => layoutValue.value
  const getHeader = () => headerValue.value
  const getDevice = () => device.value
  const getThemeBar = () => themeBarValue.value

  // actions
  const changeLayout = (layout) => {
    if (layout) layoutValue.value = layout
  }

  const changeHeader = (header) => {
    if (header) headerValue.value = header
  }

  const changeTabsBar = (tabs) => {
    if (tabs) tabsBarValue.value = tabs
  }

  const changeCollapse = () => {
    collapse.value = !collapse.value
  }

  const foldSideBar = () => {
    collapse.value = true
  }

  const openSideBar = () => {
    collapse.value = false
  }

  const toggleDevice = (deviceValue) => {
    device.value = deviceValue
  }

  return {
    // state
    tabsBar: tabsBarValue,
    logo: logoValue,
    collapse,
    layout: layoutValue,
    header: headerValue,
    device,
    themeBar: themeBarValue,
    // actions
    changeLayout,
    changeHeader,
    changeTabsBar,
    changeCollapse,
    foldSideBar,
    openSideBar,
    toggleDevice,
  }
})
