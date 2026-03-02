/**
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getUserInfo, login, logout } from "@/api/user"
import {
  getAccessToken as getAccessTokenFunction,
  removeAccessToken,
  setAccessToken,
} from "@/utils/accessToken"
import {RSA} from '@/utils/password'
import { resetRouter } from "@/router"
import { title, tokenName } from "@/config"
import { ElMessage } from "element-plus"

// 默认头像列表
const defaultAvatars = [
  "https://oss.gempharmatech.com/upload/file/20230918/0e900403-d8bc-4fc8-ae25-8eeeaa8df6e0.png",
  "https://oss.gempharmatech.com/upload/file/20230918/246c4a2d-2e6e-41eb-890a-2cf1ba6b4744.png",
  "https://oss.gempharmatech.com/upload/file/20230918/3f0a875a-502b-45bc-b26f-a2cb85477a31.png",
  "https://oss.gempharmatech.com/upload/file/20230918/9345aac3-dcb7-4db3-a4ce-2a8dd258a753.png",
  "https://oss.gempharmatech.com/upload/file/20230918/4f952091-6de6-464c-a1a6-12d7d5b51afb.png",
  "https://oss.gempharmatech.com/upload/file/20230918/6d214d7b-bf3f-4dae-a94b-5606e94185c8.png",
  "https://oss.gempharmatech.com/upload/file/20230918/60d7acc8-e9ca-4ad1-856a-d2af64e4451c.png",
  "https://oss.gempharmatech.com/upload/file/20230918/50e58f52-379f-447f-9d85-ac2d7647571c.png",
  "https://oss.gempharmatech.com/upload/file/20230918/9858572c-3573-465e-8a53-448ee49fb581.png",
  "https://oss.gempharmatech.com/upload/file/20230918/247a199b-b69e-42b4-83e4-7f3ef76abe36.png",
  "https://oss.gempharmatech.com/upload/file/20230918/e7f32c72-187c-47ed-894a-f25227711da2.png",
  "https://oss.gempharmatech.com/upload/file/20230918/51d19975-d527-43ed-8cb3-afa3bf0ea7d2.png",
  "https://oss.gempharmatech.com/upload/file/20230918/537a52d8-7d5e-41b9-ae3b-1a656c2971b3.png",
  "https://oss.gempharmatech.com/upload/file/20230918/13812b25-f42f-4826-a2eb-ad7166a9b668.png"
]

// 随机获取一个默认头像
const getRandomAvatar = () => {
  return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
}



export const useUserStore = defineStore('user', () => {
  // state
  const accessToken = ref(getAccessTokenFunction())
  const username = ref("")
  const avatar = ref(getRandomAvatar())
  const permissions = ref([])

  // getters
  const getAccessToken = computed(() => accessToken.value)
  const getUsername = computed(() => username.value)
  const getAvatar = computed(() => avatar.value)
  const getPermissions = computed(() => permissions.value)

  // actions
  const setAccessTokenAction = (token) => {
    accessToken.value = token
    setAccessToken(token)
  }

  const setUsername = (name) => {
    username.value = name
  }

  const setAvatar = (avatarUrl) => {
    avatar.value = avatarUrl
  }

  const setPermissionsAction = (perms) => {
    permissions.value = perms
  }

  const setPermissions = (perms) => {
    setPermissionsAction(perms)
  }

  const loginAction = async (userInfo) => {
    // const { data } = await login(userInfo);
    let params = {
      customerName: userInfo.username,
      password: RSA(userInfo.password),
    }
    const { data } = await login(params)
    const token = data
    if (token) {
      setAccessTokenAction(token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? "早上好"
          : hour <= 11
          ? "上午好"
          : hour <= 13
          ? "中午好"
          : hour < 18
          ? "下午好"
          : "晚上好"
      ElMessage.success(`欢迎登录${title}，${thisTime}！`)
    } else {
      ElMessage.error(`登录接口异常，未正确返回${tokenName}...`)
    }
  }

  const getUserInfoAction = async () => {
    try {
      const { data } = await getUserInfo(accessToken.value)
      if (!data) {
        ElMessage.error("验证失败，请重新登录...")
        return false
      }
      let { permissions: perms, name: name, avatar: avatarUrl } = data
      if (perms && name && Array.isArray(perms)) {
        setPermissionsAction(perms)
        setUsername(name)
        setAvatar(avatarUrl)
        return perms
      } else {
        ElMessage.error("用户信息接口异常")
        return false
      }
    } catch (error) {
      console.error("获取用户信息失败:", error)
      ElMessage.error("获取用户信息失败，请重新登录")
      return false
    }
  }

  const logoutAction = async () => {
    await logout(accessToken.value)
    await resetAccessTokenAction()
    await resetRouter()
    location.reload()
  }

  const resetAccessTokenAction = () => {
    setPermissionsAction([])
    setAccessTokenAction("")
    removeAccessToken()
  }

  return {
    // state
    accessToken,
    username,
    avatar,
    permissions,
    // getters
    getAccessToken,
    getUsername,
    getAvatar,
    getPermissions,
    // actions
    setAccessToken: setAccessTokenAction,
    setUsername,
    setAvatar,
    setPermissions,
    login: loginAction,
    getUserInfo: getUserInfoAction,
    logout: logoutAction,
    resetAccessToken: resetAccessTokenAction,
  }
})
