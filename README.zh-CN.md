# 简体中文说明

本项目以中文为主要创作语言，完整项目介绍、概念映射、章节目录与运行方法请阅读 [README.md](README.md)。

> “三十年河东，三十年河西，莫欺少年穷！”

本教程将萧炎的成长历程映射为强化学习中的智能体—环境交互：环境按转移概率变化，萧炎通过奖励与长期回报修正策略，药老则承担价值评估与规划导师的叙事角色。故事类比用于帮助理解，标准术语、数学公式与代码实现仍保持严格和可验证。

本项目为非官方、非商业的同人教学改编。人物及世界观名称归其权利人所有；代码与本仓库原创内容遵循 [MIT License](LICENSE)。

## 部署到 GitHub Pages

仓库现已使用 Next.js 静态导出，并通过 GitHub Actions 发布 `out/` 目录。部署成功后的中文入口为：

- <https://course.a-real.me/rl-handbook-doupo/zh/>

首次启用时，请进入仓库的 **Settings → Pages**，将 **Build and deployment → Source** 改成 **GitHub Actions**。以后每次推送到 `main`，`.github/workflows/pages.yml` 都会自动构建并发布；也可以在 **Actions** 页面手动运行该工作流。

工作流会读取 GitHub Pages 提供的站点地址与仓库子路径，因此同一份代码既能适配 `ai-robot-class.github.io/rl-handbook-doupo`，也能适配当前自定义域名。中文、英文、站内搜索、站点地图、RSS、LLM 文本和 Open Graph 图片都会在构建期生成，不再依赖服务器中间件。

本地模拟 GitHub Pages 子路径构建时，可在 PowerShell 中运行：

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/rl-handbook-doupo'
$env:NEXT_PUBLIC_SITE_URL='https://course.a-real.me/rl-handbook-doupo'
pnpm install
pnpm build
```

静态文件会生成到 `out/`。该目录是构建产物，不需要提交到 Git。
