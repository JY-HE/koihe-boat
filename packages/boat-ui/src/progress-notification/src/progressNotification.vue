<template>
    <div :class="classes" :style="style">
        <div class="boat-progress-notification-header">
            <span class="boat-progress-notification-title">{{ title }}</span>
        </div>

        <div v-if="fileName" class="boat-progress-notification-filename">
            {{ fileName }}
        </div>

        <div class="boat-progress-notification-progress-bar">
            <div
                class="boat-progress-notification-progress-inner"
                :style="{ width: `${progress}%` }"
            />
        </div>

        <div v-if="status === 'error'" class="boat-progress-notification-actions">
            <boat-button size="small" @click="handleCancel"> 取消 </boat-button>
            <boat-button type="primary" size="small" @click="handleRetry"> 重试 </boat-button>
        </div>

        <div v-if="status === 'success'" class="boat-progress-notification-success">完成</div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { BoatButton } from '../../button';
import { boatProgressNotificationProps } from './props';

defineOptions({
    name: 'BoatProgressNotification',
});

const props = defineProps(boatProgressNotificationProps);

const emit = defineEmits<{
    (e: 'retry'): void;
    (e: 'cancel'): void;
}>();

const classes = computed(() => {
    return {
        'boat-progress-notification': true,
        [`boat-progress-notification-${props.status}`]: props.status,
        [props.className]: props.className,
    };
});

const handleRetry = () => {
    emit('retry');
};

const handleCancel = () => {
    emit('cancel');
};
</script>
