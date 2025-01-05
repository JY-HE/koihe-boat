<template>
    <teleport to="#boat-notification-container" :disabled="!hasContainer">
        <div ref="notificationElement" :class="classes" :style="styles">
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
            <div v-if="$slots.footer" class="notification-footer">
                <slot name="footer" />
            </div>
            <div v-if="!$slots.footer && showFooterButton" class="notification-footer">
                <boat-button
                    :disabled="footerButtonDisabled"
                    :type="footerButtonType || type"
                    @click="emit('footer-click')"
                >
                    {{ footerButtonText }}
                </boat-button>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch, isVNode, type VNode } from 'vue';
import { BoatIcon } from '../../icon';
import { BoatButton } from '../../button';
import { boatNotificationProps } from './props';

defineOptions({
    name: 'BoatNotification',
});

// Props & Emits
const props = defineProps(boatNotificationProps);
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'footer-click'): void;
}>();

// Refs
const notificationElement = ref<HTMLElement | null>(null);
const isClosing = ref(false);
const durationTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const hasContainer = ref(false);

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

    if (props.position === 'top-right' || props.position === 'top-left') {
        style.top = props.offset + 'px';
    }
    if (props.position === 'bottom-right' || props.position === 'bottom-left') {
        style.bottom = props.offset + 'px';
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

/**
 * @description 创建或获取通知容器，如果不存在则创建新的容器
 * @returns {HTMLElement} 返回通知容器元素
 */
function createContainer() {
    let container = document.getElementById('boat-notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'boat-notification-container';
        container.style.zIndex = String(props.zIndex);
        document.body.appendChild(container);
        hasContainer.value = true;
    }
    return container;
}

// 立即创建容器
createContainer();

// Container & Observer
let observer: MutationObserver | null = null;

/**
 * @description 监听容器的子元素变化，当有变化时更新通知位置
 * @param container 需要观察的容器元素
 */
function setupObserver(container: HTMLElement) {
    if (observer) return;

    observer = new MutationObserver(() => {
        updatePosition();
    });

    observer.observe(container, {
        childList: true,
        subtree: true,
    });
}

/**
 * @description 获取或创建容器，并确保已设置 MutationObserver
 * @returns {HTMLElement} 返回通知容器元素
 */
function ensureContainer() {
    const container = document.getElementById('boat-notification-container');
    if (!container) {
        return createContainer();
    }

    setupObserver(container);
    hasContainer.value = true;
    return container;
}

/**
 * @description 计算并设置每个通知元素的位置，确保它们不会重叠
 */
function updatePosition() {
    requestAnimationFrame(() => {
        const container = document.getElementById('boat-notification-container');
        if (!container) return;

        const elements = Array.from(
            container.querySelectorAll(`.boat-notification.${props.position}`)
        );

        if (elements.length <= 0) return;

        let totalHeight = props.offset;
        elements.forEach(element => {
            const el = element as HTMLElement;
            const height = el.offsetHeight;

            if (props.position.includes('top')) {
                el.style.top = `${totalHeight}px`;
                totalHeight += height + props.gap;
            } else if (props.position.includes('bottom')) {
                el.style.bottom = `${totalHeight}px`;
                totalHeight += height + props.gap;
            }
        });
    });
}

/**
 * @description 清除并重置定时器
 */
function clearDurationTimer() {
    if (durationTimer.value) {
        clearTimeout(durationTimer.value);
        durationTimer.value = null;
    }
}

/**
 * @description 根据 duration 属性设置自动关闭定时器
 */
function startDurationTimer() {
    clearDurationTimer();
    if (props.duration === 0) return;
    durationTimer.value = setTimeout(() => close(), props.duration);
}

/**
 * @description 移除通知元素并触发关闭事件
 */
const close = () => {
    if (isClosing.value) return;
    isClosing.value = true;

    emit('close');
    clearDurationTimer();

    if (notificationElement.value) {
        notificationElement.value.remove();
        updatePosition();
        isClosing.value = false;
    }
};

/**
 * @description 检查值是否为渲染函数
 * @param value 需要检查的值
 * @returns {boolean} 是否为渲染函数
 */
const isRenderFunction = (value: unknown): value is () => VNode => {
    return typeof value === 'function' && !value.length;
};

// Watchers
watch(
    () => props.duration,
    () => {
        if (!isClosing.value) {
            startDurationTimer();
        }
    }
);

// Lifecycle Hooks
onMounted(() => {
    if (!isClosing.value) {
        const container = ensureContainer();
        setupObserver(container);
        startDurationTimer();
        requestAnimationFrame(() => {
            updatePosition();
        });
    }
});

onUnmounted(() => {
    clearDurationTimer();
    isClosing.value = true;

    // 移除元素
    notificationElement.value?.remove();
    updatePosition();

    // 检查容器是否为空
    const container = document.getElementById('boat-notification-container');
    if (container && !container.hasChildNodes()) {
        container.remove();
        observer?.disconnect();
        observer = null;
        // 重置容器状态
        hasContainer.value = false;
    }
});

defineExpose({
    close,
});
</script>
