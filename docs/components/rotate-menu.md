# RotateMenu

悬浮在页面上可拖拽的旋转菜单按钮。

<boat-rotate-menu :menus="['home1', 'download', 'search']" @click="click"/>

<script setup lang="ts">
import { useRouter, useData } from 'vitepress';

const router = useRouter();
const { site } = useData();
const map = new Map([
    ['home1',''],
    ['download','guide/installation'],
])

const click = (item: string) => {
    if (item === 'search') {
        triggerSearchShortcut();
        return;
    }
    const path = map.get(item)
    const base = site.value.base;
    router.go(`${base}${path}`)
};

const triggerSearchShortcut = () => {
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    ctrlKey: true,
    bubbles: true,
  });
  document.dispatchEvent(event);
};
</script>

## 基础用法

`RotateMenu` 接收一个 `menus` 字段，它的类型是字符串数组或者数组对象。

### menus 为字符串数组

当 `menus` 为字符串数组时，值必须是 `boat-icon` 图标名称，`RotateMenu` 会渲染成 `boat-icon` 图标。

```vue
<template>
    <boat-rotate-menu :menus="['home1', 'download', 'search']"></boat-rotate-menu>
</template>
```

### menus 为数组对象

当 `menus` 为数组对象时，你需要通过默认插槽自定义菜单项内容。

```vue
<template>
    <boat-rotate-menu :menus="menus">
        <template v-slot="{ data }">
            {{ data.name }}
        </template>
    </boat-rotate-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const menus = computed(() => {
    return [
        {
            name: '1',
        },
        {
            name: '2',
        },
        {
            name: '3',
        },
        {
            name: '4',
        },
        {
            name: '5',
        },
    ];
});
</script>
```

## API

### Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----- | ---- | ---- | ------ | ------ |
| menus | 菜单数组，支持传 boat-icon 图标名称字符串数组，或者自定义数据数组对象 | array | - | - |
| customClass | 自定义类名 | string | - | '' |
| radius | 半径 | number | - | 110 |
| zIndex | 设置 z-index | number | - | 9999 |

### Events

| 事件名 | 说明               | 类型            |  参数          |
| ------ | ------------------ | ------------------ |  ---------------- |
| click  | 点击菜单项触发 | Function  | `(menu: string \| object) => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义菜单项内容 |
