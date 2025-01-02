<template>
    <div ref="notificationElement" :class="classes" :style="styles">
        <div class="notification-header">
            <div class="notification-header__icon">
                <boat-icon v-if="iconName" :name="iconName" :color="iconColor" />
            </div>
            <div class="notification-header__title">{{ title }}</div>
            <div v-if="showClose" class="notification-header__close" @click="handleClose">
                <boat-icon name="close" />
            </div>
        </div>
        <div class="notification-content">
            <slot>
                <template
                    v-if="isVNode(content) || (isRenderFunction(content) && isVNode(content()))"
                >
                    <component :is="content" />
                </template>
                <template v-else>
                    <p>
                        {{ content }}
                    </p>
                </template>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, isVNode, type VNode } from 'vue';
import { BoatIcon } from '../../icon';
import { boatNotificationProps } from './props';

defineOptions({
    name: 'BoatNotification',
});

const notificationElement = ref<HTMLElement | null>(null);

const props = defineProps(boatNotificationProps);

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const classes = computed(() => {
    return {
        'boat-notification': true,
        [`boat-notification--${props.type}`]: props.type,
        [props.customClass]: props.customClass,
        right: props.position === 'top-right' || props.position === 'bottom-right',
        left: props.position === 'top-left' || props.position === 'bottom-left',
    };
});

const iconName = computed(() => {
    return props.type || props.icon;
});

const iconColor = computed(() => {
    const colors = new Map([
        ['success', 'rgb(var(--boat-success-color))'],
        ['error', 'rgb(var(--boat-error-color))'],
        ['warning', 'rgb(var(--boat-warning-color))'],
        ['info', 'rgb(var(--boat-info-color))'],
    ]);
    return colors.get(props.type) || props.iconColor;
});

const styles = computed(() => {
    if (props.position === 'top-right' || props.position === 'top-left') {
        return {
            top: props.offset + 'px',
        };
    }
    if (props.position === 'bottom-right' || props.position === 'bottom-left') {
        return {
            bottom: props.offset + 'px',
        };
    }
    return {};
});

const handleClose = () => {
    emit('close');
    clearTimer();
    notificationElement.value?.remove();
};

const isRenderFunction = (value: unknown): value is () => VNode => {
    return typeof value === 'function' && !value.length;
};

function appendToHandler() {
    const appendToElement = ref<HTMLElement | null>(null);
    if (typeof props.appendTo === 'string') {
        appendToElement.value =
            (document.getElementsByClassName(props.appendTo)[0] as HTMLElement) || null;
    }
    if (typeof props.appendTo === 'object') {
        appendToElement.value = props.appendTo;
    }
    if (!appendToElement.value) {
        appendToElement.value = document.body;
    }
    appendToElement.value.appendChild(notificationElement.value!);
}
watch(
    () => props.appendTo,
    () => {
        appendToHandler();
    }
);

const timer = ref<NodeJS.Timeout | null>(null);

function clearTimer() {
    if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
    }
}

function startTimer() {
    if (props.duration === 0) return;
    clearTimer();
    timer.value = setTimeout(() => {
        handleClose();
    }, props.duration);
}

onMounted(() => {
    appendToHandler();
    startTimer();
});
</script>
