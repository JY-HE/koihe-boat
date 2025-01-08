<template>
    <teleport :to="appendTo">
        <transition name="boat-notification-fade">
            <div v-if="modelValue" :class="classes" :style="styles">
                <div class="progress-header">
                    <div class="progress-header__icon">
                        <boat-icon :name="iconName" />
                    </div>
                    <div class="progress-header__title">{{ title }}</div>
                    <div v-if="showClose" class="progress-header__close" @click="close">
                        <boat-icon name="close" />
                    </div>
                </div>
                <div class="progress-main">
                    <div v-if="message" class="progress-main__message">
                        {{ message }}
                    </div>
                    <div class="progress-main__bar">
                        <div class="progress-main__bar__inner" :style="{ width: `${progress}%` }" />
                    </div>
                    <div v-if="currentStatus === 'error'" class="progress-main__errorTip">
                        {{ errorMessage || errorTip }}
                    </div>
                </div>
                <div v-if="currentStatus === 'error'" class="progress-footer">
                    <boat-button @click="close" :disabled="footerLeftDisabled" type="error" plain>
                        {{ footerLeftText }}
                    </boat-button>
                    <boat-button type="error" @click="handleRetry" :disabled="footerRightDisabled">
                        {{ footerRightText }}
                    </boat-button>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import { BoatButton } from '../../button';
import { BoatIcon } from '../../icon';
import { boatProgressNotificationProps, type ProgressNotificationStatus } from './props';

defineOptions({
    name: 'BoatProgressNotification',
});

const props = defineProps(boatProgressNotificationProps);

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'retry'): void;
    (e: 'close'): void;
}>();

const currentStatus = ref<ProgressNotificationStatus>('');
const errorMessage = ref('');

// Computed
const classes = computed(() => {
    return {
        'boat-progress-notification': true,
        [`boat-progress-notification--${currentStatus.value}`]: currentStatus.value,
        [props.customClass]: props.customClass,
        [`${props.position}`]: props.position,
    };
});
const iconName = computed(() => currentStatus.value || 'info');
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

const progress = ref(0);
const progressTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const durationTimer = ref<ReturnType<typeof setTimeout> | null>(null);
/**
 * 清除进度条定时器
 */
function clearProgressTimer() {
    if (progressTimer.value) {
        clearTimeout(progressTimer.value);
        progressTimer.value = null;
    }
}
/**
 * 清除持续时间定时器
 */
function clearDurationTimer() {
    if (durationTimer.value) {
        clearTimeout(durationTimer.value);
        durationTimer.value = null;
    }
}
/**
 * 递增进度条
 */
function incrementProgress() {
    if (currentStatus.value === 'error') return;
    if (currentStatus.value === 'success') {
        progress.value = 100;
        if (props.duration > 0) {
            clearDurationTimer();
            durationTimer.value = setTimeout(() => {
                close();
            }, props.duration);
        }
        return;
    }
    if (progress.value < 90) {
        clearProgressTimer();
        progress.value += (90 - progress.value) * 0.1;
        progressTimer.value = setTimeout(incrementProgress, 500);
    }
}

/**
 * 关闭通知
 */
function close() {
    emit('close');
    clearProgressTimer();
    clearDurationTimer();
    progress.value = 0;
    errorMessage.value = '';
    currentStatus.value = '';
    emit('update:modelValue', false);
}

/**
 * 重试
 */
function handleRetry() {
    emit('retry');
    currentStatus.value = '';
    errorMessage.value = '';
    if (props.action && typeof props.action === 'function') {
        executeAction();
    }
    incrementProgress();
}

/**
 * 执行传入的 action 函数
 */
async function executeAction() {
    try {
        await props.action();
        currentStatus.value = 'success';
    } catch (error) {
        currentStatus.value = 'error';
        errorMessage.value = error instanceof Error ? error.message : String(error);
    }
}

watch(
    () => props.modelValue,
    newVal => {
        if (newVal) {
            if (props.action && typeof props.action === 'function') {
                executeAction();
            }
            incrementProgress();
        }
    },
    {
        immediate: true,
    }
);

watch(
    () => props.status,
    newVal => {
        currentStatus.value = newVal;
        if (!props.action || typeof props.action !== 'function') {
            incrementProgress();
        }
    },
    {
        deep: true,
    }
);

onUnmounted(() => {
    clearProgressTimer();
    clearDurationTimer();
});
</script>
