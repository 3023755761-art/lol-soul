/**
 * 英雄联盟性格测试 - 维度计分 Store
 *
 * 用户每选一个选项，对应维度的分数会被累加。
 * 最终根据各维度得分，与英雄的维度特征向量做加权点积匹配。
 */

import { reactive, computed } from 'vue'
import { champions } from './champions.js'

const DIMENSIONS = ['aggression', 'teamwork', 'chaos', 'ambition', 'cunning', 'mysticism']

/**
 * 每维度答题可获得的最大分数（由题目库推导）
 * 算法：遍历所有题，每题取该维度权重的最大值，累加
 */
const MAX_SCORE_PER_DIM = {
  aggression: 39,
  teamwork: 48,
  chaos: 24,
  ambition: 20,
  cunning: 40,
  mysticism: 38,
}

/** 实际可能的最大点积（每题选最优选项时） */
const MAX_DOT_PRODUCT = 214

const state = reactive({
  scores: {
    aggression: 0,
    teamwork: 0,
    chaos: 0,
    ambition: 0,
    cunning: 0,
    mysticism: 0,
  },
  // 保存最终匹配结果（答完题时计算，避免后续分数重置导致结果丢失）
  finalResult: null,
})

const history = []

export function useScoreStore() {
  /**
   * 累加选项的维度权重
   * @param {Object} dimensions - { aggression: 3, chaos: 1, ... }
   */
  function addScore(dimensions) {
    const delta = {}
    for (const [key, value] of Object.entries(dimensions)) {
      if (state.scores[key] !== undefined) {
        state.scores[key] += value
        delta[key] = value
      }
    }
    history.push(delta)
  }

  /**
   * 回退上一题的分数
   */
  function undoLast() {
    const delta = history.pop()
    if (!delta) return
    for (const [key, value] of Object.entries(delta)) {
      if (state.scores[key] !== undefined) {
        state.scores[key] -= value
      }
    }
  }

  /**
   * 计算最终匹配结果并保存
   * 在答完所有题后调用一次，结果被持久化到 state.finalResult
   */
  function finalizeResult() {
    const scores = state.scores
    let bestMatch = null
    let bestScore = -Infinity

    // 找到所有英雄的匹配分
    const allMatches = []
    for (const champ of champions) {
      let matchScore = 0
      for (const [dim, weight] of Object.entries(champ.dimensions)) {
        matchScore += (scores[dim] || 0) * weight
      }
      allMatches.push({ champion: champ, matchScore })
      if (matchScore > bestScore) {
        bestScore = matchScore
        bestMatch = champ
      }
    }

    // 计算匹配百分比：基于实际可能的最大点积
    // 公式：60(保底) + (bestScore / MAX_DOT_PRODUCT) * 39 → 范围 [60, 99]
    const rawRatio = bestScore / MAX_DOT_PRODUCT
    const matchPercent = Math.min(99, Math.max(60, Math.round(60 + rawRatio * 39)))

    state.finalResult = {
      champion: bestMatch,
      matchScore: bestScore,
      matchPercent,
      // 保存分数快照（用于结果页维度条展示，不受后续 reset 影响）
      scoreSnapshot: { ...scores },
    }
  }

  /**
   * 重置所有分数和结果
   */
  function reset() {
    for (const key of DIMENSIONS) {
      state.scores[key] = 0
    }
    history.length = 0
    state.finalResult = null
  }

  /**
   * 获取当前各维度得分的标准化版本（0~100）
   * 使用 finalResult.scoreSnapshot（如有），否则用实时 scores
   * 这样在结果页展示时数据始终一致
   */
  function getNormalizedScores() {
    const source = (state.finalResult && state.finalResult.scoreSnapshot) || state.scores
    const normalized = {}
    for (const key of DIMENSIONS) {
      const raw = source[key] || 0
      const max = MAX_SCORE_PER_DIM[key]
      // 映射到 0~100：负极=0, 零分=50, 正极最大=100
      normalized[key] = Math.round(((raw + max) / (max * 2)) * 100)
    }
    return normalized
  }

  return {
    // 返回整个 state 保持响应式（不解构属性）
    state,
    addScore,
    undoLast,
    reset,
    finalizeResult,
    getNormalizedScores,
    DIMENSIONS,
    MAX_SCORE_PER_DIM,
  }
}
