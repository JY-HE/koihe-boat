import { withInstall } from '../utils/withInstall';
import { createVNode, render } from 'vue';
import _Notification from './src/notification.vue';
import type { BoatNotificationProps } from './src/props';

/**
 * 通知组件实例类型
 */
export type NotificationInstance = InstanceType<typeof BoatNotification> & {
    close: () => void;
};

/**
 * 通知组件构造器类型
 */
export interface NotificationConstructor {
    new (...args: any[]): any;
    notify: (options: Partial<BoatNotificationProps>) => NotificationInstance;
}

/**
 * 创建通知实例
 * @param options 通知配置项
 * @returns 通知实例
 */
function notify(options: Partial<BoatNotificationProps>): NotificationInstance {
    const container = document.createElement('div');

    const vNode = createVNode(_Notification, {
        ...options,
        onClose: () => {
            render(null, container);
        },
    });

    render(vNode, container);

    const vm = vNode.component!;
    const notification: NotificationInstance = {
        close: () => {
            (vm.exposed as { close: () => void })?.close();
        },
    };

    return notification;
}

// 转换组件类型并添加静态方法
const Notification = _Notification as unknown as NotificationConstructor;
export const BoatNotification = withInstall(Notification);
BoatNotification.notify = notify;

export * from './src/props';
export default BoatNotification;
