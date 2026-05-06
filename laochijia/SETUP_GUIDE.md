# 老吃家 - 项目初始化指南

## 📁 项目结构

```
laochijia/
├── laochijia-app/          # React Native 移动端应用
├── laochijia-admin/        # Next.js PC管理后台
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── components/    # React 组件
│   │   └── lib/           # 工具函数
│   ├── supabase/          # Supabase 配置
│   │   ├── database/      # 数据库迁移脚本
│   │   └── functions/     # Edge Functions
│   └── public/           # 静态资源
├── docs/                   # 项目文档
├── .github/
│   └── workflows/         # GitHub Actions
└── README.md
```

## 🚀 快速开始

### 1. 移动端 App

#### 环境要求
- Node.js >= 18
- React Native CLI
- Xcode (iOS 开发)
- Android Studio (Android 开发)

#### 初始化步骤

```bash
# 进入移动端目录
cd laochijia-app

# 使用 React Native CLI 创建项目（选择 TypeScript 模板）
npx @react-native-community/cli init LaoChiJiaApp --template react-native-template-typescript

# 进入项目目录
cd LaoChiJiaApp

# 安装依赖
npm install

# 安装额外依赖
npm install @supabase/supabase-js @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
```

#### 启动应用

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

### 2. PC 管理后台

#### 初始化步骤

```bash
# 进入管理后台目录
cd laochijia-admin

# 创建 Next.js 项目
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 安装依赖
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs lucide-react
```

#### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. Supabase 配置

#### 创建 Supabase 项目

1. 访问 https://supabase.com
2. 创建新项目
3. 获取项目 URL 和 anon key

#### 配置环境变量

在 `laochijia-app` 和 `laochijia-admin` 中创建 `.env.local` 文件：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 运行数据库迁移

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 初始化本地开发
supabase init

# 启动本地 Supabase
supabase start

# 运行迁移
supabase db push
```

## 📋 待办事项

- [ ] 在本地机器上初始化 React Native 项目
- [ ] 配置 Supabase 项目
- [ ] 创建数据库表结构
- [ ] 实现登录注册功能
- [ ] 开发首页推荐流
- [ ] 开发发布推荐功能
- [ ] 开发评价系统
- [ ] 开发管理后台

## 🛠️ 技术栈

### 移动端
- React Native 0.73+
- TypeScript
- React Navigation 6
- Supabase JS SDK
- React Native Reanimated

### 管理后台
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase JS SDK
- Shadcn/ui

### 后端服务
- Supabase (PostgreSQL + Auth + Storage + Edge Functions)

## 📚 学习资源

- [React Native 官方文档](https://reactnative.dev/docs/getting-started)
- [Next.js 官方文档](https://nextjs.org/docs)
- [Supabase 官方文档](https://supabase.com/docs)
- [React Navigation 文档](https://reactnavigation.org/docs/getting-started)

## ⚠️ 常见问题

### Q: React Native CLI 和 Expo 如何选择？
**A**: 推荐使用 React Native CLI，因为需要原生模块集成（如微信登录）

### Q: 如何配置微信登录？
**A**: 需要在微信开放平台申请移动应用，获取 AppID 和 AppSecret**

### Q: Supabase 免费额度够用吗？
**A**: 对于初创项目，Supabase 的免费额度（500MB 数据库，1GB 存储）足够使用

## 📞 帮助

如有问题，请参考官方文档或提交 Issue
