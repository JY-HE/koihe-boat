# Icon 图标组件

Boat UI 提供了常用的 SVG 图标组件。

## 基础用法

```vue
<template>
  <div>
    <boat-icon name="search" size="24" color="#409EFF"></boat-icon>
  </div>
</template>
```

## API

### Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----- | ---- | ---- | ------ | ------ |
| name | 图标名称 | string | - | '' |
| size | 图标大小 | number / string | - | 16px |
| color | 图标颜色 | string | - | 继承颜色 |

## 注意事项

1. 图标名称需与图标库中的名称完全匹配
2. 建议使用16px、24px、32px等标准尺寸
3. 可通过CSS自定义图标样式
