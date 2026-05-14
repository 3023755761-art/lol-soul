/**
 * 臻彩原画背景库
 * 来源：https://splash.buguoguo.cn/prestigechromas
 *
 * 切换逻辑：
 * - 每次进入首页（首次访问 / 答完题回到首页）都随机换一张
 * - 答题过程中保持不变
 * - 不使用 sessionStorage，由 App.vue 的响应式状态控制
 */
export const prestigeBackgrounds = [
  // 婕拉 灵魂莲华 雁来
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-c0c125d0-0f27-46bf-8209-0a2100ee280d.jpg',
  // 格温 青蛙雨衣 豪雨
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-b3e4863a-d270-422b-bc49-48989a6a2a35.jpg',
  // 亚索 踏雪寻梅 琼英缀雪
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-c3220d70-3447-4a4e-8e7e-5a3d89cb7534.jpg',
  // 萨勒芬妮 龙马烈焰 喜气洋洋
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-33c3d35c-d484-41df-82a7-bf03395ec84d.jpg',
  // 拉克丝 熊猫娃娃 水袖凝云
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-c9b92405-02cb-4aad-956a-f1f11a5c31ab.jpg',
  // 永恩 心之钢 天纵才华
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-256e9cc4-1443-4715-a52e-62b667b339b3.jpg',
  // 阿狸 偶像歌手 幻紫罗兰
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-ec609b0e-f28a-4d61-bfbd-02b358960fc2.jpg',
  // 悠米 觅心猫猫 月色真美
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-ae4bb965-2974-4160-96a7-1cbcfbfaeeb8.jpg',
  // 阿卡丽 灵魂莲华 鸣蜩
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-139accb4-5d87-48c8-9885-d2c329114ad7.jpg',
  // 金克丝 觅心萝莉 月色真美
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-02dcfbf5-dc72-4227-8c67-e3a846daaafb.jpg',
  // 厄运小姐 青花瓷 天青
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-59b8ccfc-381b-4a54-9ecd-3051de1b55e8.jpg',
  // 艾希 海之歌 浪漫氛围
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-21157c6d-ea56-4d8d-bd47-95a8e46acf46.jpg',
  // 卡莎 天龙之子 龙飞凤翔
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-51b4b288-bb77-4bdb-a70e-b1677be479d1.jpg',
  // 辛德拉 魔女 贪婪
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-a7d49f90-0438-4d49-8146-a414321dcdf5.jpg',
  // 薇恩 星之守护者 未来之光
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-9276feeb-9262-43e2-b0dc-25927efcb63e.jpg',
  // 金克丝 星之守护者 黑洞
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-da987937-93f3-49f2-ae77-1b6748af8757.jpg',
  // 娑娜 莲华温泉 春晓
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-526f0e10-62bf-47cb-9edb-0715bfd462d7.jpg',
  // 嘉文四世 剪纸仙灵 喜气洋洋
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-c44db6cc-e9a4-4938-b081-e6e3399a6763.jpg',
  // 拉克丝 斗魂觉醒 幻之魂焰
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-015f112b-6a87-4d98-b104-bc8c99e09540.jpg',
  // 锤石 灵魂莲华 春晓
  'https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site5-bd2e9759-e4c8-4a9d-96d7-28c9ed7d0802.jpg',
]

/**
 * 随机选一张背景图（不持久化，每次调用都可能不同）
 */
export function pickRandomBackground() {
  const idx = Math.floor(Math.random() * prestigeBackgrounds.length)
  return prestigeBackgrounds[idx]
}
