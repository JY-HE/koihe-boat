<h1 align="center">@koihe/boat</h1>

<p align="center">集合前端工具库以及适用于 Vue3 的 UI 组件库</p>

<p align="center">
<a href="https://www.npmjs.com/package/@koihe/boat-ui" target="__blank"><img src="https://img.shields.io/npm/v/@koihe/boat-ui?label=version" alt="NPM version"></a>
</p>

---

## 特性

- 🚀 性能极佳，组件平均体积小于 1KB（min+gzip）
- 🚀 20+ 个高质量组件
- 🚀 零外部依赖，不依赖三方 npm 包
- 💪 使用 TypeScript 编写，提供完整的类型定义
- 📖 提供丰富的文档和组件示例
- 🍭 支持 Vue 3
- 🍭 支持按需引入和 Tree Shaking

## 安装

### 命令安装

可以通过 `npm`、`yarn` 或 `pnpm` 进行安装。

```bash
# 通过 npm 安装
npm i @koihe/boat-ui

# 通过 yarn 安装
yarn add @koihe/boat-ui

# 通过 pnpm 安装
pnpm add @koihe/boat-ui
```

### CDN安装

在页面上引入 `js` 和 `css` 文件即可开始使用。

```bash
# 引入样式
<link rel="stylesheet" href="https://unpkg.com/@koihe/boat-ui/dist/index.css">

# 引入组件库
<script src="https://unpkg.com/@koihe/boat-ui/dist/index.js"></script>
```

## 快速开始

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。在 `main.js` 或 `main.ts` 中引入。

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import BoatUI from '@koihe/boat-ui';
import '@koihe/boat-ui/dist/index.css';

const app = createApp(App);
app.use(BoatUI);
app.mount('#app');
```

### 按需引入

#### 自动引入（推荐使用）

使用 `unplugin-vue-components` 进行按需引入。

首先，安装插件：

```bash
npm install unplugin-vue-components --save-dev
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

##### vite

```javascript
import Components from 'unplugin-vue-components/vite';
import { BoatUIResolver } from '@koihe/boat-ui/lib/resolver';

export default {
  // ...
  plugins: [
    Components({
      resolvers: [BoatUIResolver()]
    })
  ]
};
```

##### webpack

```javascript
const Components = require('unplugin-vue-components/webpack')
const { BoatUIResolver } = require('@koihe/boat-ui/lib/resolver')

module.exports = {
  // ...
  plugins: [
    Components({
      resolvers: [BoatUIResolver()]
    })
  ],
}
```

#### 手动引入

```vue
// APP.vue
<template>
    <boat-button plain>BoatButton</boat-button>
</template>

<script setup lang="ts">
import { BoatButton } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/button/style/index';
</script>
```