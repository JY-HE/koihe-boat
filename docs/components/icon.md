# Icon 图标

`Boat UI` 提供了一套常用的 `SVG` 图标集合。

## 使用图标

在使用图标之前，你需要在项目的主入口文件中导入图标文件。例如在 `main.ts` 中引入:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
// 引入图标文件
import '@koihe/boat-ui/dist/iconfont.js';

const app = createApp(App);
app.mount('#app');
```

## 基础用法

```vue
<template>
    <boat-icon name="search" size="24" color="#409EFF"></boat-icon>
</template>
```

## 图标集合

### System

<div :class="$style.iconBox">
    <div :class="$style.iconItem" v-for="item in getIconFonts('System')" :key="item">
        <boat-icon :name="item" size="24"></boat-icon>
        <span> {{ item }} </span>
    </div>
</div>

### Media

<div :class="$style.iconBox">
    <div :class="$style.iconItem" v-for="item in getIconFonts('Media')" :key="item">
        <boat-icon :name="item" size="24"></boat-icon>
        <span> {{ item }} </span>
    </div>
</div>

### Arrow

<div :class="$style.iconBox">
    <div :class="$style.iconItem" v-for="item in getIconFonts('Arrow')" :key="item">
        <boat-icon :name="item" size="24"></boat-icon>
        <span> {{ item }} </span>
    </div>
</div>

### Others

<div :class="$style.iconBox">
    <div :class="$style.iconItem" v-for="item in getIconFonts('Others')" :key="item">
        <boat-icon :name="item" size="24"></boat-icon>
        <span> {{ item }} </span>
    </div>
</div>

<script setup>
import { getIconFonts } from '../utils'
</script>

<style module>
.iconBox {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 32px;
    box-sizing: border-box;
}
.iconItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    box-shadow: 0 0 0 1px #807b7b;
    box-sizing: border-box;
    transition: all 0.3s;

    span {
        margin: 8px 0 0 0;
    }

    &:hover{
        background: rgba(156, 154, 154, 0.3);
        cursor: pointer;
    }
}
</style>

## API

### Props

| 属性  | 说明     | 类型                | 可选值 | 默认值   |
| ----- | -------- | ------------------- | ------ | -------- |
| name  | 图标名称 | `string`            | -      | ''       |
| size  | 图标大小 | `number` / `string` | -      | 16px     |
| color | 图标颜色 | `string`            | -      | 继承颜色 |
