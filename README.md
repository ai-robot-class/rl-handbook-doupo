<div align="center">

# 斗破苍穹 × 强化学习手册

**从乌坦城的一缕斗气，到智能体的最优策略。**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/built%20with-Next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Content: MDX](https://img.shields.io/badge/content-MDX-8A2BE2?style=for-the-badge)](https://mdxjs.com)
![Language](https://img.shields.io/badge/改写语言-简体中文-dc2626?style=for-the-badge)

一部借《斗破苍穹》人物与成长故事讲清强化学习的开源教程。

</div>

---

## 为什么是“斗破”强化学习？

强化学习研究的，是一个智能体如何在充满不确定性的环境里不断行动、承受结果、总结经验，最终学会长期回报更高的策略。萧炎的成长恰好提供了一条直观的叙事线：他不是一开始就知道最强路线，而是在一次次选择、反馈和试炼中更新自己的判断。

> “三十年河东，三十年河西，莫欺少年穷！”

“河东”并不意味着下一刻仍在河东。环境会按一定的**转移概率**变化，眼前吃亏也不等于长期失败。萧炎要做的不是赌一次好运，而是学习一套能在不同境况下持续成长的**策略**；药老则像价值评估与规划导师，帮助他看见即时得失背后的长期回报。

## 世界观与 RL 概念映射

| 斗气大陆 | 强化学习 | 教程中的含义 |
| --- | --- | --- |
| 萧炎 | 智能体（Agent） | 观察局势、选择行动并持续学习的决策者 |
| 斗气大陆与历练场景 | 环境（Environment） | 对行动作出响应，并产生下一状态与奖励 |
| 境界、体力、资源与对手信息 | 状态（State） | 当前决策所需的信息 |
| 修炼、战斗、炼药或撤退 | 动作（Action） | 智能体在当前状态下可做的选择 |
| 实力增长、资源收获与代价 | 奖励（Reward） | 环境对一次行动给出的标量反馈 |
| 从弱小走向强者的长期收益 | 回报（Return） | 经折扣累积后的未来奖励 |
| 萧炎的行动准则 | 策略（Policy） | 从状态到动作或动作概率的映射 |
| 药老的判断与指导 | 价值评估 / 规划 | 估计长远价值，辅助寻找更优策略 |
| 异火、功法与试炼路线 | 探索空间 | 高风险、高信息量，也可能带来更高收益 |

这些比喻用于建立直觉，不替代严格定义。每一章仍会保留标准术语、数学公式、算法条件和可运行代码；当故事类比与技术定义存在边界时，以技术定义为准。

## 强化学习“境界表”

这里的境界是**阅读路线**，不是算法排行榜。斗圣不会天然打败斗王，正如复杂算法也不会自动胜过适合任务的简单方法。

| 教学境界 | 主要问题 | 对应内容 |
| --- | --- | --- |
| 斗之气 | 谁在行动，环境怎样反馈 | 智能体、环境、状态、动作、奖励 |
| 斗者 | 未知选项该试还是该用 | 多臂赌博机、探索—利用 |
| 斗师 | 眼前一步怎样连接长期未来 | MDP、折扣回报、贝尔曼方程 |
| 大斗师 | 有模型或有样本时怎样估值 | 动态规划、MC、TD |
| 斗灵 | 怎样直接学会选动作 | Sarsa、Q-Learning、DQN |
| 斗王 | 怎样直接优化随机策略 | REINFORCE、Actor-Critic、GAE |
| 斗皇 | 怎样复用旧经验控制连续动作 | DDPG、TD3、SAC、经验回放 |
| 斗宗 | 怎样在行动前推演未来 | Dyna、MPC、树搜索 |
| 斗尊 | 怎样处理固定数据、多目标与多智能体 | Offline RL、HER、MARL |
| 斗圣 | 怎样识别模型偏差、分布偏移与奖励漏洞 | MuZero、RLHF、稳健评估 |
| 斗帝 | 不对应单一算法 | 能根据任务、数据与风险选择并验证方法的理想能力 |

每个展示公式前会尽量给出中文名字，并先回答三件事：**它叫什么、它在算什么、每一项为什么存在**。复杂概念再用数字例、对比例和失败反例拆开，避免只看见符号却不知道何时能用。

## 改写进度与教程路线

### 序章：少年与决策

- [x] [引言：从乌坦城出发](content/docs/00-introduction/introduction/index.zh.mdx)
- [x] [什么是强化学习：萧炎如何从反馈中成长](content/docs/00-introduction/what-is-reinforcement-learning/index.zh.mdx)
- [x] [药老的强化学习修炼路线图](content/docs/00-introduction/taxonomy/index.zh.mdx)

### 第一卷：基于值的修炼之路

- [x] [多臂赌博机：萧炎的 k 座聚气台](content/docs/01-value-based/multi-armed-bandits/index.zh.mdx)
- [x] [马尔可夫决策过程：萧炎的三年成长](content/docs/01-value-based/mdp/index.zh.mdx)
- [x] [动态规划：药老的云岚山教学棋盘](content/docs/01-value-based/dynamic-programming/index.zh.mdx)
- [x] [药老的历练复盘：蒙特卡洛与时序差分预测](content/docs/01-value-based/monte-carlo-and-temporal-difference/index.zh.mdx)
- [x] [萧炎的下一招：Sarsa 与 Q-Learning](content/docs/01-value-based/sarsa-and-q-learning/index.zh.mdx)
- [x] [纳戒中的经验：深度 Q 网络](content/docs/01-value-based/dqn/index.zh.mdx)
- [x] [药老的改良卷：Double、Dueling、PER 与 Rainbow](content/docs/01-value-based/dqn-improvements/index.zh.mdx)

### 第二卷：同策略修炼——当场悟法

- [x] [策略梯度与 REINFORCE：历练回报如何改变出招概率](content/docs/02-on-policy-policy-based/policy-gradient-and-reinforce/index.zh.mdx)
- [x] [Actor-Critic、A2C 与 A3C：萧炎出招，药老点评](content/docs/02-on-policy-policy-based/actor-critic-a2c-a3c/index.zh.mdx)
- [x] [TRPO：信赖域内稳固根基](content/docs/02-on-policy-policy-based/trpo/index.zh.mdx)
- [x] [PPO：裁剪步幅，稳中求进](content/docs/02-on-policy-policy-based/ppo/index.zh.mdx)

### 第三卷：异策略修炼——纳戒旧卷宗

- [x] [异策略改进框架：从纳戒旧卷宗中复盘](content/docs/03-off-policy-policy-based/off-policy-policy-improvement-framework/index.zh.mdx)
- [x] [DDPG：连续斗气控制](content/docs/03-off-policy-policy-based/ddpg/index.zh.mdx)
- [x] [TD3 与 SAC：双重评判与最大熵探索](content/docs/03-off-policy-policy-based/td3-and-sac/index.zh.mdx)

### 第四卷：药老的模型与推演

- [x] [Dyna：在真实历练与药老推演之间](content/docs/04-model-based/dyna-and-learned-models/index.zh.mdx)
- [x] [模型预测控制：每一步都重新推演](content/docs/04-model-based/model-predictive-control/index.zh.mdx)
- [x] [AlphaZero 与 MuZero：棋局搜索与学得模型](content/docs/04-model-based/alphazero-and-muzero/index.zh.mdx)

### 第五卷：更广阔的斗气大陆

- [x] [模仿学习](content/docs/05-advanced-topics/imitation-learning/index.zh.mdx)、[离线 RL](content/docs/05-advanced-topics/offline-rl/index.zh.mdx) 与 [RLHF](content/docs/05-advanced-topics/rl-sequence-generation-and-rlhf/index.zh.mdx)
- [x] [探索](content/docs/05-advanced-topics/exploration/index.zh.mdx)、[目标条件 RL](content/docs/05-advanced-topics/goal-conditioned-rl/index.zh.mdx) 与 [多智能体 RL](content/docs/05-advanced-topics/multi-agent-rl/index.zh.mdx)
- [x] [功法阁：参考文献与原典卷宗](content/docs/references.zh.mdx)

> 上游仓库的第四、第五卷目前只有“待补充”占位页，因此本次中文改写将这些页面扩写为准确、可核验的专题导读，并附上原始论文入口；它们仍保留“建设中”标记，不冒充已经完成的长篇教程。其余现有中文正文已全部完成斗破主题改写。

## 阅读约定

- **先故事，后定义。** 每个新概念先用人物处境建立直觉，再给出标准定义与公式。
- **先叫名字，再看表达式。** 展示公式前先给中文名称与用途，随后逐项解释符号。
- **热血不牺牲准确。** 叙事可以燃，贝尔曼方程、概率条件和算法差异不能含糊。
- **境界不是排行榜。** 斗者到斗圣只表示教学层次；简单算法在合适任务上完全可能更好。
- **角色映射保持稳定。** 同一角色尽量承担同一类技术含义，避免类比在章节间漂移。
- **代码保持可运行。** Python 示例仍使用标准 RL 环境与变量命名，故事注释只帮助理解。
- **原著台词适量使用。** 仅保留短句或改写表达，主体内容为原创教学叙事。

## 本地运行

需要 Node.js 与 pnpm。

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
```

章节位于 `content/docs/<section>/<chapter>/`，中文内容使用 `index.zh.mdx`：

```text
content/docs/<section>/<chapter>/
├── index.mdx              英文章节源文件
├── index.zh.mdx           中文章节源文件
├── <chapter>.py           可运行示例（如存在）
└── figures/               图片、动图与图表
```

## GitHub Pages 部署

项目已改为 Next.js 静态导出，并由 [Pages 工作流](.github/workflows/pages.yml)发布 `out/`。部署后的中文入口是：

- <https://course.a-real.me/rl-handbook-doupo/zh/>

首次启用只需做一次仓库设置：进入 **Settings → Pages**，把 **Build and deployment → Source** 改为 **GitHub Actions**。此后每次推送到 `main` 都会自动构建并发布，也可以在 **Actions** 页面手动触发。

工作流通过 GitHub Pages 提供的 `base_path` 和 `base_url` 自动适配仓库子路径与自定义域名。中英文路由、浏览器端搜索索引、站点地图、RSS、LLM 文本和 Open Graph 图片都在构建期生成，不依赖 Node.js 服务器、重写规则或中间件。

如需在本地模拟项目站点的子路径构建，可在 PowerShell 中运行：

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/rl-handbook-doupo'
$env:NEXT_PUBLIC_SITE_URL='https://course.a-real.me/rl-handbook-doupo'
pnpm build
```

生成结果位于 `out/`；该目录是构建产物，不需要提交到 Git。

## 改写边界与声明

本项目是非官方、非商业的同人教学改编，与《斗破苍穹》的作者、出版方、动画或影视制作方无隶属或授权关系。相关人物与世界观名称归其权利人所有；本项目新增的讲解、类比与代码用于强化学习教育。

本仓库基于开源项目 [lubludrova/rl-handbook](https://github.com/lubludrova/rl-handbook) 改写，并保留其 MIT 许可证。技术内容的贡献欢迎通过 issue 或 pull request 提交；涉及算法与公式的修改，请同时说明依据和验证方式。

## License

代码与本仓库原创内容依据 [MIT License](LICENSE) 开源；第三方作品元素不因本许可证而改变其原有权属。
