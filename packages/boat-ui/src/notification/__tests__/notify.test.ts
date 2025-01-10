import { describe, it, expect, vi, afterEach } from 'vitest';
import notify from '../src/notify';
import { nextTick } from 'vue';

describe('notify function', () => {
    afterEach(() => {
        notify.closeAll();
        document.body.innerHTML = '';
    });

    it('creates a notification with correct props', async () => {
        const onClose = vi.fn();
        const notification = notify({
            title: 'Test Notification',
            content: 'This is a test notification',
            type: 'success',
            position: 'top-right',
            duration: 1000,
            onClose,
        });

        await nextTick();

        const notificationElement = document.querySelector('.boat-notification');
        expect(notificationElement).toBeTruthy();
        expect(notificationElement?.classList).toContain('boat-notification--success');
        expect(notificationElement?.classList).toContain('top-right');
        expect(notificationElement?.textContent).toContain('This is a test notification');

        // Simulate close
        notification.close();
        await nextTick();
        expect(onClose).toHaveBeenCalled();
    });

    it('auto closes after duration', async () => {
        vi.useFakeTimers();
        const onClose = vi.fn();
        notify({
            title: 'Auto Close Notification',
            content: 'This notification will auto close',
            duration: 1000,
            onClose,
        });

        vi.advanceTimersByTime(1000);
        await nextTick();
        expect(onClose).toHaveBeenCalled();
        vi.useRealTimers();
    });

    it('supports multiple notifications', async () => {
        notify({
            title: 'First Notification',
            content: 'This is the first notification',
            position: 'top-right',
        });

        notify({
            title: 'Second Notification',
            content: 'This is the second notification',
            position: 'top-right',
        });

        await nextTick();

        const notifications = document.querySelectorAll('.boat-notification');
        expect(notifications.length).toBe(2);
        expect(notifications[0].textContent).toContain('This is the first notification');
        expect(notifications[1].textContent).toContain('This is the second notification');
    });

    it('closes all notifications', async () => {
        notify({
            title: 'Notification 1',
            content: 'This is notification 1',
            position: 'top-right',
        });

        notify({
            title: 'Notification 2',
            content: 'This is notification 2',
            position: 'top-right',
        });

        await nextTick();

        notify.closeAll();

        setTimeout(async () => {
            await nextTick();
            const notifications = document.querySelectorAll('.boat-notification');
            expect(notifications.length).toBe(0);
        }, 0);
    });
});
