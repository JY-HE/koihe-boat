<template>
    <button :class="classes" @click="handleClick" :disabled="disabled">
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { boatButtonProps } from './props';

defineOptions({
    name: 'BoatButton',
});

const props = defineProps(boatButtonProps);

const emit = defineEmits<{
    (e: 'click', event: Event): void;
}>();

const classes = computed(() => {
    return {
        'boat-button': true,
        'boat-button--default': !props.type,
        [`boat-button--${props.type}`]: props.type,
        'is-disabled': props.disabled,
        plain: props.plain,
    };
});

/**
 * 处理点击事件
 */
const handleClick = (event: Event) => {
    emit('click', event);
};
</script>
