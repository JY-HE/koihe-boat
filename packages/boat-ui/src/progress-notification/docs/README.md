# ProgressNotification

悬浮出现在页面角落，可以用于显示某些场景的进度通知，如下载、上传、导入和导出等，并且支持重试或取消操作。

## 基础用法

### 自定义状态

你可以通过 `status` 属性来控制 `ProgressNotification` 的状态。当 `status` 为 `error` 时，会显示底部操作按钮，可以重试或取消操作。当 `status` 为 `success` 时，经过 `duration` 设置的时间后会自动关闭。

```vue
<template>
    <boat-button @click="open"> open </boat-button>
    <boat-progress-notification
        v-model="visible"
        :status="status"
        title="上传"
        message="test.json"
        :errorTip="errorTip"
        @retry="handleRetry"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref<'error' | 'success' | ''>('');
const visible = ref(false);
const errorTip = ref('');

const open = () => {
    visible.value = true;
    // 使用 setTimeout 模仿接口请求
    setTimeout(() => {
        status.value = 'error';
        errorTip.value = '上传失败，请重试';
    }, 4000);
};

const handleRetry = () => {
    setTimeout(() => {
        status.value = 'success';
    }, 5000);
};
</script>
```

### 使用 action 函数控制状态（推荐用法）

`ProgressNotification` 提供一个 `action` 属性，它接收一个 `Promise` 函数。当使用 `action` 时，不需要传递 `status` 和 `errorTip` 属性，此时 `status` 由 `action` 函数是否执行成功决定，`errorTip` 由 `action` 函数抛出的错误决定。

#### success

当 `action` 执行成功后，经过 `duration` 设置的时间后会自动关闭。

```vue
<template>
    <boat-button @click="visible = value"> open </boat-button>

    <boat-progress-notification
        v-model="visible"
        title="Success"
        message="test.json"
        :action="actionSuccess"
    />
</template>

<script setup lang="ts">
const actionSuccess = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            // 确保错误被抛出
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('🚀 ~ App.vue ~ actionSuccess:', data);
    } catch (error) {
        throw error; // 确保错误被抛出
    }
};
</script>
```

#### Error

当 `action` 执行失败时，会显示底部操作按钮，点击 `Retry` 会重新执行 `action`，点击 `Cancel` 会取消执行并且关闭 `ProgressNotification`。

```vue
<template>
    <boat-button @click="visible = value"> open </boat-button>

    <boat-progress-notification
        v-model="visible"
        title="Error"
        message="test.json"
        :action="actionFailure"
    />
</template>

<script setup lang="ts">
const actionFailure = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid-url', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // 确保错误被抛出
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('🚀 ~ App.vue:50 ~ actionFailure:', data);
    } catch (error) {
        throw error; // 确保错误被抛出
    }
};
</script>
```

## API

### Props

| 属性              | 说明                             | 类型 | 可选值           | 默认值        |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| v-model | 是否显示 | boolean | - | false |
| title | 标题 | string | - | '' |
| message | 消息内容 | string | - | '' |
| customClass | 自定义类名 | string | - | '' |
| status | 状态 | string | success / error | '' |
| errorTip | 当 status 为 error 时显示错误信息 | string | - | '' |
| duration | status 为 success 时自动关闭时间, 单位为毫秒。值为 0 则不会自动关闭 | number | - | 3000 |
| showClose | 是否显示关闭按钮 | boolean | - | true |
| zIndex | 设置通知的 z-index | number | - | 9999 |
| footerLeftText | 底部左侧按钮文本 | string |  - | 'Cancel' |
| footerRightText | 底部右侧按钮文本 | string |  - | 'Retry' |
| footerLeftDisabled | 底部左侧按钮是否禁用 | boolean | - | false |
| footerRightDisabled | 底部右侧按钮是否禁用 | boolean | - | false |
| action | 执行函数 |  Function(() => Promise<any>) | - | null |
| appendTo | 挂载到哪个 DOM 元素，默认为 body 元素。在挂载前请确保该元素已经存在 |  string / HTMLElement | - | 'body' |
| position | 自定义弹出位置 | string | top-right / top-left / bottom-right / bottom-left | top-right |
| offset | 相对屏幕顶部/底部的距离 | number | - | 16 |

### Events

| 事件名 | 说明               | 类型            |  参数          |
| ------ | ------------------ | ------------------ |  ---------------- |
| close  | 关闭 / 取消事件 | Function | `() => void` |
| retry  | 重试事件 | Function |`() => void` |
