# Notification

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

你可以将 `Notification` 作为 `vue` 组件使用，通过设置 `title` 和 `content` 属性来设置通知的标题和正文内容。 默认情况下，通知在 4000 毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。如果你将它设置为 0，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 `Number`，单位为毫秒。

```vue
<template>
    <div>
        <boat-notification title="这是个标题" />
    </div>
</template>
```

## 单独引用

`Notification` 还可以通过函数调用直接应用于某些场景中。

### 字符串形式的 content

```vue
<template>
  <boat-button @click="open"> open </boat-button>
</template>

<script setup lang="ts">
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';

const open = () => {
    BoatNotification.notify({ title: '这是个标题', content: '这是一条消息' });
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
    BoatNotification.notify({
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
    BoatNotification.notify({
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
| appendTo | 设置 notification 的根元素，默认为 document.body。 | string / HTMLElement | - | - |
| duration | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭 | number | - | 4000 |
| position | 自定义弹出位置 | string | top-right / top-left / bottom-right / bottom-left | top-right |
| offset | 相对屏幕顶部/底部的距离 | number | - | 16 |
| gap | Notification 之间的间距 | number | - | 16 |
| content | 通知栏正文内容 | string / VNode / Function(()=>VNode) | - | '' |

### Events

| 事件名 | 说明               | 参数                          |
| ------ | ------------------ | ----------------------------- |
| close  | 点击关闭按钮触发的事件 | `() => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义通知栏正文内容。使用插槽会覆盖 content 属性 |

