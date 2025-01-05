<template>
    <div class="con" ref="conRef">
        <boat-button @click="handleRetry">默认按钮</boat-button>
        <boat-button type="primary" @click="handleCancel">主要按钮</boat-button>
        <boat-button type="error" @click="handleClose">危险按钮</boat-button>
        <boat-button type="success">成功按钮</boat-button>
        <boat-button type="warning">警告按钮</boat-button>
        <boat-button type="info">信息按钮</boat-button>
        <boat-button type="link">这是个链接</boat-button>

        <boat-notification
            ref="notificationRef"
            title="成功"
            :duration="0"
            icon="search"
            position="bottom-left"
            content="345463"
            show-footer-button
            footer-button-text="这是个按钮2135235"
        >
            <div>11215266</div>
            <template #footer>
                <boat-button @click="() => console.log(457547)">这是个按钮1</boat-button>
            </template>
        </boat-notification>

        <boat-progress-notification
            ref="progressNotificationRef"
            title="上传文件"
            :message="file.name"
            :status="status"
            :duration="3000"
            @retry="handleRetry"
            @cancel="handleCancel"
            @close="handleClose"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, h } from 'vue';
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';

const status = ref<'success' | 'error' | ''>('' as const);
const file = ref({ name: 'example.pdf' });
const conRef = ref<HTMLElement | null>(null);

setTimeout(() => {
    status.value = 'success';
}, 5000);

const notificationRef = ref<InstanceType<typeof BoatNotification> | null>(null);

const handleRetry = () => {
    notificationRef.value = BoatNotification.notify({
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

const handleClose = () => {
    notificationRef.value?.close();
    console.log('🚀 ~ App.vue:85 ~ notificationRef.value:', notificationRef.value);
    console.log('notification closed');
};
</script>
