<template>
    <div class="con" ref="conRef">
        <boat-icon name="close" color="blue" size="24px" />
        <boat-button plain>BoatNotification</boat-button>
        <boat-button type="primary" plain disabled>$notify</boat-button>
        <boat-button type="error" plain disabled>close</boat-button>
        <boat-button type="success" plain disabled>close</boat-button>
        <boat-button type="info" plain disabled>close</boat-button>
        <boat-button type="link" plain disabled>close</boat-button>
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
        duration: 0,
        type: 'success',
        position: 'top-left',
        content: () => h('p', null, '这是个内容111'),
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
