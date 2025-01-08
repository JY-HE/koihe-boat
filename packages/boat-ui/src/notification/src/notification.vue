<template>
    <transition
        name="boat-notification-fade"
        @before-leave="onBeforeLeave"
        @after-leave="onAfterLeave"
    >
        <div
            v-show="visible"
            :id="id"
            :class="classes"
            :style="styles"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
        >
            <div class="notification-header">
                <div class="notification-header__icon">
                    <boat-icon v-if="iconName" :name="iconName" :color="iconColor" />
                </div>
                <div class="notification-header__title">{{ title }}</div>
                <div v-if="showClose" class="notification-header__close" @click="close">
                    <boat-icon name="close" />
                </div>
            </div>
            <div v-if="content" class="notification-content">
                <slot>
                    <template
                        v-if="isVNode(content) || (isRenderFunction(content) && isVNode(content()))"
                    >
                        <component :is="content" />
                    </template>
                    <template v-else>
                        <p>{{ content }}</p>
                    </template>
                </slot>
            </div>
            <div v-if="showFooterButton" class="notification-footer">
                <boat-button
                    :disabled="footerButtonDisabled"
                    :type="footerButtonType || type"
                    @click="onFooterButtonClick"
                >
                    {{ footerButtonText }}
                </boat-button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, isVNode, type VNode } from 'vue';
import { BoatIcon } from '../../icon';
import { BoatButton } from '../../button';
import { boatNotificationProps } from './props';

defineOptions({
    name: 'BoatNotification',
});

// Props
const props = defineProps(boatNotificationProps);

// Refs
const visible = ref(true);
const timer = ref<ReturnType<typeof setTimeout> | null>(null);

// Computed
const classes = computed(() => ({
    'boat-notification': true,
    [`boat-notification--${props.type}`]: props.type,
    [props.customClass]: props.customClass,
    [`${props.position}`]: props.position,
}));
const styles = computed(() => {
    const style: Record<string, string> = {
        zIndex: String(props.zIndex),
    };

    if (typeof props.offset === 'number') {
        if (props.position?.includes('top')) {
            style.top = `${props.offset}px`;
        }
        if (props.position?.includes('bottom')) {
            style.bottom = `${props.offset}px`;
        }
    }

    return style;
});
const iconName = computed(() => props.type || props.icon);
const iconColor = computed(() => {
    const colors = new Map([
        ['success', 'rgb(var(--boat-success-color))'],
        ['error', 'rgb(var(--boat-error-color))'],
        ['warning', 'rgb(var(--boat-warning-color))'],
        ['info', 'rgb(var(--boat-info-color))'],
    ]);
    return colors.get(props.type) || props.iconColor;
});

// Methods
function startTimer() {
    if (props.duration === 0 || !visible.value) return;
    timer.value = setTimeout(() => {
        close();
    }, props.duration);
}

function clearTimer() {
    if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
    }
}

function close() {
    visible.value = false;
}

/**
 * @description 检查值是否为渲染函数
 * @param value 需要检查的值
 * @returns {boolean} 是否为渲染函数
 */
const isRenderFunction = (value: unknown): value is () => VNode => {
    return typeof value === 'function' && !value.length;
};

function onBeforeLeave() {
    props.onClose?.();
}

function onAfterLeave() {
    props.onDestroy?.();
}

function onFooterButtonClick() {
    props.onFooterClick?.();
}

// Lifecycle
onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearTimer();
});

// Expose
defineExpose({
    visible,
    close,
});
</script>
