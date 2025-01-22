# Draggable 指令

## 介绍
`index.ts` 文件实现了一个基于 Vue 3 的自定义指令，提供拖拽功能。该指令允许用户在指定的触发元素上进行拖拽操作，并提供一系列事件回调以满足不同的业务需求。

## 使用方法

### 安装
在 Vue 3 项目中使用该指令，首先需要导入并注册：

```ts
import { createApp } from 'vue';
import DraggableDirective from './index';

const app = createApp(App);
app.directive('draggable', DraggableDirective);
