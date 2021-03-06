<template>
  <div class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
    >
      <router-link
        ref="dashboard"
        :class="isDashboard()?'active':''"
        to="/"
        class="tags-view-item"
      >
        <i class="iconfont icon-dashboard" />
        {{ $t('route.dashboard') }}
      </router-link>
      <router-link
        v-for="tag in Array.from(visitedViews)"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="tag"
        :key="tag.path"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        <i
          :class="tag.icon"
          class="iconfont"
        />
        {{ generateTitle(tag.title) }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
    >
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isDashboard() {
      return this.$route.path === '/dashboard'
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      if (!tags) return
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft + 15 // 15: margin right
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.tags-view-container {
  .tags-view-wrapper {
    height: 40px;
    .tags-view-item {
      position: relative;
      display: block;
      float: left;
      margin-left: 5px;
      margin-top: 7px;
      padding: 0 12px;
      height: 26px;
      line-height: 26px;
      color: #495060;
      background: $white-8;
      font-size: 12px;
      border-radius: 13px;
      .iconfont {
        vertical-align: -1px;
        font-size: 14px;
      }
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: $btn-color-primary-8;
        color: $white-8;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: $white-3;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: $white-8;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.8);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: rgba(245, 108, 108, 1);
        color: #fff;
      }
    }
  }
}
</style>
