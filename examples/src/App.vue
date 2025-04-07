<template>
    <boat-rotate-menu :menus="menus" @click="click"> </boat-rotate-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const menus = computed(() => {
    return ['play', 'shut', 'close', 'move', 'delete'];
});

function click(data: string | object) {
    console.log('🚀 ~ App.vue:34 ~ data:', data);
}
</script>

<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: rgb(0, 0, 0);
}
</style>
