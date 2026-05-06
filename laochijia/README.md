# 🍜 老吃家 - 美食推荐社区

> 发现美食，分享体验，连接吃货

## 📱 项目简介

老吃家是一款专注于美食推荐和评价的社区型APP，旨在打造一个资深吃货互相推荐的平台。用户可以发布自己的私藏美食店铺，其他用户参考推荐到店品尝后可以给出真实评价。

## ✨ 核心功能

- 🍜 **美食推荐**：分享私藏美食店铺
- ⭐ **真实评价**：五星评分系统（拉完了 → NPC → 人上人 → 顶级 → 夯爆了）
- 🏆 **吃货分机制**：分享美食赚取积分，低分消耗积分
- 🔄 **评价复议**：对差评提出复议
- 🎯 **精准匹配**：基于口味偏好的智能推荐

## 🛠️ 技术栈

### 移动端 App
- **框架**: React Native 0.73+
- **语言**: JavaScript + TypeScript
- **导航**: React Navigation 6
- **后端服务**: Supabase (数据库 + 认证 + 存储)
- **状态管理**: React Context / Zustand

### PC 管理后台
- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: Shadcn/ui

### 后端服务
- **数据库**: PostgreSQL (Supabase)
- **认证**: Supabase Auth
- **文件存储**: Supabase Storage
- **云函数**: Supabase Edge Functions

## 📁 项目结构

```
laochijia/
├── laochijia-app/          # React Native 移动端应用
├── laochijia-admin/        # Next.js PC管理后台
├── docs/                   # 项目文档
└── README.md              # 项目说明文档
```

## 🚀 快速开始

详细的初始化指南请参考 [SETUP_GUIDE.md](laochijia/SETUP_GUIDE.md)

### 1. 克隆项目
```bash
git clone <repository-url>
cd laochijia
```

### 2. 初始化移动端 App
```bash
cd laochijia-app
npm install
npm run ios  # 或 npm run android
```

### 3. 初始化管理后台
```bash
cd laochijia-admin
npm install
npm run dev
```

## 🎯 开发路线图

### Phase 1: 项目初始化 ✅
- [x] UI原型设计
- [ ] 移动端项目搭建
- [ ] 管理后台搭建
- [ ] Supabase 配置

### Phase 2: 核心功能开发
- [ ] 用户认证系统
- [ ] 推荐帖子发布
- [ ] 推荐信息流
- [ ] 评价系统

### Phase 3: 管理后台
- [ ] 用户管理
- [ ] 内容审核
- [ ] 数据统计

### Phase 4: 测试与上线
- [ ] 单元测试
- [ ] 集成测试
- [ ] 性能优化
- [ ] 应用市场上线

## 👥 团队

- 产品经理
- UI/UX 设计师
- 移动端开发
- 后端开发
- 测试工程师

## 📄 许可证

本项目仅供学习参考使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- 邮箱: contact@laochijia.com
- 微信公众号: 老吃家

---

Made with ❤️ by 老吃家团队
