<template>
  <div class="pinia-guide-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="title">Pinia 状态管理使用教程</span>
        </div>
      </template>

      <el-alert
        title="本系统已从 Vuex 迁移到 Pinia"
        type="success"
        :closable="false"
        show-icon
        style="margin-bottom: 20px"
      >
        Pinia 是 Vue 官方推荐的状态管理库，比 Vuex 更简单、更轻量、类型推断更好
      </el-alert>

      <el-divider content-position="left">
        <el-icon><Document /></el-icon>
        第一步：在组件中使用 Store
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>导入并使用 Store</span>
        </template>
        <el-text tag="pre" class="code-block">
&lt;script setup&gt;
// 1. 导入需要的 store
import { useUserStore, useSettingsStore } from "@/store";

// 2. 在 setup 中调用 store 函数（类似 ref，必须在 setup 顶层调用）
const userStore = useUserStore();
const settingsStore = useSettingsStore();

// 3. 直接访问 state（不需要 .state）
console.log(userStore.accessToken);
console.log(userStore.username);

// 4. 调用 actions（不需要 dispatch）
await userStore.login({ username: "admin", password: "123456" });

// 5. 在模板中响应式使用
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;用户名：{{ userStore.username }}&lt;/p&gt;
    &lt;p&gt;布局：{{ settingsStore.layout }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
        </el-text>
      </el-card>

      <el-divider content-position="left">
        <el-icon><Setting /></el-icon>
        第二步：Store 结构说明
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>系统中的 Store 模块</span>
        </template>
        <el-table :data="storeModules" border style="width: 100%">
          <el-table-column prop="name" label="Store 名称" width="180" />
          <el-table-column prop="import" label="导入方式" width="200" />
          <el-table-column prop="description" label="功能说明" />
        </el-table>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>各 Store 的常用属性和方法</span>
        </template>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="useUserStore - 用户状态管理" name="user">
            <el-table :data="userStoreApi" border style="width: 100%">
              <el-table-column prop="type" label="类型" width="100" />
              <el-table-column prop="name" label="名称" width="180" />
              <el-table-column prop="description" label="说明" />
              <el-table-column prop="example" label="示例" width="250" />
            </el-table>
          </el-collapse-item>

          <el-collapse-item title="useSettingsStore - 系统设置" name="settings">
            <el-table :data="settingsStoreApi" border style="width: 100%">
              <el-table-column prop="type" label="类型" width="100" />
              <el-table-column prop="name" label="名称" width="180" />
              <el-table-column prop="description" label="说明" />
              <el-table-column prop="example" label="示例" width="250" />
            </el-table>
          </el-collapse-item>

          <el-collapse-item title="useRoutesStore - 路由管理" name="routes">
            <el-table :data="routesStoreApi" border style="width: 100%">
              <el-table-column prop="type" label="类型" width="100" />
              <el-table-column prop="name" label="名称" width="180" />
              <el-table-column prop="description" label="说明" />
              <el-table-column prop="example" label="示例" width="250" />
            </el-table>
          </el-collapse-item>

          <el-collapse-item title="useTabsBarStore - 标签页管理" name="tabsBar">
            <el-table :data="tabsBarStoreApi" border style="width: 100%">
              <el-table-column prop="type" label="类型" width="100" />
              <el-table-column prop="name" label="名称" width="180" />
              <el-table-column prop="description" label="说明" />
              <el-table-column prop="example" label="示例" width="250" />
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-divider content-position="left">
        <el-icon><RefreshLeft /></el-icon>
        Vuex 与 Pinia 对比
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>API 变化对照表</span>
        </template>
        <el-table :data="comparisonTable" border style="width: 100%">
          <el-table-column prop="feature" label="功能" width="140" />
          <el-table-column prop="vuex" label="Vuex" width="220" />
          <el-table-column prop="pinia" label="Pinia" width="220" />
          <el-table-column prop="note" label="说明" />
        </el-table>
      </el-card>

      <el-divider content-position="left">
        <el-icon><Memo /></el-icon>
        常见使用场景示例
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>场景一：获取用户信息并显示</span>
        </template>
        <el-text tag="pre" class="code-block">
&lt;script setup&gt;
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store";

const userStore = useUserStore();

// 方式1：直接在模板中使用 userStore.username
// 方式2：使用 computed 包装（适合需要处理数据的情况）
const displayName = computed(() => {
  return userStore.username || "未登录";
});

// 方式3：调用 action 获取用户信息
onMounted(async () => {
  await userStore.getUserInfo();
});
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;el-avatar :src="userStore.avatar" /&gt;
    &lt;span&gt;{{ displayName }}&lt;/span&gt;
    &lt;span&gt;权限：{{ userStore.permissions.join(", ") }}&lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;
        </el-text>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>场景二：登录操作</span>
        </template>
        <el-text tag="pre" class="code-block">
&lt;script setup&gt;
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();

const loginForm = ref({
  username: "",
  password: ""
});

const handleLogin = async () => {
  try {
    // 直接调用 action，不需要 dispatch
    await userStore.login(loginForm.value);

    ElMessage.success("登录成功");

    // 登录成功后跳转
    router.push("/");
  } catch (error) {
    ElMessage.error("登录失败");
  }
};
&lt;/script&gt;
        </el-text>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>场景三：修改系统设置</span>
        </template>
        <el-text tag="pre" class="code-block">
&lt;script setup&gt;
import { useSettingsStore } from "@/store";

const settingsStore = useSettingsStore();

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  settingsStore.changeCollapse();
};

// 切换布局模式
const switchLayout = (mode) => {
  settingsStore.changeLayout(mode); // "vertical" 或 "horizontal"
};

// 切换设备类型
const handleResize = () => {
  const isMobile = window.innerWidth < 768;
  settingsStore.toggleDevice(isMobile ? "mobile" : "desktop");
};
&lt;/script&gt;
        </el-text>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>场景四：在非 Vue 文件中使用 Store</span>
        </template>
        <el-alert
          title="重要提示"
          type="warning"
          :closable="false"
          style="margin-bottom: 15px"
        >
          在 router 守卫、axios 拦截器等非 Vue 文件中使用 store，确保在 pinia 创建之后
        </el-alert>
        <el-text tag="pre" class="code-block">
// src/router/permission.js（路由守卫中使用）
import { useUserStore, useRoutesStore } from "@/store";

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const routesStore = useRoutesStore();

  // 直接访问 state
  const hasToken = userStore.accessToken;

  // 调用 action
  if (hasToken) {
    const permissions = await userStore.getUserInfo();
    await routesStore.setRoutes(permissions);
  }

  next();
});
        </el-text>
      </el-card>

      <el-divider content-position="left">
        <el-icon><InfoFilled /></el-icon>
        注意事项
      </el-divider>

      <el-card shadow="hover">
        <el-alert
          v-for="(item, index) in tipsList"
          :key="index"
          :title="item.title"
          :type="item.type"
          :closable="false"
          style="margin-bottom: 10px"
        >
          <span v-html="item.content"></span>
        </el-alert>
      </el-card>

      <el-divider content-position="left">
        <el-icon><Tools /></el-icon>
        创建新的 Store
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>如何在 src/store/modules/ 下创建新的 Store</span>
        </template>
        <el-text tag="pre" class="code-block">
// src/store/modules/myModule.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 第一个参数是 store 的唯一 ID
export const useMyModuleStore = defineStore('myModule', () => {
  // state - 使用 ref
  const count = ref(0)
  const name = ref("")

  // getters - 使用 computed
  const doubleCount = computed(() => count.value * 2)

  // actions - 直接修改 state 或定义方法
  const increment = () => {
    count.value++
  }

  const setName = (newName) => {
    name.value = newName
  }

  const reset = () => {
    count.value = 0
    name.value = ""
  }

  // 返回需要暴露的属性和方法
  return {
    count,
    name,
    doubleCount,
    increment,
    setName,
    reset
  }
})

// 在 src/store/index.js 中导出
// export { useMyModuleStore } from './modules/myModule'
        </el-text>
      </el-card>

      <el-divider content-position="left">
        <el-icon><MagicStick /></el-icon>
        实战演示
      </el-divider>

      <el-card shadow="hover">
        <template #header>
          <span>在线测试 - 试试 Pinia 的响应式</span>
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="demo-box">
              <h4>当前用户信息</h4>
              <el-descriptions :column="1" border>
                <el-descriptions-item label="用户名">
                  {{ userStore?.username || '未登录' }}
                </el-descriptions-item>
                <el-descriptions-item label="Token">
                  {{ userStore?.accessToken ? '已登录' : '未登录' }}
                </el-descriptions-item>
                <el-descriptions-item label="权限">
                  <el-tag
                    v-for="perm in userStore?.permissions"
                    :key="perm"
                    size="small"
                    style="margin-right: 5px"
                  >
                    {{ perm }}
                  </el-tag>
                  <span v-if="!userStore?.permissions?.length">无</span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="demo-box">
              <h4>当前系统设置</h4>
              <el-descriptions :column="1" border>
                <el-descriptions-item label="布局模式">
                  {{ settingsStore?.layout }}
                </el-descriptions-item>
                <el-descriptions-item label="侧边栏">
                  {{ settingsStore?.collapse ? '折叠' : '展开' }}
                </el-descriptions-item>
                <el-descriptions-item label="设备类型">
                  {{ settingsStore?.device }}
                </el-descriptions-item>
                <el-descriptions-item label="标签页">
                  {{ settingsStore?.tabsBar ? '显示' : '隐藏' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24">
            <div class="demo-box">
              <h4>操作测试</h4>
              <el-space wrap>
                <el-button type="primary" @click="settingsStore?.changeCollapse()">
                  切换侧边栏
                </el-button>
                <el-button type="success" @click="settingsStore?.changeLayout('vertical')">
                  切换纵向布局
                </el-button>
                <el-button type="warning" @click="settingsStore?.changeLayout('horizontal')">
                  切换横向布局
                </el-button>
                <el-button type="info" @click="settingsStore?.toggleDevice('mobile')">
                  模拟移动端
                </el-button>
                <el-button type="info" @click="settingsStore?.toggleDevice('desktop')">
                  模拟桌面端
                </el-button>
              </el-space>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore, useSettingsStore } from "@/store";
import {
  Document,
  Setting,
  InfoFilled,
  Memo,
  Tools,
  MagicStick,
  RefreshLeft,
} from "@element-plus/icons-vue";

// 定义组件名，用于 keep-alive 缓存匹配
defineOptions({
  name: "PiniaGuideIndex",
});

// 使用 store
const userStore = useUserStore();
const settingsStore = useSettingsStore();

// 响应式数据
const activeNames = ref(["user"]);

// Store 模块列表
const storeModules = [
  {
    name: "useUserStore",
    import: 'import { useUserStore } from "@/store"',
    description: "用户信息管理，包括登录、权限、头像等",
  },
  {
    name: "useSettingsStore",
    import: 'import { useSettingsStore } from "@/store"',
    description: "系统设置管理，包括布局、主题、设备等",
  },
  {
    name: "useRoutesStore",
    import: 'import { useRoutesStore } from "@/store"',
    description: "路由管理，包括动态路由、权限路由",
  },
  {
    name: "useTabsBarStore",
    import: 'import { useTabsBarStore } from "@/store"',
    description: "多标签页管理，包括标签的增删改查",
  },
  {
    name: "useTableStore",
    import: 'import { useTableStore } from "@/store"',
    description: "代码生成器状态管理",
  },
  {
    name: "useErrorLogStore",
    import: 'import { useErrorLogStore } from "@/store"',
    description: "错误日志管理",
  },
];

// userStore API
const userStoreApi = [
  {
    type: "State",
    name: "accessToken",
    description: "访问令牌",
    example: "userStore.accessToken",
  },
  {
    type: "State",
    name: "username",
    description: "用户名",
    example: "userStore.username",
  },
  {
    type: "State",
    name: "avatar",
    description: "用户头像",
    example: "userStore.avatar",
  },
  {
    type: "State",
    name: "permissions",
    description: "权限列表",
    example: "userStore.permissions",
  },
  {
    type: "Action",
    name: "login(userInfo)",
    description: "用户登录",
    example: "await userStore.login({ username, password })",
  },
  {
    type: "Action",
    name: "getUserInfo()",
    description: "获取用户信息",
    example: "await userStore.getUserInfo()",
  },
  {
    type: "Action",
    name: "logout()",
    description: "退出登录",
    example: "await userStore.logout()",
  },
  {
    type: "Action",
    name: "setPermissions(perms)",
    description: "设置权限",
    example: "userStore.setPermissions(['admin'])",
  },
  {
    type: "Action",
    name: "resetAccessToken()",
    description: "清除令牌",
    example: "userStore.resetAccessToken()",
  },
];

// settingsStore API
const settingsStoreApi = [
  {
    type: "State",
    name: "layout",
    description: "布局模式",
    example: "settingsStore.layout",
  },
  {
    type: "State",
    name: "collapse",
    description: "侧边栏折叠状态",
    example: "settingsStore.collapse",
  },
  {
    type: "State",
    name: "device",
    description: "设备类型",
    example: "settingsStore.device",
  },
  {
    type: "State",
    name: "tabsBar",
    description: "是否显示标签页",
    example: "settingsStore.tabsBar",
  },
  {
    type: "Action",
    name: "changeLayout(mode)",
    description: "切换布局",
    example: "settingsStore.changeLayout('vertical')",
  },
  {
    type: "Action",
    name: "changeCollapse()",
    description: "切换折叠状态",
    example: "settingsStore.changeCollapse()",
  },
  {
    type: "Action",
    name: "toggleDevice(type)",
    description: "切换设备类型",
    example: "settingsStore.toggleDevice('mobile')",
  },
];

// routesStore API
const routesStoreApi = [
  {
    type: "State",
    name: "routes",
    description: "路由列表",
    example: "routesStore.routes",
  },
  {
    type: "Action",
    name: "setRoutes(permissions)",
    description: "设置权限路由",
    example: "await routesStore.setRoutes(['admin'])",
  },
  {
    type: "Action",
    name: "setAllRoutes()",
    description: "设置所有路由",
    example: "await routesStore.setAllRoutes()",
  },
];

// tabsBarStore API
const tabsBarStoreApi = [
  {
    type: "State",
    name: "visitedRoutes",
    description: "已访问的路由",
    example: "tabsBarStore.visitedRoutes",
  },
  {
    type: "Action",
    name: "addVisitedRoute(route)",
    description: "添加访问路由",
    example: "tabsBarStore.addVisitedRoute($route)",
  },
  {
    type: "Action",
    name: "delRoute(route)",
    description: "删除路由",
    example: "await tabsBarStore.delRoute($route)",
  },
  {
    type: "Action",
    name: "delOthersRoutes(route)",
    description: "删除其他路由",
    example: "await tabsBarStore.delOthersRoutes($route)",
  },
  {
    type: "Action",
    name: "delAllRoutes()",
    description: "删除所有路由",
    example: "await tabsBarStore.delAllRoutes()",
  },
];

// Vuex vs Pinia 对比
const comparisonTable = [
  {
    feature: "导入方式",
    vuex: 'import { useStore } from "vuex"',
    pinia: 'import { useUserStore } from "@/store"',
    note: "Pinia 直接导入具体 store，Vuex 导入通用 store",
  },
  {
    feature: "创建实例",
    vuex: "const store = useStore()",
    pinia: "const userStore = useUserStore()",
    note: "Pinia 每个 store 有自己的 hook 函数",
  },
  {
    feature: "读取 State",
    vuex: "store.state.user.username",
    pinia: "userStore.username",
    note: "Pinia 直接访问，不需要 .state",
  },
  {
    feature: "读取 Getters",
    vuex: "store.getters['user/username']",
    pinia: "userStore.username",
    note: "Pinia 不区分 state 和 getters，都是直接访问",
  },
  {
    feature: "调用 Actions",
    vuex: "store.dispatch('user/login', data)",
    pinia: "await userStore.login(data)",
    note: "Pinia 直接调用方法，不需要 dispatch",
  },
  {
    feature: "修改 State",
    vuex: "store.commit('user/setUsername', name)",
    pinia: "userStore.setUsername(name) 或直接修改",
    note: "Pinia 可以直接修改 state，也可以通过方法",
  },
  {
    feature: "mapState",
    vuex: "mapState('user', ['username'])",
    pinia: "直接使用 userStore.username",
    note: "Pinia 不需要辅助函数，直接使用即可",
  },
];

// 注意事项
const tipsList = [
  {
    title: "必须在 setup 顶层调用",
    type: "error",
    content: "useXxxStore() 必须在 <code>&lt;script setup&gt;</code> 的顶层调用，不能在条件语句、循环或嵌套函数中调用",
  },
  {
    title: "Store 是响应式的",
    type: "success",
    content: "直接使用 <code>userStore.username</code> 即可，不需要 <code>.value</code>（解构时需要用 toRef 或 storeToRefs）",
  },
  {
    title: "Actions 可以是异步的",
    type: "info",
    content: "Actions 中可以使用 async/await，调用时记得用 <code>await</code>",
  },
  {
    title: "支持 TypeScript",
    type: "success",
    content: "Pinia 对 TypeScript 支持非常好，有完整的类型推断",
  },
  {
    title: "DevTools 支持",
    type: "info",
    content: "Vue DevTools 完全支持 Pinia，可以查看 state、actions 和时间旅行",
  },
];
</script>

<style lang="scss" scoped>
.pinia-guide-container {
  padding: 20px;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }

  .el-divider {
    margin: 30px 0 20px;

    :deep(.el-divider__text) {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;

      .el-icon {
        margin-right: 8px;
      }
    }
  }

  .code-block {
    display: block;
    padding: 15px;
    background-color: #282c34;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #abb2bf;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto;
  }

  .demo-box {
    padding: 15px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fafafa;

    h4 {
      margin: 0 0 15px 0;
      font-size: 14px;
      color: #606266;
    }
  }

  :deep(.el-alert__content) {
    code {
      padding: 2px 6px;
      background-color: #f5f7fa;
      border-radius: 3px;
      color: #e6a23c;
      font-family: "Courier New", monospace;
    }
  }

  :deep(.el-collapse-item__header) {
    font-weight: 600;
  }
}
</style>
