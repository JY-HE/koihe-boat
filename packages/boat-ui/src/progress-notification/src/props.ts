import {
    makeStringProp,
    makeNumberProp,
    makeEnumProp,
    makeObjectProp,
} from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义进度通知的状态类型
 */
export type ProgressNotificationStatus = 'processing' | 'success' | 'error';

/**
 * 定义 ProgressNotification 组件的 Props 类型
 */
export const boatProgressNotificationProps = {
    /**
     * 自定义类名
     */
    className: makeStringProp(''),
    /**
     * 自定义样式
     */
    style: makeObjectProp<Record<string, string>>({}),
    /**
     * 通知标题
     */
    title: makeStringProp(''),
    /**
     * 文件名
     */
    fileName: makeStringProp(''),
    /**
     * 进度值
     */
    progress: makeNumberProp(0),
    /**
     * 状态
     */
    status: makeEnumProp<ProgressNotificationStatus>(
        ['processing', 'success', 'error'],
        'processing'
    ),
};

/**
 * 提取 ProgressNotification 组件 Props 类型
 */
export type BoatProgressNotificationProps = ExtractPropTypes<typeof boatProgressNotificationProps>;
