<template>
  <div class="demo-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="title">路由创建教程</span>
        </div>
      </template>

      <el-alert
        title="欢迎使用路由创建示例页面"
        type="success"
        :closable="false"
        show-icon
        style="margin-bottom: 20px"
      >
        本页面将帮助你了解如何在系统中创建自己的页面和路由
      </el-alert>

      <el-divider content-position="left">
        <el-icon><Document /></el-icon>
        第一步：创建页面组件
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>在 src/views/ 目录下创建你的页面组件</span>
        </template>
        <el-text tag="pre" class="code-block">
&lt;template&gt;
  &lt;div class="my-page-container"&gt;
    &lt;el-card shadow="never"&gt;
      &lt;h2&gt;我的页面&lt;/h2&gt;
      &lt;p&gt;这是我的第一个自定义页面&lt;/p&gt;
      &lt;el-button type="primary" @click="handleClick"&gt;
        点击我
      &lt;/el-button&gt;
    &lt;/el-card&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ElMessage } from "element-plus";

const handleClick = () =&gt; {
  ElMessage.success("按钮被点击了！")
};
&lt;/script&gt;

&lt;style lang="scss" scoped&gt;
.my-page-container {
  padding: 20px;
}
&lt;/style&gt;
        </el-text>
      </el-card>

      <el-divider content-position="left">
        <el-icon><Setting /></el-icon>
        第二步：配置路由
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>在 src/router/index.js 中添加路由配置</span>
        </template>
        <el-text tag="pre" class="code-block">
{
  path: "/myPage",
  component: Layout,
  redirect: "/myPage/index",
  name: "MyPage",
  meta: {
    title: "我的页面",
    icon: "star",
    roles: ["admin", "common"]
  },
  children: [
    {
      path: "index",
      name: "MyPageIndex",
      component: () =&gt; import("@/views/myPage/index"),
      meta: {
        title: "页面首页",
        icon: "star"
      }
    }
  ]
}
        </el-text>
      </el-card>

      <el-divider content-position="left">
        <el-icon><InfoFilled /></el-icon>
        路由配置说明
      </el-divider>

      <el-table :data="routerConfig" border style="width: 100%">
        <el-table-column prop="field" label="配置项" width="140" />
        <el-table-column prop="description" label="说明" />
        <el-table-column prop="example" label="示例" width="200" />
      </el-table>

      <el-alert
        title="重要：组件名必须与路由 name 一致"
        type="warning"
        :closable="false"
        show-icon
        style="margin-top: 15px"
      >
        keep-alive 缓存是通过组件的 <code>name</code> 属性来匹配的，因此组件的 <code>name</code> 必须与路由配置中的 <code>name</code> 完全一致，缓存才能生效。<br><br>
        例如：路由中 <code>name: "ExampleIndex"</code>，则组件中必须定义 <code>export default { name: "ExampleIndex" }</code> 或 <code>defineOptions({ name: "ExampleIndex" })</code>
      </el-alert>

      <el-divider content-position="left">
        <el-icon><Memo /></el-icon>
        第三步：页面缓存机制详解
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>缓存工作原理</span>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="实现位置">
            src/layouts/components/VabAppMain/index.vue
          </el-descriptions-item>
          <el-descriptions-item label="核心代码">
            <el-text tag="pre" class="code-block-small">
&lt;router-view v-slot="{ Component }"&gt;
  &lt;transition mode="out-in" name="fade-transform"&gt;
    &lt;keep-alive :include="cachedRoutes" :max="keepAliveMaxNum"&gt;
      &lt;component :is="Component" /&gt;
    &lt;/keep-alive&gt;
  &lt;/transition&gt;
&lt;/router-view&gt;
            </el-text>
          </el-descriptions-item>
          <el-descriptions-item label="缓存判断">
            根据 meta.noKeepAlive 属性判断是否缓存，false 时缓存
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>如何控制页面缓存</span>
        </template>
        <el-alert
          title="缓存配置说明"
          type="info"
          :closable="false"
          style="margin-bottom: 15px"
        >
          在路由 meta 中配置 <code>noKeepAlive</code> 属性
        </el-alert>
        <el-table :data="cacheConfig" border style="width: 100%">
          <el-table-column prop="config" label="配置方式" width="180" />
          <el-table-column prop="effect" label="效果" />
          <el-table-column prop="useCase" label="适用场景" />
        </el-table>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>缓存测试示例</span>
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="cache-test-box">
              <h4>不缓存页面（每次刷新）</h4>
              <el-input
                v-model="noCacheInput"
                placeholder="输入内容后切换标签再回来"
                style="margin-bottom: 10px"
              />
              <el-button size="small" type="info" disabled>
                noKeepAlive: true
              </el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="cache-test-box">
              <h4>缓存页面（保持状态）</h4>
              <el-input
                v-model="cacheInput"
                placeholder="输入内容后切换标签再回来"
                style="margin-bottom: 10px"
              />
              <el-button size="small" type="success" disabled>
                noKeepAlive: false
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-divider content-position="left">
        <el-icon><Tools /></el-icon>
        第四步：系统配置详解
      </el-divider>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>setting.config.js 重要配置项</span>
        </template>
        <el-table :data="settingConfig" border style="width: 100%">
          <el-table-column prop="field" label="配置项" width="160" />
          <el-table-column prop="defaultValue" label="默认值" width="150" />
          <el-table-column prop="description" label="说明" />
        </el-table>
      </el-card>

      <el-card shadow="hover" style="margin-bottom: 20px">
        <template #header>
          <span>theme.config.js 重要配置项</span>
        </template>
        <el-table :data="themeConfig" border style="width: 100%">
          <el-table-column prop="field" label="配置项" width="140" />
          <el-table-column prop="defaultValue" label="默认值" width="140" />
          <el-table-column prop="description" label="说明" />
          <el-table-column prop="options" label="可选值" />
        </el-table>
      </el-card>

      <el-divider content-position="left">
        <el-icon><MagicStick /></el-icon>
        第五步：常用组件示例
      </el-divider>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" style="margin-bottom: 20px">
            <template #header>
              <span>按钮示例</span>
            </template>
            <div class="button-demo">
              <el-button type="primary">主要按钮</el-button>
              <el-button type="success">成功按钮</el-button>
              <el-button type="warning">警告按钮</el-button>
              <el-button type="danger">危险按钮</el-button>
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card shadow="hover" style="margin-bottom: 20px">
            <template #header>
              <span>消息提示示例</span>
            </template>
            <div class="message-demo">
              <el-button @click="showSuccess">成功消息</el-button>
              <el-button @click="showWarning">警告消息</el-button>
              <el-button @click="showError">错误消息</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-card shadow="hover">
        <template #header>
          <span>数据表格示例</span>
        </template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="address" label="地址" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Document,
  Setting,
  InfoFilled,
  MagicStick,
  Memo,
  Tools,
} from "@element-plus/icons-vue";

// 定义组件名，用于 keep-alive 缓存匹配
defineOptions({
  name: "ExampleIndex",
});

// 响应式数据
const noCacheInput = ref("");
const cacheInput = ref("");

const routerConfig = [
  {
    field: "path",
    description: "路由路径",
    example: "/myPage",
  },
  {
    field: "component",
    description: "父级布局组件",
    example: "Layout / EmptyLayout",
  },
  {
    field: "redirect",
    description: "重定向路径",
    example: "/myPage/index",
  },
  {
    field: "name",
    description: "路由名称（唯一），必须与组件的 name 完全一致才能缓存",
    example: "MyPage",
  },
  {
    field: "meta.title",
    description: "页面标题",
    example: "我的页面",
  },
  {
    field: "meta.icon",
    description: "菜单图标",
    example: "star, user, setting 等",
  },
  {
    field: "meta.roles",
    description: "访问权限",
    example: "['admin', 'common']",
  },
  {
    field: "meta.noKeepAlive",
    description: "是否不缓存页面（true=不缓存）",
    example: "true / false",
  },
];

const cacheConfig = [
  {
    config: "meta: { noKeepAlive: true }",
    effect: "页面不缓存，每次访问都重新渲染",
    useCase: "登录页、注册页、详情页等需要实时数据的页面",
  },
  {
    config: "meta: { noKeepAlive: false } 或不设置",
    effect: "页面会被缓存，保持滚动位置和表单状态",
    useCase: "列表页、表单页等需要保持用户操作状态的页面",
  },
];

const settingConfig = [
  {
    field: "loginInterception",
    defaultValue: "false",
    description: "是否开启登录拦截。true=未登录自动跳转登录页，false=不拦截",
  },
  {
    field: "keepAliveMaxNum",
    defaultValue: "99",
    description: "路由缓存的最大数量，超过限制后最早缓存的页面会被清除",
  },
  {
    field: "routesWhiteList",
    defaultValue: "[/login, /register, /404, /401]",
    description: "路由白名单，这些路径不需要token校验即可访问",
  },
  {
    field: "tokenName",
    defaultValue: "accessToken",
    description: "token的名称，用于请求头和存储",
  },
  {
    field: "tokenTableName",
    defaultValue: "vue-admin-better-2024",
    description: "token在localStorage/sessionStorage中存储的key名称",
  },
  {
    field: "storage",
    defaultValue: "localStorage",
    description: "token存储方式，可选 localStorage 或 sessionStorage",
  },
  {
    field: "recordRoute",
    defaultValue: "true",
    description: "token失效回退登录页时是否记录当前路由，登录后可返回原页面",
  },
  {
    field: "authentication",
    defaultValue: "intelligence",
    description: "权限验证方式：intelligence（后端只控制permissions）或 all（完全由后端控制）",
  },
  {
    field: "title",
    defaultValue: "vue-admin-better",
    description: "系统标题，显示在页面、浏览器标签和加载屏",
  },
  {
    field: "devPort",
    defaultValue: "8091",
    description: "开发环境端口号",
  },
  {
    field: "routerMode",
    defaultValue: "hash",
    description: "路由模式：hash（URL带#号）或 history（URL干净，需服务器配置）",
  },
];

const themeConfig = [
  {
    field: "header",
    defaultValue: "fixed",
    description: "头部固定方式",
    options: "fixed（固定）/ noFixed（不固定）",
  },
  {
    field: "layout",
    defaultValue: "vertical",
    description: "布局模式",
    options: "vertical（纵向菜单）/ horizontal（横向菜单）",
  },
  {
    field: "themeBar",
    defaultValue: "true",
    description: "是否显示主题配置按钮（右上角设置图标）",
    options: "true / false",
  },
  {
    field: "tabsBar",
    defaultValue: "true",
    description: "是否显示多标签页导航",
    options: "true / false",
  },
];

const tableData = [
  {
    date: "2024-01-01",
    name: "张三",
    address: "北京市朝阳区",
  },
  {
    date: "2024-01-02",
    name: "李四",
    address: "上海市浦东新区",
  },
  {
    date: "2024-01-03",
    name: "王五",
    address: "广州市天河区",
  },
];

// 方法
const showSuccess = () => {
  ElMessage.success("这是一条成功消息！");
};

const showWarning = () => {
  ElMessage.warning("这是一条警告消息！");
};

const showError = () => {
  ElMessage.error("这是一条错误消息！");
};

const handleEdit = (row) => {
  ElMessage.info(`编辑：${row.name}`);
};

const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除 ${row.name} 吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
</script>

<style lang="scss" scoped>
.demo-container {
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
    background-color: #f5f7fa;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #303133;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto;
  }

  .code-block-small {
    display: block;
    padding: 10px;
    background-color: #f5f7fa;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 12px;
    line-height: 1.5;
    color: #303133;
    overflow-x: auto;
  }

  .button-demo,
  .message-demo {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .cache-test-box {
    padding: 15px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fafafa;

    h4 {
      margin: 0 0 10px 0;
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
}
</style>
