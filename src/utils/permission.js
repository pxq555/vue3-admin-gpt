import { useUserStore } from '@/store'

/**
 * @description 检查权限
 * @param value
 * @returns {boolean}
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const userStore = useUserStore()
    const permissions = userStore.permissions
    const permissionPermissions = value

    return permissions.some((role) => {
      return permissionPermissions.includes(role)
    })
  } else {
    return false
  }
}
