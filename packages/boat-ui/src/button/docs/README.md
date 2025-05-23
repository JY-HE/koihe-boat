# Button

常用的操作按钮。

## 基础用法

使用 `type` 来定义按钮的样式。

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| type            | 按钮类型           | string   | primary / success / error / warning / info / link        | '' |
| disabled | 是否禁用按钮 | boolean | - | false    |
| plain | 是否为次要按钮 | boolean | - | false    |


### Events

| 事件名 | 说明               | 类型            |  参数          |
| ------ | ------------------ | ------------------ |  ---------------- |
| click  | 点击按钮触发的事件 | Function | `(event: MouseEvent) => void` | `(event: MouseEvent) => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

