<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { pickRandomBackground } from './data/prestige.js'

const route = useRoute()
const bgUrl = ref('')
const bgLoaded = ref(false)

// 上一次触发换壁纸的路由，防止同一路由内重复刷新
let lastBgRoute = ''

/**
 * 选一张新壁纸并预加载
 */
function refreshBackground() {
  bgLoaded.value = false
  const url = pickRandomBackground()
  const img = new Image()
  img.onload = () => {
    bgUrl.value = url
    bgLoaded.value = true
  }
  img.onerror = () => {
    // 加载失败也显示（用纯黑背景兜底）
    bgUrl.value = url
    bgLoaded.value = true
  }
  img.src = url
}

onMounted(() => {
  // 首次进入，选一张壁纸
  lastBgRoute = route.path
  refreshBackground()
})

// 结果页不显示背景（让英雄卡片自己突出）
const showBg = computed(() => {
  return route.path !== '/result'
})

// 路由变化时判断是否需要换壁纸
watch(() => route.path, (newPath) => {
  if (newPath === '/' && lastBgRoute !== '/') {
    // 从其他页面回到首页 → 换一张新壁纸
    refreshBackground()
  }
  lastBgRoute = newPath
})
</script>

<template>
  <div class="app-root">
    <!-- 臻彩原画背景 -->
    <transition name="bg-fade">
      <div
        v-if="bgLoaded && showBg && bgUrl"
        class="prestige-bg"
        :style="{ backgroundImage: `url(${bgUrl})` }"
      ></div>
    </transition>
    <!-- 暗色遮罩 -->
    <div v-if="showBg" class="bg-overlay"></div>
    <router-view />
  </div>
</template>

<style>
.app-root {
  position: relative;
  min-height: 100vh;
}

.prestige-bg {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
  animation: bgZoom 30s ease-in-out infinite alternate;
}

/* 横屏（桌面/平板横屏）：居中铺满，展示完整构图 */
@media (orientation: landscape) {
  .prestige-bg {
    background-position: center center;
  }
}

/* 竖屏（手机竖屏）：偏上居中，突出角色主体 */
@media (orientation: portrait) {
  .prestige-bg {
    background-position: center 25%;
    background-size: auto 100%;
    /* 竖屏时图片宽度可能不够，用 auto 100% 让高度铺满，
       宽度自动裁剪两侧，角色主体在 25% 处 */
  }
}

/* 极窄竖屏（手机），进一步优化 */
@media (max-width: 480px) and (orientation: portrait) {
  .prestige-bg {
    background-position: center 30%;
  }
}

@keyframes bgZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

.bg-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* 竖屏遮罩：更重的顶部遮罩，底部稍透明以展示角色 */
@media (orientation: portrait) {
  .bg-overlay {
    background: linear-gradient(
      180deg,
      rgba(15, 14, 23, 0.6) 0%,
      rgba(15, 14, 23, 0.55) 30%,
      rgba(15, 14, 23, 0.75) 70%,
      rgba(15, 14, 23, 0.92) 100%
    );
  }
}

/* 横屏遮罩：原方案，均匀变暗 */
@media (orientation: landscape) {
  .bg-overlay {
    background: linear-gradient(
      180deg,
      rgba(15, 14, 23, 0.45) 0%,
      rgba(15, 14, 23, 0.7) 40%,
      rgba(15, 14, 23, 0.88) 100%
    );
  }
}

.bg-fade-enter-active {
  transition: opacity 1.5s ease;
}
.bg-fade-leave-active {
  transition: opacity 0.5s ease;
}
.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}

/* 确保内容在背景之上 */
.home, .quiz, .result {
  position: relative;
  z-index: 2;
}
</style>
