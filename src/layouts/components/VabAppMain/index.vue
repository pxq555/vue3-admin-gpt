<template>
  <div class="app-main-container">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
          <component :is="Component" class="app-main-height" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- <footer v-show="footerCopyright" class="footer-copyright">
    </footer> -->
  </div>
</template>

<script>
import { copyright, footerCopyright, keepAliveMaxNum, title } from "@/config";
import { CopyDocument } from "@element-plus/icons-vue";
import eventBus from "@/utils/eventBus";
import { useTabsBarStore, useSettingsStore } from "@/store";

export default {
  name: "VabAppMain",
  components: {
    CopyDocument,
  },
  data() {
    return {
      show: false,
      fullYear: new Date().getFullYear(),
      copyright,
      title,
      keepAliveMaxNum,
      routerView: true,
      footerCopyright,
      tabsBarStore: useTabsBarStore(),
      settingsStore: useSettingsStore(),
    };
  },
  computed: {
    visitedRoutes() {
      return this.tabsBarStore.visitedRoutes;
    },
    device() {
      return this.settingsStore.device;
    },
    cachedRoutes() {
      const cachedRoutesArr = [];
      this.visitedRoutes.forEach((item) => {
        if (!item.meta.noKeepAlive) {
          cachedRoutesArr.push(item.name);
        }
      });
      return cachedRoutesArr;
    },
    key() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      handler(route) {
        if ("mobile" === this.device) this.foldSideBar();
      },
      immediate: true,
    },
  },
  created() {
    // 监听事件总线中的reload-router-view事件
    eventBus.on("reload-router-view", this.reloadRouterView);
  },
  beforeUnmount() {
    // 组件销毁前移除事件监听
    eventBus.off("reload-router-view", this.reloadRouterView);
  },
  mounted() {},
  methods: {
    foldSideBar() {
      this.settingsStore.foldSideBar();
    },
    // 重新加载路由视图
    reloadRouterView() {
      this.routerView = false;
      this.$nextTick(() => {
        this.routerView = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main-container {
  position: relative;
  width: 100%;
  overflow: hidden;

  .vab-keel {
    margin: $base-padding;
  }

  .app-main-height {
    min-height: $base-app-main-height;
  }

  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed $base-border-color;
  }
}
</style>
