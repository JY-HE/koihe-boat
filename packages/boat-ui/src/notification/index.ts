import { createVNode, render } from 'vue';
import { withInstall } from '../utils/withInstall';
import Notification from './src/notification.vue';
import type { BoatNotificationProps } from './src/props';

/**
 * BoatNotification 通知组件函数式调用
 * @param props 配置项
 */
const notify = (props: BoatNotificationProps) => {
    const container = document.createElement('div');
    const vNode = createVNode(Notification, {
        ...props,
        onClose: () => {
            render(null, container);
            container.remove();
        },
    });

    render(vNode, container);
    document.body.appendChild(container);
};

export const BoatNotification = withInstall(Notification);
export default Object.assign(BoatNotification, { notify });

export * from './src/props';
