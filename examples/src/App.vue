<template>
    <div>
        <!-- <boat-button type="primary" plain>primary</boat-button>
        <boat-button type="danger" round>danger</boat-button>
        <boat-button type="success" circle>success</boat-button>
        <boat-button type="warning" mimicry>warning</boat-button>
        <boat-button type="info" disabled>info</boat-button>
        <boat-button type="text">text</boat-button> -->

        <boat-progress-notification
            title="上传文件"
            :fileName="file.name"
            :progress="uploadProgress"
            :status="status"
            @retry="handleRetry"
            @cancel="handleCancel"
        />
    </div>
</template>
<script setup>
import { ref } from 'vue';

const uploadProgress = ref(67);
const status = ref('error'); // 可选值：'progress' | 'success' | 'error'
const file = ref({ name: 'example.pdf' });

const handleRetry = () => {
    // 处理重试逻辑
    console.log('重试上传');
};

const handleCancel = () => {
    // 处理取消逻辑
    console.log('取消上传');
};
</script>
