---
permalink: /src/button
---

# Button

常用的操作按钮。

## 基础用法

使用 `type` / `plain`、`round`、`circle` 和 `mimicry` 来定义按钮的样式。

<demo src="../__demos__/basic.vue"></demo>

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| type            | 按钮类型           | string   | primary / success / danger / warning / info / text        | default |
| plain | 是否为朴素按钮       | boolean | - | false    |
| round | 是否为圆角按钮   | boolean | - | false     |
| circle | 是否为圆形按钮 | boolean | - |  false    |
| mimicry | 是否为拟态按钮 | boolean | - | false    |
| disabled | 是否禁用按钮 | boolean | - | false    |
| icon | 按钮图标 | string | - | -    |

### Events

| 事件名 | 说明               | 参数                          |
| ------ | ------------------ | ----------------------------- |
| click  | 点击按钮触发的事件 | `(event: MouseEvent) => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

