<template>
    <boat-notification
        ref="notificationRef"
        :title="title"
        :duration="0"
        :type="status"
        :class="classes"
        :icon="status || 'info'"
        @close="close"
    >
        <div v-if="message" class="progress-notification--message">
            {{ message }}
        </div>
        <div class="progress-notification--bar">
            <div class="progress-notification--bar__inner" :style="{ width: `${progress}%` }" />
        </div>
        <template #footer>
            <div v-if="status === 'error'" class="progress-notification--operations">
                <boat-button @click="cancel" :disabled="footerLeftDisabled">
                    {{ footerLeftText }}
                </boat-button>
                <boat-button type="error" @click="handleRetry" :disabled="footerRightDisabled">
                    {{ footerRightText }}
                </boat-button>
            </div>
        </template>
    </boat-notification>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import { BoatNotification } from '../../notification';
import { BoatButton } from '../../button';
import { boatProgressNotificationProps } from './props';

defineOptions({
    name: 'BoatProgressNotification',
});

const props = defineProps(boatProgressNotificationProps);

const emit = defineEmits<{
    (e: 'retry'): void;
    (e: 'cancel'): void;
    (e: 'close'): void;
}>();

const notificationRef = ref<InstanceType<typeof BoatNotification> | null>(null);

const close = () => {
    clearProgressTimer();
    clearDurationTimer();

    if (notificationRef.value) {
        emit('close');
        notificationRef.value.close();
    }
};

const handleRetry = () => {
    emit('retry');
};

const cancel = () => {
    clearProgressTimer();
    clearDurationTimer();
    emit('cancel');
    if (notificationRef.value) {
        notificationRef.value.close();
    }
};

const classes = computed(() => {
    return {
        'boat-progress-notification': true,
        [`boat-progress-notification--${props.status}`]: props.status,
        [props.customClass]: props.customClass,
    };
});

const progress = ref(0);
const progressTimer = ref<ReturnType<typeof setTimeout> | null>(null);
function clearProgressTimer() {
    if (progressTimer.value) {
        clearTimeout(progressTimer.value);
        progressTimer.value = null;
    }
}
function incrementProgress() {
    clearProgressTimer();
    if (progress.value < 90) {
        progress.value += (90 - progress.value) * 0.1;
        progressTimer.value = setTimeout(incrementProgress, 500);
    }
}
const durationTimer = ref<ReturnType<typeof setTimeout> | null>(null);
function clearDurationTimer() {
    if (durationTimer.value) {
        clearTimeout(durationTimer.value);
        durationTimer.value = null;
    }
}
watch(
    () => props.status,
    newVal => {
        clearProgressTimer();
        clearDurationTimer();

        if (newVal === 'success') {
            progress.value = 100;
            if (props.duration > 0 && notificationRef.value) {
                durationTimer.value = setTimeout(() => {
                    close();
                }, props.duration);
            }
        } else if (newVal === 'error') {
            progress.value = 10;
        } else if (!newVal) {
            progress.value = 0;
            incrementProgress();
        }
    },
    {
        immediate: true,
    }
);

onUnmounted(() => {
    clearProgressTimer();
    clearDurationTimer();
});

defineExpose({
    close,
});
</script>
