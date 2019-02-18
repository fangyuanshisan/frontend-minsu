<template>
  <div class="menu-wrapper">
    <template
      v-for="item in routes"
      v-if="!item.hidden && item.children"
    >

      <router-link
        v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
        :to="item.path + '/' + item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item
          :index="item.path + '/' + item.children[0].path"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <i
            v-if="item.children[0].meta && item.children[0].meta.icon"
            :class="item.children[0].meta.icon"
            class="iconfont"
          />
          <el-badge
            v-if="item.todoCount"
            :value="item.todoCount"
            class="mark"
          />
          <span
            v-if="item.children[0].meta&&item.children[0].meta.title"
            slot="title"
          >{{ generateTitle(item.children[0].meta.title) }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu
        v-else
        :index="item.name || item.path"
        :key="item.name"
      >
        <template slot="title">
          <i
            v-if="item.meta && item.meta.icon"
            :class="item.meta.icon"
            class="iconfont"
          />
          <el-badge
            v-if="item.todoCount"
            :value="item.todoCount"
            class="mark"
          />
          <span
            v-if="item.meta && item.meta.title"
            slot="title"
          >{{ generateTitle(item.meta.title) }}</span>
        </template>

        <template
          v-for="child in item.children"
          v-if="!child.hidden"
        >
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :routes="[child]"
            :key="child.path"
            :is-nest="true"
            class="nest-menu"
          />

          <router-link
            v-else
            :to="item.path+'/'+child.path"
            :key="child.name"
          >
            <el-menu-item :index="item.path+'/'+child.path">
              <i
                v-if="child.meta && child.meta.icon"
                :class="child.meta.icon"
                class="iconfont"
              />
              <span
                v-if="child.meta && child.meta.title"
                slot="title"
              >{{ generateTitle(child.meta.title) }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
      default: null
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.renderParameter(this.routes, 'category')
    this.renderParameter(this.routes, 'type')
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle,
    renderParameter(routers, parameter) {
      const reg = new RegExp(':' + parameter, 'g')
      for (const keys in routers) {
        if (Object.prototype.hasOwnProperty.call(routers, keys)) {
          if (routers[keys][parameter]) {
            routers[keys]['path'] = routers[keys]['path'].replace(
              reg,
              routers[keys][parameter]
            )
          }
          if (routers[keys]['children']) {
            this.renderParameter(routers[keys]['children'], parameter)
          }
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../../styles/mixin';
.menu-wrapper {
  .el-badge {
    position: absolute;
    top: -10px;
    z-index: 100;
    margin-left: -8px;
    $an1: (
      opacity: 0,
      transform: scale3d(0.1, 0.1, 0.1)
    );
    $an2: (
      opacity: 1,
      transform: scale3d(1, 1, 1)
    );
    $an3: (
      opacity: 0,
      transform: scale3d(0.1, 0.1, 0.1)
    );
    $demo: (
      0%: $an1,
      50%: $an2,
      100%: $an3
    );
    @include keyframes(zoomInOut, $demo);
    @include animation(zoomInOut 2s ease-in-out infinite);
    animation-delay: 0.5s;
  }
}
</style>