/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

export const useRoutesStore = defineStore('routes', () => {
  // state
  const routes = ref([])
  const partialRoutes = ref([])

  // getters
  const getRoutes = () => routes.value
  const getPartialRoutes = () => partialRoutes.value

  // mutations
  const setRoutes = (routesValue) => {
    routes.value = constantRoutes.concat(routesValue)
  }

  const setAllRoutes = (routesValue) => {
    routes.value = constantRoutes.concat(routesValue)
  }

  // actions
  /**
   * @description intelligence模式设置路由
   * @param {*} permissions
   * @returns
   */
  const setRoutesAction = async (permissions) => {
    //根据permissions做路由筛选
    let accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
    setRoutes(accessedRoutes)
    return accessedRoutes
  }

  /**
   * @description all模式设置路由
   * @returns
   */
  const setAllRoutesAction = async () => {
    try {
      let { data } = await getRouterList()
      if (!data || !Array.isArray(data)) {
        console.error('后端返回的路由数据格式不正确', data)
        data = []
      }

      const accessedRoutes = convertRouter(data)
      setAllRoutes(accessedRoutes)
      return accessedRoutes
    } catch (error) {
      console.error('获取路由列表失败', error)
      setAllRoutes([])
      return []
    }
  }

  return {
    // state
    routes,
    partialRoutes,
    // actions
    setRoutes: setRoutesAction,
    setAllRoutes: setAllRoutesAction,
  }
})
