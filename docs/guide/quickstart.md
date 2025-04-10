# 快速开始

本节将介绍如何在项目中使用 Boat UI。

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。在 `main.js` 或 `main.ts` 中引入。

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import BoatUI from '@koihe/boat-ui';
import '@koihe/boat-ui/dist/index.css';
// 如果你需要使用 boat-icon 图标，需要引入此文件，否则不需要
import '@koihe/boat-ui/dist/iconfont.js';

const app = createApp(App);
app.use(BoatUI);
app.mount('#app');
```

## 按需引入

### 自动引入（推荐使用）

使用 `unplugin-vue-components` 进行按需引入。

首先，安装插件：

```bash
npm install unplugin-vue-components --save-dev
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

#### vite

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

#### webpack

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

### 手动引入

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

## 开始使用

现在你可以启动项目了。对于每个组件的用法，请查阅对应的组件文档。
