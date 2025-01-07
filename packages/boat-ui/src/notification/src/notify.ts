import { createVNode, render, type VNode, type Ref } from 'vue';
import type { BoatNotificationProps } from './props';
import Notification from './notification.vue';

// 通知队列中的项
interface NotificationQueueItem {
    vm: VNode;
}

// 通知队列类型
type NotificationQueue = NotificationQueueItem[];

// 通知实例类型
export type NotificationInstance = {
    close: () => void;
};

// 通知函数类型
export type NotificationFn = {
    (options: Partial<BoatNotificationProps>): NotificationInstance;
    _context: null | any;
    closeAll: () => void;
};

// 按位置维护通知队列
const notifications: Record<string, NotificationQueue> = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
};

const GAP_SIZE = 16;
let seed = 1;

const notify: NotificationFn = (options: Partial<BoatNotificationProps>) => {
    const position = options.position || 'top-right';

    // 计算垂直偏移
    let verticalOffset = options.offset || 16;
    notifications[position].forEach(({ vm }) => {
        verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE;
    });
    verticalOffset += GAP_SIZE;

    // 生成唯一 id
    const id = `notification_${seed++}`;

    const container = document.createElement('div');
    const userOnClose = options.onClose;
    const userOnDestroy = options.onDestroy;

    const vNode = createVNode(Notification, {
        ...options,
        offset: verticalOffset,
        id,
        onClose: () => {
            close(id, position);
            userOnClose?.();
        },
        onDestroy: () => {
            render(null, container);
            container.remove();
            userOnDestroy?.();
        },
    });

    if (notify._context) {
        vNode.appContext = notify._context;
    }

    render(vNode, container);
    notifications[position].push({ vm: vNode });
    document.body.appendChild(container.firstElementChild!);

    return {
        close: () => {
            (vNode.component!.exposed as { visible: Ref<boolean> }).visible.value = false;
        },
    };
};

/**
 * 关闭指定通知并重新计算位置
 */
function close(id: string, position: string) {
    const orientedNotifications = notifications[position];
    const idx = orientedNotifications.findIndex(({ vm }) => vm.component?.props.id === id);
    if (idx === -1) return;

    const { vm } = orientedNotifications[idx];
    const removedHeight = vm.el!.offsetHeight;
    const verticalPos = position.split('-')[0];

    orientedNotifications.splice(idx, 1);

    // 重新计算后续通知的位置
    for (let i = idx; i < orientedNotifications.length; i++) {
        const { el, component } = orientedNotifications[i].vm;
        const pos = Number.parseInt(el!.style[verticalPos], 10) - removedHeight - GAP_SIZE;
        component!.props.offset = pos;
    }
}

/**
 * 关闭所有通知
 */
function closeAll() {
    Object.values(notifications).forEach(orientedNotifications => {
        orientedNotifications.forEach(({ vm }) => {
            (vm.component!.exposed as { visible: Ref<boolean> }).visible.value = false;
        });
    });
}

notify.closeAll = closeAll;
notify._context = null;

export default notify;
