<script setup>
import { useRouter } from 'vue-router'
import { useScoreStore } from '../data/score.js'

const router = useRouter()
const store = useScoreStore()

function startQuiz() {
  store.reset()
  router.push('/quiz')
}
</script>

<template>
  <div class="home">
    <div class="home-content">
      <div class="logo-area">
        <div class="logo-glow"></div>
        <h1 class="title">天命之人</h1>
        <p class="subtitle">英雄联盟性格测试</p>
      </div>

      <p class="desc">
        24道灵魂拷问，匹配与你性格最像的英雄。<br>
        你，到底是谁？
      </p>

      <button class="start-btn" @click="startQuiz">
        <span class="btn-text">揭开你的天命</span>
        <span class="btn-arrow">→</span>
      </button>

      <p class="hint">无需了解英雄联盟即可作答</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.home-content {
  text-align: center;
  max-width: 420px;
}

.logo-area {
  position: relative;
  margin-bottom: 2rem;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.title {
  font-size: 3rem;
  font-weight: 600;
  background: linear-gradient(135deg, #c084fc, #818cf8, #c084fc);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease infinite;
  margin: 0;
  letter-spacing: 0.15em;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.subtitle {
  font-size: 1rem;
  color: #8b7394;
  margin-top: 0.5rem;
  letter-spacing: 0.3em;
}

.desc {
  font-size: 1rem;
  color: #b8a0cc;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 40px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(124, 58, 237, 0.5);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.start-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.hint {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: #6b5f73;
}
</style>
