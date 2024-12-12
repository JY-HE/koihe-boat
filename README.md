<h1 align="center">@koihe/boat</h1>

<p align="center">集合前端工具库以及适用于 Vue3 的 UI 组件库</p>

<p align="center">
<a href="https://www.npmjs.com/package/boat-admin-cli" target="__blank"><img src="https://img.shields.io/npm/v/boat-admin-cli?label=version" alt="NPM version"></a>
</p>

---

## @koihe/boat-ui

### 特性

- 🚀 性能极佳，组件平均体积小于 1KB（min+gzip）
- 🚀 20+ 个高质量组件
- 🚀 零外部依赖，不依赖三方 npm 包
- 💪 使用 TypeScript 编写，提供完整的类型定义
- 📖 提供丰富的文档和组件示例
- 🍭 支持 Vue 3
- 🍭 支持主题定制，内置 700+ 个主题变量
- 🍭 支持按需引入和 Tree Shaking

### 安装

在现有项目中使用 `@koihe/boat-ui` 时，可以通过 `npm`、`yarn` 或 `pnpm` 进行安装：

```bash
# 通过 npm 安装
npm i @koihe/boat-ui

# 通过 yarn 安装
yarn add @koihe/boat-ui

# 通过 pnpm 安装
pnpm add @koihe/boat-ui
```

### 快速上手

#### 全量引入

```ts
import { createApp } from 'vue';
import App from './App.vue';
// 引入组件样式文件
import '@koihe/boat-ui/styles/index.css';
// 引入组件
import BoatUI from '@koihe/boat-ui';

const app = createApp(App);

app.use(BoatUI).mount('#app');
```

#### 按需引入

```vue
<script lang="ts" setup>
// 引入需要的组件
import { BoatInput } from '@koihe/boat-ui';
// 引入组件样式文件
import '@koihe/boat-ui/es/input/style.css';
</script>
```