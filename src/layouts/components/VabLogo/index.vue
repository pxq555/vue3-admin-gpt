<template>
  <div :class="'logo-container-' + layout">
    <router-link to="/">
      <!-- 这里是logo变更的位置 -->
       <img v-if="logo" src="@/assets/logo.png" alt="logo" class="logo">
      <span
        :class="{ 'hidden-xs-only': layout === 'horizontal' }"
        :title="title"
        class="title"
      >
        {{ title }}
      </span>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "VabLogo",
  data() {
    return {
      title: this.$baseTitle,
    };
  },
  computed: {
    ...mapGetters({
      logo: "settings/logo",
      layout: "settings/layout",
    }),
  },
};
</script>
<style lang="scss" scoped>
@mixin container {
  position: relative;
  height: $base-top-bar-height;
  overflow: hidden;
  line-height: $base-top-bar-height;
  background: $base-menu-background;
}

@mixin logo {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: 3px;
  color: #fff !important;
  fill: #fff !important;
  vertical-align: middle;
}

@mixin title {
  display: inline-block;
  overflow: hidden;
  font-size: 20px;
  line-height: 55px;
  color: $base-title-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

.logo-container-horizontal {
  @include container;

  .logo {
    @include logo;
  }

  .title {
    @include title;
  }
}

.logo-container-vertical {
  @include container;

  height: $base-logo-height;
  line-height: $base-logo-height;
  text-align: center;

  .logo {
    @include logo;
    fill: #fff !important;
  }

  .title {
    @include title;

    max-width: calc(#{$base-left-menu-width} - 60px);
  }
}
</style>
