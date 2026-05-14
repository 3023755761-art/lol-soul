<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStore } from '../data/score.js'
import { dimensionInfo } from '../data/champions.js'

const router = useRouter()
const store = useScoreStore()

// 直接使用保存的最终结果（不再实时计算，避免分数变化导致结果闪烁）
// 通过 store.state.finalResult 访问，保持响应式
const result = computed(() => {
  if (!store.state.finalResult) {
    return { champion: null, matchScore: 0, matchPercent: 0 }
  }
  return store.state.finalResult
})

const allScoresZero = computed(() => {
  if (!store.state.finalResult) return true
  return Object.values(store.state.finalResult.scoreSnapshot).every(v => v === 0)
})

// 使用保存的分数快照来显示维度条（结合每维度最大值做精确百分比）
const scoreSnapshot = computed(() => {
  if (store.state.finalResult && store.state.finalResult.scoreSnapshot) {
    return store.state.finalResult.scoreSnapshot
  }
  return store.state.scores
})

/**
 * 计算某个维度的条形图百分比宽度
 * 使用推导出的每维度最大分数作为分母
 */
function dimBarWidth(key, value) {
  const max = store.MAX_SCORE_PER_DIM[key]
  if (!max || value === 0) return '0%'
  return Math.min(100, Math.abs(value) / max * 100) + '%'
}

function restart() {
  store.reset()
  router.push('/')
}
</script>

<template>
  <div class="result" v-if="result.champion">
    <button class="back-btn" @click="restart">← 重新测试</button>

    <div class="result-card">
      <!-- 顶部横幅原画区域 -->
      <div class="hero-banner">
        <img :src="result.champion.image" :alt="result.champion.name" class="banner-img" />
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <div class="match-badge">天命匹配度 {{ result.matchPercent }}%</div>
          <h1 class="champ-name">{{ result.champion.name }}</h1>
          <p class="champ-title">{{ result.champion.title }}</p>
          <p class="champ-tagline">"{{ result.champion.tagline }}"</p>
        </div>
      </div>

      <!-- 下方详情区域 -->
      <div class="detail-section">
        <div class="tags">
          <span class="tag" v-for="tag in result.champion.tags" :key="tag">{{ tag }}</span>
        </div>

        <div class="meta">
          <span class="meta-item">{{ result.champion.role }}</span>
          <span class="meta-sep">|</span>
          <span class="meta-item">{{ result.champion.region }}</span>
        </div>

        <p class="description">{{ result.champion.description }}</p>

        <div class="dimensions">
          <h3 class="dim-heading">你的性格维度</h3>
          <div class="dim-list">
            <div class="dim-row" v-for="(info, key) in dimensionInfo" :key="key">
              <span class="dim-negative">{{ info.negative }}</span>
              <div class="dim-bar-wrap">
                <!-- 负方向条（左侧） -->
                <div class="dim-bar-side dim-bar-left">
                  <div
                    class="dim-bar-fill dim-negative-bar"
                    :style="{ width: scoreSnapshot[key] < 0 ? dimBarWidth(key, scoreSnapshot[key]) : '0%' }"
                  ></div>
                </div>
                <!-- 中心线 -->
                <div class="dim-center"></div>
                <!-- 正方向条（右侧） -->
                <div class="dim-bar-side dim-bar-right">
                  <div
                    class="dim-bar-fill dim-positive"
                    :style="{ width: scoreSnapshot[key] > 0 ? dimBarWidth(key, scoreSnapshot[key]) : '0%' }"
                  ></div>
                </div>
              </div>
              <span class="dim-positive-label">{{ info.positive }}</span>
            </div>
          </div>
          <p v-if="allScoresZero" class="no-score-hint">你还没有答题哦，先去测试吧~</p>
        </div>

        <button class="restart-btn" @click="restart">再测一次</button>
      </div>
    </div>
  </div>

  <!-- 没有结果时的提示 -->
  <div class="result no-result" v-else>
    <div class="no-result-card">
      <p class="no-result-text">还没有测试结果，先去答题吧~</p>
      <button class="restart-btn" @click="router.push('/')">开始测试</button>
    </div>
  </div>
</template>

<style scoped>
.result {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.05);
  color: #8b7394;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 10;
}

.back-btn:hover {
  background: rgba(139, 92, 246, 0.15);
  color: #c4b0d8;
  border-color: rgba(139, 92, 246, 0.5);
}

.result-card {
  width: 90%;
  max-width: 560px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(124, 58, 237, 0.1);
}

/* === 顶部横幅原画区域 === */
.hero-banner {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  transition: transform 0.6s ease;
}

.hero-banner:hover .banner-img {
  transform: scale(1.03);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 14, 23, 0.1) 0%,
    rgba(15, 14, 23, 0.3) 40%,
    rgba(15, 14, 23, 0.75) 70%,
    rgba(15, 14, 23, 0.95) 100%
  );
  pointer-events: none;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 28px;
  z-index: 2;
}

.match-badge {
  display: inline-block;
  padding: 4px 16px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 12px;
  letter-spacing: 0.1em;
  position: relative;
  z-index: 2;
}

.champ-name {
  font-size: 2.4rem;
  color: #f0e4ff;
  text-shadow: 0 2px 16px rgba(100, 60, 180, 0.6), 0 0 40px rgba(139, 92, 246, 0.3);
  margin: 0 0 4px;
  line-height: 1.2;
}

.champ-title {
  font-size: 1rem;
  color: #c4a8e8;
  font-style: italic;
  margin: 0 0 6px;
}

.champ-tagline {
  font-size: 0.9rem;
  color: #a78bfa;
  margin: 0;
  font-style: italic;
}

/* === 下方详情区域 === */
.detail-section {
  padding: 24px 28px 32px;
}

.tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.tag {
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  font-size: 0.8rem;
  color: #c4b0d8;
}

.meta {
  font-size: 0.85rem;
  color: #6b5f73;
  margin-bottom: 1.2rem;
  text-align: center;
}

.meta-sep {
  margin: 0 8px;
  color: #4a3f52;
}

.description {
  font-size: 0.95rem;
  color: #b8a0cc;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: left;
}

.dimensions {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
}

.dim-heading {
  font-size: 0.9rem;
  color: #8b7394;
  margin: 0 0 1rem;
  font-weight: 500;
}

.dim-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dim-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dim-negative, .dim-positive-label {
  font-size: 0.75rem;
  color: #6b5f73;
  min-width: 36px;
  text-align: center;
}

.dim-bar-wrap {
  flex: 1;
  height: 8px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.dim-bar-side {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}

.dim-bar-left {
  justify-content: flex-end;
}

.dim-bar-right {
  justify-content: flex-start;
}

.dim-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.dim-center {
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.dim-positive {
  background: linear-gradient(90deg, #a855f7, #c084fc);
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
}

.dim-negative-bar {
  background: linear-gradient(90deg, #818cf8, #a855f7);
  box-shadow: 0 0 8px rgba(129, 140, 248, 0.4);
}

.restart-btn {
  display: block;
  width: 100%;
  padding: 12px 32px;
  background: transparent;
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.restart-btn:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: #8b5cf6;
}

.no-score-hint {
  margin-top: 12px;
  font-size: 0.8rem;
  color: #8b7394;
  text-align: center;
}

/* 没有结果时的样式 */
.no-result-card {
  text-align: center;
  padding: 60px 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
}

.no-result-text {
  color: #8b7394;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}
</style>
