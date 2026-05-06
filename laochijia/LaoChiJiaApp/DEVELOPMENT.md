# 老吃家 React Native 项目

## 📱 项目概述

老吃家是一个美食推荐社区应用，提供美食分享、评价和发现的综合平台。

## ✅ 已完成工作

### 项目结构
```
laochijia/
├── LaoChiJiaApp/          # React Native 移动端应用
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   │   ├── Text.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── screens/      # 页面屏幕
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── ... (其他屏幕文件)
│   │   ├── navigation/   # 导航
│   │   │   ├── AppNavigator.tsx
│   │   │   └── MainTabNavigator.tsx
│   │   ├── context/      # 上下文管理
│   │   │   └── AuthContext.tsx
│   │   ├── lib/         # 工具库
│   │   │   └── supabase.ts
│   │   ├── constants/   # 常量配置
│   │   │   └── index.ts
│   │   ├── types/       # 类型定义
│   │   │   └── index.ts
│   │   ├── hooks/       # 自定义 Hooks
│   │   └── assets/      # 静态资源
│   ├── App.tsx
│   ├── package.json
│   └── ...其他配置文件
```

### 核心功能
- ✅ **项目初始化** - React Native + TypeScript 项目搭建
- ✅ **导航系统** - 完整的页面导航和底部标签栏
- ✅ **认证系统** - 集成 Supabase 认证上下文管理
- ✅ **启动页面** - 带有动画效果的启动屏幕
- ✅ **新手引导** - 三步式用户引导 + 口味偏好选择
- ✅ **登录注册** - 手机号码登录和注册界面
- ✅ **UI 组件库** - Text、Button、Input 组件

### 技术栈
- **React Native** - 移动应用开发
- **TypeScript** - 类型安全的 JavaScript
- **Supabase** - 后端服务（数据库、认证、存储）
- **React Navigation** - 应用导航
- **React Native Async Storage** - 本地数据持久化

## 🚀 下一步开发计划

### Phase 1: 基础功能开发
1. **数据库模型完善
   - 配置 Supabase 项目
   - 运行数据库迁移脚本
   - 配置认证流程
   
2. **首页推荐流
   - 推荐卡片组件
   - 无限滚动加载
   - 下拉刷新功能
   
3. **发布推荐功能
   - 完整的发布表单
   - 图片上传功能
   - 地理位置获取
   - 标签选择

4. **推荐详情页
   - 详情展示
   - 评价列表
   - 互动操作（点赞、收藏、分享）

### Phase 2: 评价系统
1. **评价发表评价
   - 五星评分组件
   - 差评复议功能
2. **用户个人中心
3. **消息通知中心**

### Phase 3: 管理后台
1. **Next.js 管理后台
2. **数据统计**
3. **内容审核**
4. **用户管理**

## 📦 依赖安装说明
```bash
cd LaoChiJiaApp
npm install
```

## 🔧 配置 Supabase
1. 访问 https://supabase.com 注册并创建项目
2. 获取项目的 URL 和 Anon Key
3. 编辑 `src/lib/supabase.ts` 中的配置
4. 运行 `../supabase/database/schema.sql` 中的数据库迁移脚本

## 📱 运行应用
```bash
cd LaoChiJiaApp

# iOS
npm run ios

# Android
npm run android

# 启动 Metro
npm start
```

## 🎯 重要提示

### 1. Supabase 配置
在开始开发前，请务必完成以下步骤：
1. 在 Supabase 控制台创建项目
2. 更新 `src/lib/supabase.ts` 中的配置

### 2. 依赖问题
如果在安装依赖时遇到问题：
```bash
npm install --legacy-peer-deps
```

### 3. 环境变量
建议创建 `.env` 文件管理敏感配置

## 📚 学习资源
- [React Native 官方文档](https://reactnative.dev/)
- [Supabase 文档](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)

---

**注意：项目已成功初始化，可以开始进行功能开发了！ 🍜
