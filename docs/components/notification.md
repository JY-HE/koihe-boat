# Notification

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

### 全局引用

如果你全局注册了 `BoatUI`，那么可以直接使用 `$notify` 方法来调用，它接受一个 `Object` 作为其参数。 在最简单的情况下，你可以通过设置 `title` 和 `content` 属性来设置通知的标题和正文内容。默认情况下，通知在 4000 毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。如果你将它设置为 0，那么通知将不会自动关闭。需要注意的是 `duration` 接收一个 `Number`，单位为毫秒。

<boat-button @click="open1">Closes automatically</boat-button>
<boat-button @click="open2">Won't close automatically</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="open1">Closes automatically</boat-button>
    <boat-button @click="open2">Won't close automatically</boat-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const open1 = () => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
    });
}

const open2 = () => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        duration: 0,
    });
}
</script>
```
:::

### 单独引用

如果你没有全局注册 `BoatUI`，那么可以单独引用 `BoatNotification`。

<boat-button @click="open1">Closes automatically</boat-button>
<boat-button @click="open2">Won't close automatically</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="open1">Closes automatically</boat-button>
    <boat-button @click="open2">Won't close automatically</boat-button>
</template>

<script setup lang="ts">
import { BoatNotification } from '@koihe/boat-ui';
// 引入 BoatNotification 样式。如果已经全局引入了 BoatUI 的样式文件则可以忽略
import '@koihe/boat-ui/es/notification/style/index';

const open1 = () => {
    BoatNotification({
        title: 'Title',
        content: 'This is a reminder',
    });
}

const open2 = () => {
    BoatNotification({
        title: 'Title',
        content: 'This is a reminder',
        duration: 0,
    });
}
</script>
```
:::

## 不同类型的通知

我们提供了四种不同类型的提醒框：`success`、`warning`、`info` 和 `error`。可以通过设置 `type` 字段来修改，除上述的四个值之外的值会被忽略。

<boat-button @click="open1('success')" type="success">Success</boat-button>
<boat-button @click="open1('error')" type="error">Error</boat-button>
<boat-button @click="open1('warning')" type="warning">Warning</boat-button>
<boat-button @click="open1('info')" type="info">Info</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="open('success')" type="success">Success</boat-button>
    <boat-button @click="open('error')" type="error">Error</boat-button>
    <boat-button @click="open('warning')" type="warning">Warning</boat-button>
    <boat-button @click="open('info')" type="info">Info</boat-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const open = (type = '') => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        type: type,
    });
}
</script>
```
:::

## 自定义消息弹出的位置​

可以让通知从屏幕四角中的任意一角弹出。使用 `position` 属性设置弹出位置，支持四个选项：`top-right`、`top-left`、`bottom-right` 和 `bottom-left`， 默认为 `top-right`。

<boat-button @click="open2('top-right', 4000)">Top Right</boat-button>
<boat-button @click="open2('top-left', 4000)">Top Left</boat-button>
<boat-button @click="open2('bottom-right', 4000)">Bottom Right</boat-button>
<boat-button @click="open2('bottom-left', 4000)">Bottom Left</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="open('top-right')">Top Right</boat-button>
    <boat-button @click="open('top-left')">Top Left</boat-button>
    <boat-button @click="open('bottom-right')">Bottom Right</boat-button>
    <boat-button @click="open('bottom-left')">Bottom Left</boat-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const open = (position = '') => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        position: position,
    });
}
</script>
```
:::

## 显示通知底部按钮

我们定义了一个位于通知底部的按钮，可以通过 `showFooterButton` 决定是否显示，它接收一个 `Boolean` 类型的值。并且可以通过 `footerButtonText` 自定义按钮的文本，`footerButtonType` 设置按钮的类型，以及设置 `footerButtonDisabled` 决定是否禁用。

<boat-button @click="openBtn(false)">Open has FooterButton</boat-button>
<boat-button @click="openBtn(true)">Disable FooterButton</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="open1">Open has FooterButton</boat-button>
    <boat-button @click="open2">Disable FooterButton</boat-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const open1 = () => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        showFooterButton: true,
    });
}

const open2 = () => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        showFooterButton: true,
        footerButtonDisabled: true,
    });
}
</script>
```
:::

## 函数形式的 content

`content` 支持一个返回值为 `VNode` 的函数。

<boat-button @click="openVNode">VNode</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="openVNode">VNode</boat-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance()!;

const openVNode = () => {
    proxy.$notify({
        title: 'Title',
        content: () => h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    });
}
</script>
```
:::

## h 函数形式的 content

`content` 支持直接使用 `h` 函数。

<boat-button @click="openH">openH</boat-button>

::: details 查看源代码
```vue
<template>
    <boat-button @click="openH">openH</boat-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance()!;

const openVNode = () => {
    proxy.$notify({
        title: 'Title',
        content: h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'h function'),
        ]),
    });
}
</script>
```
:::

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| title | 标题 | `string` | - | '' |
| type            | 通知的类型           | `string`   | `success` / `error` / `warning` / `info`        | '' |
| customClass | 自定义类名 | `string` | - | '' |
| icon | 自定义图标。若设置了 `type`，则 `icon` 会被覆盖 | `string` | - | '' |
| iconColor | `icon` 颜色 | `string` | - | '' |
| showClose | 是否显示关闭按钮 | `boolean` | - | true |
| duration | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 | `number` | - | 4000 |
| position | 自定义弹出位置 | `string` | `top-right` / `top-left` / `bottom-right` / `bottom-left` | top-right |
| offset | 相对屏幕顶部/底部的距离 | `number` | - | 16 |
| content | 通知栏正文内容 | `string` / `VNode` / `Function(()=>VNode)` | - | '' |
| showFooterButton | 是否显示底部按钮 | `boolean` | - | false |
| footerButtonType | 底部按钮类型。若不设置，则与通知类型一致 | `string` |  `primary` / `success` / `error` / `warning` / `info` / `link` | '' |
| footerButtonText | 底部按钮文本 | `string` | - | 'button' |
| footerButtonDisabled | 底部按钮是否禁用 | `boolean` | - | false |
| zIndex | 设置通知的 `z-index` | `number` | - | 9999 |
| onClose | 关闭时的回调函数 | `Function(() => void)` | - | - |
| onDestroy | 销毁时的回调函数 | `Function(() => void)` | - | - |
| onFooterClick | 点击底部按钮时的回调函数 | `Function(() => void)` | - | - |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义通知栏正文内容 |

### Methods

`BoatNotification` 和 `$notify` 都返回当前的 `BoatNotification` 实例。如果需要手动关闭实例，可以调用它的 `close` 方法。也可以通过调用 `$notify.closeAll()` 或者 `BoatNotification.closeAll()` 来关闭所有通知。

| 方法名 | 说明               | 类型        | 参数                  |
| ------ | ------------------ | ----------------------------- | ------------------ |
| close  | 关闭当前的 BoatNotification |    Function    |`() => void` |
| closeAll  | 关闭所有 BoatNotification |    Function    |`() => void` |


<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';

const { proxy } = getCurrentInstance()!;

const open1 = (type = '') => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        type: type,
    });
}

const open2 = (position = '', duration = 0) => {
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        duration: duration,
        position: position,
    });
}

const openVNode = () => {
    proxy.$notify({
        title: 'Title',
        content: () => h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    });
}

const openH = () => {
    proxy.$notify({
        title: 'Title',
        content: h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'h function'),
        ]),
    });
}

const openBtn = (footerButtonDisabled) =>{
    proxy.$notify({
        title: 'Title',
        content: 'This is a reminder',
        showFooterButton: true,
        footerButtonDisabled: footerButtonDisabled,
    });
}
</script>
