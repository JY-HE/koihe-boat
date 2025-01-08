<template>
    <div class="con" ref="conRef">
        <!-- <boat-button @click="handleRetry" plain>BoatNotification</boat-button>
        <boat-button type="primary" @click="handleCancel" plain disabled>$notify</boat-button>
        <boat-button type="error" @click="handleClose" plain disabled>close</boat-button>
        <boat-button type="success" @click="handleClose" plain disabled>close</boat-button>
        <boat-button type="info" @click="handleClose" plain disabled>close</boat-button>
        <boat-button type="link" @click="handleClose" plain disabled>close</boat-button> -->
        <boat-button @click="open"> open </boat-button>
    </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';

const open = () => {
    BoatNotification({
        title: '这是个标题',
        content: h('div', '这是一条消息'),
    });
};
</script>

<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
