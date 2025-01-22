# Button

## 基础用法

使用 `type` 和 `plain` 来定义按钮的样式。

<div>
    <boat-button>Default</boat-button>
    <boat-button type="primary">Primary</boat-button>
    <boat-button type="success">Success</boat-button>
    <boat-button type="error">Error</boat-button>
    <boat-button type="warning">Warning</boat-button>
    <boat-button type="info">Info</boat-button>
    <boat-button type="link">Link</boat-button>
</div>

<div>
    <boat-button plain>Default</boat-button>
    <boat-button type="primary" plain>Primary</boat-button>
    <boat-button type="success" plain>Success</boat-button>
    <boat-button type="error" plain>Error</boat-button>
    <boat-button type="warning" plain>Warning</boat-button>
    <boat-button type="info" plain>Info</boat-button>
    <boat-button type="link" plain>Link</boat-button>
</div>

::: details 查看源代码
```vue
<template>
    <div class="mr-4 mb-4">
        <boat-button>Default</boat-button>
        <boat-button type="primary">Primary</boat-button>
        <boat-button type="success">Success</boat-button>
        <boat-button type="error">Error</boat-button>
        <boat-button type="warning">Warning</boat-button>
        <boat-button type="info">Info</boat-button>
        <boat-button type="link">Link</boat-button>
    </div>

    <div class="mr-4 mb-4">
        <boat-button plain>Default</boat-button>
        <boat-button type="primary" plain>Primary</boat-button>
        <boat-button type="success" plain>Success</boat-button>
        <boat-button type="error" plain>Error</boat-button>
        <boat-button type="warning" plain>Warning</boat-button>
        <boat-button type="info" plain>Info</boat-button>
        <boat-button type="link" plain>Link</boat-button>
    </div>
</template>
```
:::

## 禁用状态

使用 `disabled` 属性来控制按钮是否为禁用状态。该属性接受一个 `Boolean` 类型的值。

<div>
    <boat-button disabled>Default</boat-button>
    <boat-button type="primary" disabled>Primary</boat-button>
    <boat-button type="success" disabled>Success</boat-button>
    <boat-button type="error" disabled>Error</boat-button>
    <boat-button type="warning" disabled>Warning</boat-button>
    <boat-button type="info" disabled>Info</boat-button>
    <boat-button type="link" disabled>Link</boat-button>
</div>

<div>
    <boat-button disabled plain>Default</boat-button>
    <boat-button type="primary" disabled plain>Primary</boat-button>
    <boat-button type="success" disabled plain>Success</boat-button>
    <boat-button type="error" disabled plain>Error</boat-button>
    <boat-button type="warning" disabled plain>Warning</boat-button>
    <boat-button type="info" disabled plain>Info</boat-button>
    <boat-button type="link" disabled plain>Link</boat-button>
</div>

::: details 查看源代码
```vue
<template>
    <div class="mr-4 mb-4">
        <boat-button disabled>Default</boat-button>
        <boat-button type="primary" disabled>Primary</boat-button>
        <boat-button type="success" disabled>Success</boat-button>
        <boat-button type="error" disabled>Error</boat-button>
        <boat-button type="warning" disabled>Warning</boat-button>
        <boat-button type="info" disabled>Info</boat-button>
        <boat-button type="link" disabled>Link</boat-button>
    </div>

    <div class="mr-4 mb-4">
        <boat-button plain>Default</boat-button>
        <boat-button type="primary" disabled plain>Primary</boat-button>
        <boat-button type="success" disabled plain>Success</boat-button>
        <boat-button type="error" disabled plain>Error</boat-button>
        <boat-button type="warning" disabled plain>Warning</boat-button>
        <boat-button type="info" disabled plain>Info</boat-button>
        <boat-button type="link" disabled plain>Link</boat-button>
    </div>
</template>
```
:::

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| type            | 按钮类型           | `string`   | `primary` / `success` / `error` / `warning` / `info` / `link`        | '' |
| disabled | 是否禁用按钮 | `boolean` | - | false    |
| plain | 是否为次要按钮 | `boolean` | - | false    |


### Events

| 事件名 | 说明               | 类型            |  参数          |
| ------ | ------------------ | ------------------ |  ---------------- |
| click  | 点击按钮触发的事件 | Function | `(event: MouseEvent) => void` | `(event: MouseEvent) => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
