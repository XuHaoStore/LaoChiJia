# 老吃家移动端 - 本地初始化指南

## 🚨 重要提示

由于某些权限限制，请在你的**本地终端**执行以下命令来完成项目初始化。

## 📋 步骤 1：清理并重新初始化项目

在你的终端中执行：

```bash
# 进入项目目录
cd /Users/xuhao/学习/code/new_project/laochijia

# 删除旧的项目文件（如果有）
rm -rf LaoChiJiaApp laochijia-app

# 使用 Expo 创建新项目
npx create-expo-app@latest LaoChiJiaApp --template blank-typescript

# 进入项目目录
cd LaoChiJiaApp
```

## 📦 步骤 2：安装额外依赖

在项目创建完成后，执行以下命令安装所需依赖：

```bash
# 安装 Supabase 客户端
npx expo install @supabase/supabase-js

# 安装导航相关依赖
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# 安装 UI 组件
npx expo install react-native-screens react-native-safe-area-context

# 安装图片选择器
npx expo install expo-image-picker

# 安装定位服务
npx expo install expo-location

# 安装图标库
npx expo install @expo/vector-icons
```

## ⚙️ 步骤 3：配置环境变量

在项目根目录创建 `.env` 文件：

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## 🏃 步骤 4：运行项目

```bash
# 启动开发服务器
npx expo start

# 如果想用特定平台运行：
npx expo start --android  # Android
npx expo start --ios     # iOS（需要 Mac）
```

## 📱 Expo Go 使用说明

1. 在手机应用商店下载 **Expo Go** 应用
2. 扫描终端中显示的二维码
3. 即可在手机上预览应用

## 🎯 下一步

完成初始化后，你可以：

1. 查看 `App.tsx` 文件开始编写代码
2. 配置 Supabase 连接
3. 开始实现登录注册功能
4. 开发首页推荐流

## ❓ 遇到问题？

### 问题 1：npx 命令找不到
```bash
# 确保 npm 已正确安装
npm -v

# 清理 npm 缓存
npm cache clean --force
```

### 问题 2：权限被拒绝
```bash
# 检查目录权限
ls -la /Users/xuhao/学习/code/new_project/laochijia

# 如果需要，修改权限
chmod 755 /Users/xuhao/学习/code/new_project/laochijia
```

### 问题 3：Node.js 版本不兼容
```bash
# 检查 Node.js 版本
node -v

# 推荐使用 Node.js 18+
# 如果需要升级，使用 nvm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

## 📚 学习资源

- [Expo 官方文档](https://docs.expo.dev/)
- [React Navigation 文档](https://reactnavigation.org/)
- [Supabase React Native 文档](https://supabase.com/docs)

---

完成初始化后告诉我，我会继续帮你开发应用功能！🚀
