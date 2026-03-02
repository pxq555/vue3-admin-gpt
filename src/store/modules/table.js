/**
 * @description 代码生成机状态管理
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('table', () => {
  // state
  const srcCode = ref('')

  // getters
  const getSrcCode = () => srcCode.value

  // actions
  const setTableCode = (code) => {
    srcCode.value = code
  }

  return {
    // state
    srcCode,
    // actions
    setTableCode,
  }
})
