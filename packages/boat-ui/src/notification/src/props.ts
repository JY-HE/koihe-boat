import {
    makeStringProp,
    makeNumberProp,
    makeEnumProp,
    makeBooleanProp,
    makeStringOrObjectProp,
} from '../../utils/makeProps';
import type { ExtractPropTypes, VNode, PropType } from 'vue';

/**
 * 定义通知类型
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | '';

/**
 * 定义通知位置
 */
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * 定义 Notification 组件的 Props 类型
 */
export const boatNotificationProps = {
    /**
     * 通知标题
     */
    title: makeStringProp(''),
    /**
     * 通知类型
     */
    type: makeEnumProp<NotificationType>(['success', 'error', 'warning', 'info', ''], ''),
    /**
     * 自定义类名
     */
    customClass: makeStringProp(''),
    /**
     * icon 自定义图标。若设置了 type，则 icon 会被覆盖
     */
    icon: makeStringProp(''),
    /**
     * icon 颜色
     */
    iconColor: makeStringProp(''),
    /**
     * 是否显示关闭按钮
     */
    showClose: makeBooleanProp(true),
    /**
     * 设置 notification 的根元素，默认为 document.body
     */
    appendTo: makeStringOrObjectProp<HTMLElement | string>('document.body'),
    /**
     * 显示时间, 单位为毫秒。值为 0 则不会自动关闭
     */
    duration: makeNumberProp(4000),
    /**
     * 自定义弹出位置
     */
    position: makeEnumProp<NotificationPosition>(
        ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
        'top-right'
    ),
    /**
     * 相对屏幕顶部/底部的距离
     */
    offset: makeNumberProp(16),
    /**
     * Notification 之间的间距
     */
    gap: makeNumberProp(16),
    /**
     * 通知栏正文内容
     */
    content: {
        type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>,
        default: '',
    },
};

/**
 * 提取 ProgressNotification 组件 Props 类型
 */
export type BoatNotificationProps = ExtractPropTypes<typeof boatNotificationProps>;
