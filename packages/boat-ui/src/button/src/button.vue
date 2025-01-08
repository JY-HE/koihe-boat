<template>
    <button :class="classes" @click="handleClick" :disabled="disabled">
        <slot />
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

const classes = computed(() => ({
    'boat-button': true,
    'boat-button--default': !props.type,
    [`boat-button--${props.type}`]: props.type,
    'is-disabled': props.disabled,
    plain: props.plain,
}));

const handleClick = (event: Event) => {
    emit('click', event);
};
</script>
