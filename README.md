<div align="center">
  <h1>Vue3 Admin GPT</h1>
  <p>一个基于 Vue 3 + Element Plus + Rspack 的后台管理系统脚手架</p>
</div>

## 特性

- 基于 Vue 3 + Element Plus + Rspack 构建
- 支持多主题切换、多布局模式
- 响应式设计，支持 PC、平板、手机
- 完善的路由和状态管理
- Mock 数据支持
- 代码简洁，易于扩展

## 快速开始

### 使用 CLI 工具创建项目

```bash
# 使用 npm
npm create vue3-admin-gpt my-project

# 或使用 npx
npx create-vue3-admin-gpt my-project

# 或全局安装 CLI
npm install -g vue3-admin-gpt
create-vue3-admin-gpt my-project
```

### 手动安装

```bash
# 克隆项目
git clone https://github.com/pxq555/vue3-admin-gpt.git my-project
cd my-project

# 安装依赖
npm install

# 启动开发服务器
npm run serve:rspack

# 构建生产版本
npm run build
```

## 项目结构

```
vue3-admin-gpt/
├── src/
│   ├── api/              # API 接口
│   ├── assets/           # 静态资源
│   ├── components/       # 通用组件
│   ├── config/           # 配置文件
│   ├── layouts/          # 布局组件
│   ├── plugins/          # 插件
│   ├── router/           # 路由配置
│   ├── store/            # Vuex 状态管理
│   ├── styles/           # 样式文件
│   ├── utils/            # 工具函数
│   └── views/            # 页面组件
├── public/               # 公共资源
├── mock/                 # Mock 服务
├── .env.development      # 开发环境配置
├── .env.production       # 生产环境配置
├── rspack.config.js      # Rspack 构建配置
└── package.json          # 项目配置
```

## 配置说明

主要配置文件位于 `src/config/` 目录：

- `index.js` - 主配置入口
- `setting.config.js` - 通用配置（标题、端口号、路由模式等）
- `theme.config.js` - 主题配置
- `net.config.js` - 网络请求配置

## 开发命令

```bash
# 启动开发服务器
npm run serve:rspack

# 构建生产版本
npm run build

# 构建并打包为 zip
npm run build:zip
```

## 浏览器支持

现代浏览器和 IE 11+

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
