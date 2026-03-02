/**
 * @description 异常捕获的状态拦截，请勿修改
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorLogStore = defineStore('errorLog', () => {
  // state
  const errorLogs = ref([])

  // getters
  const getErrorLogs = () => errorLogs.value

  // actions
  const addErrorLog = (errorLog) => {
    errorLogs.value.push(errorLog)
  }

  const clearErrorLog = () => {
    errorLogs.value.splice(0)
  }

  return {
    // state
    errorLogs,
    // actions
    addErrorLog,
    clearErrorLog,
  }
})
