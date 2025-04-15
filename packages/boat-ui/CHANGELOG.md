# Changelog

本项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/) 语义化版本控制规范。  
所有显著变更将记录在此文件中。

---

## [1.1.3] - 2025-04-15

### 🐛 Fix

1. 修复按需导入组件时，路径解析错误问题

---

## [1.1.2] - 2025-04-10

### ✨ Features

1. `iconfont.js` 引入路径变更，需要使用内置图标时，统一通过以下路径引入
```javascript
// main.ts
import '@koihe/boat-ui/dist/iconfont.js';
```
2. `resolver.js` 引入路径变更，当使用按需引入组件时，统一通过以下路径引入解析器
```javascript
// vite.config.ts
import { BoatUIResolver } from '@koihe/boat-ui/dist/resolver';
```
3. `boat-rotate-menu` 组件内部自动注册拖拽指令，不需要用户额外注册

### 🐛 Fix

1. 修复引入解析器路径不能识别问题

---

## [1.1.1] - 2025-04-08

### 🐛 Fix

1. 修复导出配置问题

---

## [1.1.0] - 2025-04-07

### ✨ Features

1. 新增 `RotateMenu` 旋转菜单组件

---

## [1.0.6] - 2025-04-07

### 🐛 Fix

1. 修复已知问题

---

## [1.0.5] - 2025-04-07

### 🐛 Fix

1. 修复已知问题

---

## [1.0.4] - 2025-01-16

### ✨ Features

1. 新增一批图标组件（`Icon`）

---

## [1.0.3] - 2025-01-15

### 🎉 Initial Release

1. 项目初始化，发布首个版本

---

<!-- 以下是版本链接占位，可在使用 GitHub Releases 或 tags 后替换 -->
<!--
[Unreleased]: https://github.com/JY-HE/koihe-boat
[1.0.5]: https://github.com/JY-HE/koihe-boat/tree/v1.0.5
[1.0.4]: https://github.com/JY-HE/koihe-boat/tree/v1.0.4
-->
