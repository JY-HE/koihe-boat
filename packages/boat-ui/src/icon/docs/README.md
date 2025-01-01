# Icon

Boat UI 提供了常用的图标。

## 基础用法

```vue
<!-- 使用 boat-icon 为 SVG 图标提供属性 -->
<template>
  <div>
    <boat-icon :name="name" :size="size" :color="color">
    </boat-icon>
  </div>
</template>
```

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| name | 图标名称 | string | - | '' |
| size | SVG 图标的大小，size x size | number/string | - | 16px |
| color | 图标颜色 | string | - | 继承颜色 |

