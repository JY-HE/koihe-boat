<template>
    <svg class="boat-icon" :style="style" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { iconProps } from './props';

defineOptions({
    name: 'BoatIcon',
});

const props = defineProps(iconProps);

const iconName = computed(() => `#boat-${props.name}`);

const style = computed(() => ({
    color: props.color,
    fontSize: props.size,
}));
</script>
