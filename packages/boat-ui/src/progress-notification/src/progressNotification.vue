<template>
    <!-- <div :class="classes"> -->
    <boat-notification
        appendTo="boat-progress-notification"
        :title="title"
        :duration="0"
        :type="status"
        :class="classes"
    >
        <template>
            <div v-if="fileName" class="boat-progress-notification-filename">
                {{ fileName }}
            </div>

            <div class="boat-progress-notification-progress-bar">
                <div
                    class="boat-progress-notification-progress-inner"
                    :style="{ width: `${progress}%` }"
                />
            </div>
        </template>

        <template #footer>
            <div v-if="status === 'error'" class="boat-progress-notification-actions">
                <boat-button @click="handleCancel"> 取消导入 </boat-button>
                <boat-button type="primary" @click="handleRetry"> 重新导入 </boat-button>
            </div>
        </template>
    </boat-notification>
    <!-- </div> -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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
}>();

const classes = computed(() => {
    return {
        'boat-progress-notification': true,
        [`boat-progress-notification--${props.status}`]: props.status,
        [props.customClass]: props.customClass,
    };
});

const handleRetry = () => {
    emit('retry');
};

const handleCancel = () => {
    emit('cancel');
};
</script>
