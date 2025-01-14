# Icon 图标

## 基础用法

```vue
<template>
    <boat-icon name="search" size="24" color="#409EFF"></boat-icon>
</template>
```

## 图标集合

<div :class="$style.iconBox">
    <div :class="$style.iconItem" v-for="item in icons" :key="item">
        <boat-icon :name="item" size="24"></boat-icon>
        <p> {{ item }} </p>
    </div>
</div>

<script setup>
import { computed } from 'vue'

const icons = computed(()=>{
    return ['search', 'info', 'error', 'success', 'close', 'warning']
})
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

    p {
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
