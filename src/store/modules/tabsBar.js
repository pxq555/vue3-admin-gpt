/**
 * @description tabsBar多标签页逻辑，前期借鉴了很多开源项目发现都有个共同的特点很繁琐并不符合框架设计的初衷，后来在github用户hipi的启发下完成了重构，请勿修改
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabsBarStore = defineStore('tabsBar', () => {
  // state
  const visitedRoutes = ref([])

  // getters
  const getVisitedRoutes = () => visitedRoutes.value

  // mutations
  const addVisitedRoute = (route) => {
    let target = visitedRoutes.value.find((item) => item.path === route.path)
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route)
      return
    }
    visitedRoutes.value.push(Object.assign({}, route))
  }

  const delVisitedRoute = (route) => {
    visitedRoutes.value.forEach((item, index) => {
      if (item.path === route.path) visitedRoutes.value.splice(index, 1)
    })
  }

  const delOthersVisitedRoute = (route) => {
    visitedRoutes.value = visitedRoutes.value.filter((item) => item.meta.affix || item.path === route.path)
  }

  const delLeftVisitedRoute = (route) => {
    let index = visitedRoutes.value.length
    visitedRoutes.value = visitedRoutes.value.filter((item) => {
      if (item.name === route.name) index = visitedRoutes.value.indexOf(item)
      return item.meta.affix || index <= visitedRoutes.value.indexOf(item)
    })
  }

  const delRightVisitedRoute = (route) => {
    let index = visitedRoutes.value.length
    visitedRoutes.value = visitedRoutes.value.filter((item) => {
      if (item.name === route.name) index = visitedRoutes.value.indexOf(item)
      return item.meta.affix || index >= visitedRoutes.value.indexOf(item)
    })
  }

  const delAllVisitedRoutes = () => {
    visitedRoutes.value = visitedRoutes.value.filter((item) => item.meta.affix)
  }

  const updateVisitedRoute = (route) => {
    visitedRoutes.value.forEach((item) => {
      if (item.path === route.path) item = Object.assign(item, route)
    })
  }

  // actions
  const addVisitedRouteAction = (route) => {
    addVisitedRoute(route)
  }

  const delRouteAction = async (route) => {
    await delVisitedRoute(route)
    return {
      visitedRoutes: [...visitedRoutes.value],
    }
  }

  const delVisitedRouteAction = (route) => {
    delVisitedRoute(route)
    return [...visitedRoutes.value]
  }

  const delOthersRoutesAction = async (route) => {
    await delOthersVisitedRoute(route)
    return {
      visitedRoutes: [...visitedRoutes.value],
    }
  }

  const delLeftRoutesAction = async (route) => {
    await delLeftVisitedRoute(route)
    return {
      visitedRoutes: [...visitedRoutes.value],
    }
  }

  const delRightRoutesAction = async (route) => {
    await delRightVisitedRoute(route)
    return {
      visitedRoutes: [...visitedRoutes.value],
    }
  }

  const delOthersVisitedRouteAction = (route) => {
    delOthersVisitedRoute(route)
    return [...visitedRoutes.value]
  }

  const delLeftVisitedRouteAction = (route) => {
    delLeftVisitedRoute(route)
    return [...visitedRoutes.value]
  }

  const delRightVisitedRouteAction = (route) => {
    delRightVisitedRoute(route)
    return [...visitedRoutes.value]
  }

  const delAllRoutesAction = async () => {
    await delAllVisitedRoutes()
    return {
      visitedRoutes: [...visitedRoutes.value],
    }
  }

  const delAllVisitedRoutesAction = () => {
    delAllVisitedRoutes()
    return [...visitedRoutes.value]
  }

  const updateVisitedRouteAction = (route) => {
    updateVisitedRoute(route)
  }

  return {
    // state
    visitedRoutes,
    // actions
    addVisitedRoute: addVisitedRouteAction,
    delRoute: delRouteAction,
    delVisitedRoute: delVisitedRouteAction,
    delOthersRoutes: delOthersRoutesAction,
    delLeftRoutes: delLeftRoutesAction,
    delRightRoutes: delRightRoutesAction,
    delOthersVisitedRoute: delOthersVisitedRouteAction,
    delLeftVisitedRoute: delLeftVisitedRouteAction,
    delRightVisitedRoute: delRightVisitedRouteAction,
    delAllRoutes: delAllRoutesAction,
    delAllVisitedRoutes: delAllVisitedRoutesAction,
    updateVisitedRoute: updateVisitedRouteAction,
  }
})
