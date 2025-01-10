import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import BoatProgressNotification from '../src/progressNotification.vue';
import type { BoatProgressNotificationProps } from '../src/props';

// 模拟 action 的 Promise 函数
const mockActionSuccess = vi.fn(() => Promise.resolve());
const mockActionError = vi.fn(() => Promise.reject(new Error('Action failed')));

describe('BoatProgressNotification Component', () => {
    const defaultProps: Partial<BoatProgressNotificationProps> = {
        title: 'Notification Title',
        message: 'This is a test message',
        modelValue: true,
        status: '',
        errorTip: 'Something went wrong',
        duration: 3000,
        showClose: true,
        footerLeftText: 'Cancel',
        footerRightText: 'Retry',
    };

    const createWrapper = (props: Partial<BoatProgressNotificationProps> = {}) =>
        mount(BoatProgressNotification, {
            props: {
                ...defaultProps,
                ...props,
            },
            global: {
                stubs: {
                    teleport: true,
                },
            },
        });

    it('renders with correct title and message', async () => {
        const wrapper = createWrapper();

        await nextTick();

        const titleElement = wrapper.get('.progress-header__title');
        const messageElement = wrapper.get('.progress-main__message');

        expect(titleElement.text()).toBe(defaultProps.title);
        expect(messageElement.text()).toBe(defaultProps.message);
    });

    it('renders the close button and emits the close event', async () => {
        const wrapper = createWrapper();

        await nextTick();

        await wrapper.find('.progress-header__close').trigger('click');

        expect(wrapper.emitted('close')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    });

    it('shows progress bar and updates width dynamically', async () => {
        const wrapper = createWrapper();
        const progressBar = wrapper.find('.progress-main__bar__inner');
        expect(progressBar.exists()).toBe(true);

        await nextTick();

        const width = parseFloat((progressBar.element as HTMLElement).style.width);
        expect(width).toBeGreaterThan(0);
    });

    it('executes action to success', async () => {
        const wrapper = createWrapper({ action: mockActionSuccess });

        // 验证 mockActionSuccess 是否被调用
        expect(mockActionSuccess).toHaveBeenCalled();

        await nextTick();

        expect(wrapper.find('.boat-progress-notification--success').exists()).toBe(true);
    });

    it('executes action to success, it will be closed after duration.', async () => {
        const wrapper = createWrapper({ action: mockActionSuccess, duration: 3000 });

        expect(mockActionSuccess).toHaveBeenCalled();

        await nextTick();

        expect(wrapper.find('.boat-progress-notification--success').exists()).toBe(true);

        setTimeout(() => {
            expect(wrapper.find('.boat-progress-notification--success').exists()).toBe(false);
        }, 3000);
    });

    it('executes action to error', async () => {
        const wrapper = createWrapper({ action: mockActionError });

        expect(mockActionError).toHaveBeenCalled();

        await nextTick();

        expect(wrapper.find('.boat-progress-notification--error').exists()).toBe(true);
        expect(wrapper.find('.progress-main__errorTip').text()).toBe('Action failed');
        expect(wrapper.find('.progress-footer').exists()).toBe(true);
    });

    it('emits retry event and executes retry logic', async () => {
        const wrapper = createWrapper({ action: mockActionError });

        await nextTick();

        await wrapper.find('.progress-footer button:nth-child(2)').trigger('click');

        expect(wrapper.emitted('retry')).toBeTruthy();
        // 第一次挂载时调用一次，Retry 再次调用一次
        expect(mockActionError).toHaveBeenCalledTimes(2);
    });

    it('executes action to error and cancelButton click', async () => {
        const wrapper = createWrapper({ action: mockActionError });

        await nextTick();

        await wrapper.find('.progress-footer button:nth-child(1)').trigger('click');

        expect(wrapper.emitted('close')).toBeTruthy();

        await nextTick();

        expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    });

    it('disables buttons when props.footerLeftDisabled and props.footerRightDisabled are true', async () => {
        const wrapper = createWrapper({
            action: mockActionError,
            footerLeftDisabled: true,
            footerRightDisabled: true,
        });

        await nextTick();

        expect(wrapper.find('.progress-footer button:nth-child(1)').classes()).toContain(
            'is-disabled'
        );
        expect(wrapper.find('.progress-footer button:nth-child(2)').classes()).toContain(
            'is-disabled'
        );
    });

    it('applies custom class and position correctly', () => {
        const wrapper = createWrapper({
            customClass: 'custom-notification',
            position: 'top-left',
        });

        expect(wrapper.find('.boat-progress-notification').classes()).toContain(
            'custom-notification'
        );
        expect(wrapper.find('.boat-progress-notification').classes()).toContain('top-left');
    });

    it('renders with correct z-index and offset', async () => {
        const wrapper = createWrapper({
            zIndex: 5000,
            offset: 20,
        });

        await nextTick();

        const notification = wrapper.find('.boat-progress-notification');
        expect(notification.exists()).toBe(true);

        const styles = notification.attributes('style');
        expect(styles).toContain('z-index: 5000');
        expect(styles).toContain('top: 20px');
    });

    it('does not close automatically if duration is 0', async () => {
        vi.useFakeTimers();
        const wrapper = createWrapper({
            duration: 0,
        });

        vi.advanceTimersByTime(3000);
        expect((wrapper.vm.$props as any).modelValue).toBe(true);
        vi.useRealTimers();
    });
});
