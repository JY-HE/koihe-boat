<template>
    <button
        class="boat-button"
        :class="[
            `boat-button-${type}`,
            {
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle,
                'is-disabled': disabled,
                'is-mimicry': mimicry,
            },
        ]"
        @click="handleClick"
        :disabled="disabled"
    >
        <i :class="icon" v-if="icon"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script lang="ts" setup>
import { boatButtonProps } from './props';

defineOptions({
    name: 'BoatButton',
});

defineProps(boatButtonProps);

const emit = defineEmits<{
    (e: 'click', event: Event): void;
}>();

/**
 * 处理点击事件
 */
const handleClick = (event: Event) => {
    emit('click', event);
};
</script>
