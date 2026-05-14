<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { questions } from '../data/questions.js'
import { useScoreStore } from '../data/score.js'

const router = useRouter()
const store = useScoreStore()
const current = ref(0)
const selected = ref(null)
const fading = ref(false)

const question = computed(() => questions[current.value])
const progress = computed(() => ((current.value) / questions.length) * 100)

function selectOption(option) {
  if (fading.value) return
  selected.value = option.id
  store.addScore(option.dimensions)

  fading.value = true
  setTimeout(() => {
    if (current.value < questions.length - 1) {
      current.value++
      selected.value = null
      fading.value = false
    } else {
      // 最后一题：先计算并保存结果，再跳转
      store.finalizeResult()
      router.push('/result')
    }
  }, 400)
}

function goBack() {
  // 过渡动画期间禁止返回，防止分数不同步
  if (fading.value) return
  if (current.value > 0) {
    store.undoLast()
    current.value--
    selected.value = null
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="quiz">
    <button class="back-btn" @click="goBack">{{ current === 0 ? '← 返回首页' : '← 上一题' }}</button>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="progress-text">{{ current + 1 }} / {{ questions.length }}</p>

    <transition name="fade">
      <div class="question-card" :key="current" :class="{ 'fade-out': fading }">
        <h2 class="question-text">{{ question.text }}</h2>
        <div class="options">
          <button
            v-for="opt in question.options"
            :key="opt.id"
            class="option-btn"
            :class="{ selected: selected === opt.id }"
            @click="selectOption(opt)"
          >
            {{ opt.text }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.quiz {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
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

.progress-bar {
  width: 80%;
  max-width: 500px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #818cf8);
  transition: width 0.4s ease;
  border-radius: 2px;
}

.progress-text {
  margin-top: 12px;
  font-size: 0.85rem;
  color: #8b7394;
}

.question-card {
  margin-top: 40px;
  width: 90%;
  max-width: 560px;
  text-align: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.question-card.fade-out {
  opacity: 0;
  transform: translateY(-10px);
}

.question-text {
  font-size: 1.3rem;
  color: #e8d5f5;
  line-height: 1.7;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(200, 150, 255, 0.2);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  padding: 14px 24px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #c4b0d8;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;
}

.option-btn:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.6);
  color: #e8d5f5;
  transform: translateX(4px);
}

.option-btn.selected {
  background: rgba(139, 92, 246, 0.25);
  border-color: #8b5cf6;
  color: #fff;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.1s ease;
}
</style>
