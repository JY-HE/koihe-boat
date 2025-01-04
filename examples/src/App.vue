<template>
    <div class="con" ref="conRef">
        <!-- <boat-button @click="handleRetry">默认按钮</boat-button>
        <boat-button type="primary" @click="handleCancel">主要按钮</boat-button>
        <boat-button type="error">危险按钮</boat-button>
        <boat-button type="success">成功按钮</boat-button>
        <boat-button type="warning">警告按钮</boat-button>
        <boat-button type="info">信息按钮</boat-button>
        <boat-button type="link">这是个链接</boat-button> -->

        <!-- <boat-notification
            title="成功"
            icon="search"
            :duration="0"
            content="This is a message that does not automatically close"
            footer-text="关闭"
            footer-disabled
            @footer-click="() => console.log('footer-click')"
        >
        </boat-notification> -->

        <boat-progress-notification
            title="上传文件"
            status="error"
            :fileName="file.name"
            :progress="uploadProgress"
            @retry="handleRetry"
            @cancel="handleCancel"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, h } from 'vue';
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';

const uploadProgress = ref(67);
const status = ref('error'); // 可选值：'progress' | 'success' | 'error'
const file = ref({ name: 'example.pdf' });
const conRef = ref<HTMLElement | null>(null);

const handleRetry = () => {
    BoatNotification.notify({
        type: 'success',
        title: '这是个标题',
        duration: 0,
        content: h(
            'div',
            '这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息'
        ),
        position: 'bottom-right',
    });
};

const handleCancel = () => {
    BoatNotification.notify({
        title: '这是个标题',
        duration: 0,
        content: () => h('div', [h('span', '这是一条'), h('strong', '重要消息')]),
        position: 'top-right',
    });

    // BoatNotification.notify({
    //     title: '这是个标题',
    //     duration: 0,
    //     content: () => h('div', [h('span', '这是一条'), h('strong', '重要消息')]),
    //     position: 'top-right',
    // });
};
</script>
