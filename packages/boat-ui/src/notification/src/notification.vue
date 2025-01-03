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
        <div class="notification-footer">
            <template v-if="$slots.footer">
                <slot name="footer" />
            </template>
            <template v-else>
                <boat-button
                    :disabled="footerDisabled"
                    :type="footerType || type"
                    @click="emit('footer-click')"
                >
                    {{ footerText }}
                </boat-button>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeMount, ref, watch, isVNode, nextTick, type VNode } from 'vue';
import { BoatIcon } from '../../icon';
import { BoatButton } from '../../button';
import { boatNotificationProps } from './props';

defineOptions({
    name: 'BoatNotification',
});

const notificationElement = ref<HTMLElement | null>(null);

const props = defineProps(boatNotificationProps);

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'footer-click'): void;
}>();

const classes = computed(() => {
    return {
        'boat-notification': true,
        [`boat-notification--${props.type}`]: props.type,
        [props.customClass]: props.customClass,
        [`${props.position}`]: props.position,
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
    nextTick(updatePosition);
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

function getPosition() {
    nextTick(() => {
        const elements = Array.from(
            document.getElementsByClassName(`boat-notification ${props.position}`)
        );

        if (elements.length <= 1) return;

        const currentElement = elements.at(-1) as HTMLElement;
        const previousElement = elements.at(-2) as HTMLElement;

        if (!currentElement || !previousElement) return;

        const previousRect = previousElement.getBoundingClientRect();

        if (props.position.includes('top')) {
            const offset = previousRect.top + previousRect.height + props.gap;
            currentElement.style.top = `${offset}px`;
        } else if (props.position.includes('bottom')) {
            const offset = window.innerHeight - previousRect.top + props.gap;
            currentElement.style.bottom = `${offset}px`;
        }
    });
}

function updatePosition() {
    nextTick(() => {
        const elements = Array.from(
            document.getElementsByClassName(`boat-notification ${props.position}`)
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

onBeforeMount(() => {
    getPosition();
});

onMounted(() => {
    appendToHandler();
    startTimer();
});
</script>
