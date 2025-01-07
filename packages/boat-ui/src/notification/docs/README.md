# Notification

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

### 全局引用

如果你全局注册了 `BoatUI`，那么可以直接使用 `$notify` 方法来调用。

```vue
<template>
    <div>
        <boat-button @click="open"> open </boat-button>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()!;

const open = () => {
    proxy.$notify({
        title: '全局引用',
        content: '这是一条消息',
    });
}
</script>
```

### 单独引用

如果你没有全局注册 `BoatUI`，那么可以单独引用 `BoatNotification`。

```vue
<template>
    <div>
        <boat-button @click="open"> open </boat-button>
    </div>
</template>

<script setup lang="ts">
import { BoatNotification } from '@koihe/boat-ui';
// 引入 BoatNotification 样式。如果已经全局引入了 BoatUI 的样式文件则可以忽略
import '@koihe/boat-ui/es/notification/style/index';

const open = () => {
    BoatNotification({
        title: '单独引用',
        content: '这是一条消息',
    });
}
</script>
```

## content 属性用法

### 字符串形式的 content

```vue
<template>
  <boat-button @click="open"> open </boat-button>
</template>

<script setup lang="ts">
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';

const open = () => {
    BoatNotification({ title: '这是个标题', content: '这是一条消息' });
}
</script>
```

### 函数形式的 content

`content` 支持一个返回值为 `VNode` 的函数。

```vue
... 

<script setup lang="ts">
...
import { h } from 'vue';

const open = () => {
    BoatNotification({
    title: '这是个标题',
    duration: 0,
    content: () => h('div', [h('span', '这是一条'), h('strong', '重要消息')]),
});
}
</script>
```

### h 函数形式的 content

`content` 支持直接使用 `h` 函数。

```vue
...

<script setup lang="ts">
...
import { h } from 'vue';

const open = () => {
    BoatNotification({
    title: '这是个标题',
    content: h('div', '这是一条消息'),
});
}
</script>
```

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| title | 标题 | string | - | '' |
| type            | 通知的类型           | string   | success / error / warning / info        | '' |
| customClass | 自定义类名 | string | - | '' |
| icon | 自定义图标。若设置了 type，则 icon 会被覆盖 | string | - | '' |
| iconColor | icon 颜色 | string | - | '' |
| showClose | 是否显示关闭按钮 | boolean | - | true |
| duration | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 | number | - | 4000 |
| position | 自定义弹出位置 | string | top-right / top-left / bottom-right / bottom-left | top-right |
| offset | 相对屏幕顶部/底部的距离 | number | - | 16 |
| content | 通知栏正文内容 | string / VNode / Function(()=>VNode) | - | '' |
| showFooterButton | 是否显示底部按钮 | boolean | - | false |
| footerButtonType | 底部按钮类型。若不设置，则与通知类型一致 | string |  primary / success / error / warning / info / link | '' |
| footerButtonText | 底部按钮文本 | string | - | 'button' |
| footerButtonDisabled | 底部按钮是否禁用 | boolean | - | false |
| zIndex | 设置通知的 z-index | number | - | 9999 |
| onClose | 关闭时的回调函数 | Function(() => void) | - | - |
| onDestroy | 销毁时的回调函数 | Function(() => void) | - | - |
| onFooterClick | 点击底部按钮时的回调函数 | Function(() => void) | - | - |

### Methods

`BoatNotification` 和 `$notify` 都返回当前的 `BoatNotification` 实例。如果需要手动关闭实例，可以调用它的 close 方法。也可以通过调用 `$notify.closeAll()` 或者 `BoatNotification.closeAll()` 来关闭所有通知。

| 方法名 | 说明               | 类型        | 参数                  |
| ------ | ------------------ | ----------------------------- | ------------------ |
| close  | 关闭当前的 BoatNotification |    Function    |`() => void` |
| closeAll  | 关闭所有 BoatNotification |    Function    |`() => void` |
