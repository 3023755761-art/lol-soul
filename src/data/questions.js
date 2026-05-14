/**
 * 英雄联盟性格测试 - 题目库
 *
 * 每个选项的 dimensions 对象：
 *   键 = 维度名，值 = 权重 (-3 ~ +3)
 *   正值 = 该维度的"正极"方向
 *   负值 = 该维度的"负极"方向
 *
 * 24题 = 12道现实情境题 + 12道价值观题
 */

export const questions = [
  // ===== 现实情境题（1-12）=====

  {
    id: 1,
    text: '和朋友约好出门，对方迟到了半小时还没到，你会？',
    options: [
      { id: 'a', text: '直接打电话催，等不了就撤', dimensions: { aggression: 2, chaos: 1 } },
      { id: 'b', text: '嘴上不说，心里默默记一笔', dimensions: { cunning: 2, aggression: -1 } },
      { id: 'c', text: '没事，反正我也刚到不久', dimensions: { teamwork: 1, chaos: -1 } },
      { id: 'd', text: '趁机逛逛附近的店，不白等', dimensions: { chaos: 1, mysticism: 1 } },
    ]
  },
  {
    id: 2,
    text: '小组作业分到你不擅长的部分，你会？',
    options: [
      { id: 'a', text: '硬着头皮上，做不好也得做', dimensions: { aggression: 2, ambition: 1 } },
      { id: 'b', text: '悄悄找擅长的人换个分工', dimensions: { cunning: 2, chaos: 1 } },
      { id: 'c', text: '跟组员一起做，互相补位', dimensions: { teamwork: 3, ambition: -1 } },
      { id: 'd', text: '先研究一下，说不定能学会', dimensions: { mysticism: 2, cunning: 1 } },
    ]
  },
  {
    id: 3,
    text: '朋友被人在背后说坏话，你知道了会怎么做？',
    options: [
      { id: 'a', text: '直接去找那个人当面对质', dimensions: { aggression: 3, teamwork: 1 } },
      { id: 'b', text: '先告诉朋友，让ta自己决定', dimensions: { teamwork: 2, cunning: 1 } },
      { id: 'c', text: '找机会让那个人也难堪一次', dimensions: { cunning: 2, chaos: 1 } },
      { id: 'd', text: '观察一下情况再决定要不要管', dimensions: { cunning: 1, chaos: -1 } },
    ]
  },
  {
    id: 4,
    text: '周末没有什么安排，你更可能？',
    options: [
      { id: 'a', text: '约人出去吃饭逛街', dimensions: { teamwork: 1, chaos: 1 } },
      { id: 'b', text: '宅在家追剧或打游戏', dimensions: { teamwork: -2, mysticism: 1 } },
      { id: 'c', text: '去尝试一家新开的店', dimensions: { chaos: 2, aggression: 1 } },
      { id: 'd', text: '研究一个最近感兴趣的东西', dimensions: { mysticism: 2, cunning: 1 } },
    ]
  },
  {
    id: 5,
    text: '你在团队里更像哪种人？',
    options: [
      { id: 'a', text: '冲在前面带节奏的人', dimensions: { aggression: 2, ambition: 1 } },
      { id: 'b', text: '默默把事情安排好的人', dimensions: { cunning: 2, chaos: -1 } },
      { id: 'c', text: '谁需要帮忙就帮谁的人', dimensions: { teamwork: 3, ambition: -2 } },
      { id: 'd', text: '经常提出不同思路的人', dimensions: { mysticism: 2, chaos: 1 } },
    ]
  },
  {
    id: 6,
    text: '遇到不公平的事，你的反应更接近？',
    options: [
      { id: 'a', text: '当场就要说清楚，不能忍', dimensions: { aggression: 3, chaos: 1 } },
      { id: 'b', text: '想办法用合理的方式争取回来', dimensions: { cunning: 2, chaos: -1 } },
      { id: 'c', text: '找能帮忙的人一起想办法', dimensions: { teamwork: 2, ambition: -1 } },
      { id: 'd', text: '先冷静想想值不值得计较', dimensions: { mysticism: 1, aggression: -1 } },
    ]
  },
  {
    id: 7,
    text: '你更倾向哪种处事方式？',
    options: [
      { id: 'a', text: '先行动再想，做了再说', dimensions: { aggression: 2, chaos: 1 } },
      { id: 'b', text: '凡事想清楚再动手', dimensions: { cunning: 1, chaos: -2 } },
      { id: 'c', text: '跟着大家走，不会出大错', dimensions: { teamwork: 2, ambition: -1 } },
      { id: 'd', text: '跟着感觉走，相信直觉', dimensions: { mysticism: 2, chaos: 1 } },
    ]
  },
  {
    id: 8,
    text: '有人找你帮忙，但你其实很忙，你会？',
    options: [
      { id: 'a', text: '直接说没空，别来烦我', dimensions: { aggression: 2, teamwork: -2 } },
      { id: 'b', text: '嘴上答应，但拖着看情况', dimensions: { cunning: 1, chaos: 1 } },
      { id: 'c', text: '先放一放自己的事帮别人', dimensions: { teamwork: 3, ambition: -1 } },
      { id: 'd', text: '看什么事，有用就帮', dimensions: { cunning: 1, mysticism: 1 } },
    ]
  },
  {
    id: 9,
    text: '你更能接受哪种遗憾？',
    options: [
      { id: 'a', text: '试了但失败了', dimensions: { aggression: 1, ambition: 2 } },
      { id: 'b', text: '被骗了但过程很开心', dimensions: { chaos: 2, cunning: -1 } },
      { id: 'c', text: '没能帮到重要的人', dimensions: { teamwork: 2, ambition: -2 } },
      { id: 'd', text: '没来得及说出真话', dimensions: { mysticism: 2, teamwork: 1 } },
    ]
  },
  {
    id: 10,
    text: '如果你有一个没人知道的秘密优势，你会？',
    options: [
      { id: 'a', text: '关键时刻拿出来用，一鸣惊人', dimensions: { cunning: 2, ambition: 1 } },
      { id: 'b', text: '在需要的时候分享给信任的人', dimensions: { teamwork: 2, cunning: 1 } },
      { id: 'c', text: '好好藏着，说不定哪天能救命', dimensions: { cunning: 2, mysticism: 1 } },
      { id: 'd', text: '忍不住想告诉别人', dimensions: { chaos: 2, teamwork: 1 } },
    ]
  },
  {
    id: 11,
    text: '突然被要求当众发言，你的第一反应？',
    options: [
      { id: 'a', text: '来了，刚好有话想说', dimensions: { aggression: 2, ambition: 1 } },
      { id: 'b', text: '脑中快速组织语言，不能丢人', dimensions: { cunning: 1, chaos: -1 } },
      { id: 'c', text: '有点慌，但会硬着头皮上', dimensions: { teamwork: 1, aggression: 1 } },
      { id: 'd', text: '尽量推掉，实在不行再说', dimensions: { teamwork: -1, mysticism: 1 } },
    ]
  },
  {
    id: 12,
    text: '跟朋友发生了分歧，对方态度很硬，你会？',
    options: [
      { id: 'a', text: '我有我的道理，硬碰硬也无所谓', dimensions: { aggression: 2, ambition: 1 } },
      { id: 'b', text: '先顺着说，找机会慢慢说服ta', dimensions: { cunning: 2, chaos: 1 } },
      { id: 'c', text: '退一步就退一步，关系更重要', dimensions: { teamwork: 2, aggression: -1 } },
      { id: 'd', text: '算了，不强求，各走各的路', dimensions: { mysticism: 1, teamwork: -2 } },
    ]
  },

  // ===== 价值观题（13-24）=====

  {
    id: 13,
    text: '你最向往拥有什么？',
    options: [
      { id: 'a', text: '让人无法忽视的力量', dimensions: { aggression: 2, ambition: 2 } },
      { id: 'b', text: '看透一切的洞察力', dimensions: { cunning: 2, mysticism: 1 } },
      { id: 'c', text: '让身边人安心的守护力', dimensions: { teamwork: 3, ambition: -1 } },
      { id: 'd', text: '超越日常的感知和直觉', dimensions: { mysticism: 3, cunning: 1 } },
    ]
  },
  {
    id: 14,
    text: '你最讨厌哪种特质？',
    options: [
      { id: 'a', text: '虚伪——永远不说真心话', dimensions: { cunning: -2, chaos: -1 } },
      { id: 'b', text: '软弱——只会依赖别人', dimensions: { teamwork: -2, ambition: 1 } },
      { id: 'c', text: '霸道——仗着强势欺负人', dimensions: { ambition: -2, teamwork: 1 } },
      { id: 'd', text: '无趣——永远按部就班', dimensions: { chaos: -2, mysticism: 1 } },
    ]
  },
  {
    id: 15,
    text: '你觉得一个人最重要的品质是什么？',
    options: [
      { id: 'a', text: '勇气——敢做别人不敢做的事', dimensions: { aggression: 2, chaos: 1 } },
      { id: 'b', text: '忠义——绝不会背叛信任的人', dimensions: { teamwork: 2, chaos: -2 } },
      { id: 'c', text: '智慧——能看穿一切迷局', dimensions: { cunning: 2, mysticism: 1 } },
      { id: 'd', text: '韧性——不管怎样都不倒下', dimensions: { ambition: 2, aggression: 1 } },
    ]
  },
  {
    id: 16,
    text: '你最看重什么？',
    options: [
      { id: 'a', text: '自由——不受任何人约束', dimensions: { aggression: 1, teamwork: -2 } },
      { id: 'b', text: '信念——有些东西比命重要', dimensions: { ambition: -2, teamwork: 2 } },
      { id: 'c', text: '掌控——一切尽在掌握中的感觉', dimensions: { cunning: 2, ambition: 2 } },
      { id: 'd', text: '真实——看清世界本来面貌', dimensions: { mysticism: 3, cunning: 1 } },
    ]
  },
  {
    id: 17,
    text: '你做事更倾向哪个准则？',
    options: [
      { id: 'a', text: '结果最重要，过程可以灵活', dimensions: { cunning: 2, chaos: 1 } },
      { id: 'b', text: '原则不能破，底线就是底线', dimensions: { chaos: -2, teamwork: 1 } },
      { id: 'c', text: '做了就不后悔，承担后果', dimensions: { aggression: 2, ambition: 1 } },
      { id: 'd', text: '顺其自然，该来的总会来', dimensions: { mysticism: 2, ambition: -1 } },
    ]
  },
  {
    id: 18,
    text: '你觉得什么最让人佩服？',
    options: [
      { id: 'a', text: '一个人扛下所有还面不改色', dimensions: { aggression: 2, teamwork: -2 } },
      { id: 'b', text: '在最黑暗的时候还能替别人撑伞', dimensions: { teamwork: 3, ambition: -1 } },
      { id: 'c', text: '把不可能变成可能的谋略', dimensions: { cunning: 3, chaos: 1 } },
      { id: 'd', text: '看破一切之后依然选择善良', dimensions: { mysticism: 2, teamwork: 1 } },
    ]
  },
  {
    id: 19,
    text: '你更害怕失去什么？',
    options: [
      { id: 'a', text: '自己的立场和尊严', dimensions: { aggression: 1, ambition: 2 } },
      { id: 'b', text: '信任的人', dimensions: { teamwork: 2, chaos: -1 } },
      { id: 'c', text: '对局面的控制力', dimensions: { cunning: 2, ambition: 1 } },
      { id: 'd', text: '内心的平静', dimensions: { mysticism: 2, chaos: -1 } },
    ]
  },
  {
    id: 20,
    text: '你更喜欢哪类故事的主角？',
    options: [
      { id: 'a', text: '凭一己之力逆天改命的人', dimensions: { aggression: 2, ambition: 1 } },
      { id: 'b', text: '在废墟上重建家园的人', dimensions: { teamwork: 2, chaos: -1 } },
      { id: 'c', text: '在暗处拨弄棋局的人', dimensions: { cunning: 3, chaos: 1 } },
      { id: 'd', text: '看透世间规律却选择沉默的人', dimensions: { mysticism: 3, teamwork: -1 } },
    ]
  },
  {
    id: 21,
    text: '你觉得哪种活着的方式更值得？',
    options: [
      { id: 'a', text: '痛快地燃烧，哪怕短暂', dimensions: { aggression: 2, chaos: 2 } },
      { id: 'b', text: '为重要的人撑起一片天', dimensions: { teamwork: 2, ambition: -2 } },
      { id: 'c', text: '把每一步都走成最好的棋', dimensions: { cunning: 2, chaos: -1 } },
      { id: 'd', text: '活出自己，不被任何人定义', dimensions: { mysticism: 2, teamwork: -1 } },
    ]
  },
  {
    id: 22,
    text: '如果只能选一个词形容理想中的自己，你选？',
    options: [
      { id: 'a', text: '无人能挡', dimensions: { aggression: 2, ambition: 2 } },
      { id: 'b', text: '值得信赖', dimensions: { teamwork: 2, chaos: -1 } },
      { id: 'c', text: '深不可测', dimensions: { cunning: 2, mysticism: 1 } },
      { id: 'd', text: '随心所欲', dimensions: { chaos: 2, mysticism: 1 } },
    ]
  },
  {
    id: 23,
    text: '你觉得什么样的人最危险？',
    options: [
      { id: 'a', text: '什么都不怕的人', dimensions: { aggression: -2, chaos: 1 } },
      { id: 'b', text: '什么都算到的人', dimensions: { cunning: -2, ambition: -1 } },
      { id: 'c', text: '为了目标不择手段的人', dimensions: { ambition: -2, teamwork: 1 } },
      { id: 'd', text: '看似无害实则暗藏杀机的人', dimensions: { cunning: -1, chaos: -2 } },
    ]
  },
  {
    id: 24,
    text: '最后，选一句更有感触的话：',
    options: [
      { id: 'a', text: '「有些路只能自己走」', dimensions: { aggression: 1, teamwork: -2 } },
      { id: 'b', text: '「有你们在，什么都不怕」', dimensions: { teamwork: 3, ambition: -1 } },
      { id: 'c', text: '「人生如棋，落子无悔」', dimensions: { cunning: 2, chaos: 1 } },
      { id: 'd', text: '「总有一些东西值得去相信」', dimensions: { mysticism: 2, teamwork: 1 } },
    ]
  },
]
