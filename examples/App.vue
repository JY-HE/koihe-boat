<template>
    <div>
        <boat-button type="primary" plain>主要</boat-button>
        <boat-input v-model:value="value" placeholder="请输入内容"></boat-input>
    </div>
</template>
<script lang="ts" setup>
import { BoatInput, BoatButton } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/input/style.css';
</script>
