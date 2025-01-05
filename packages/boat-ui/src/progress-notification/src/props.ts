import {
    makeStringProp,
    makeBooleanProp,
    makeEnumProp,
    makeNumberProp,
} from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义进度通知的状态类型
 */
export type ProgressNotificationStatus = 'success' | 'error' | '';

/**
 * 定义 ProgressNotification 组件的 Props 类型
 */
export const boatProgressNotificationProps = {
    /**
     * 自定义类名
     */
    customClass: makeStringProp(''),
    /**
     * 标题
     */
    title: makeStringProp(''),
    /**
     * 消息内容
     */
    message: makeStringProp(''),
    /**
     * 状态
     */
    status: makeEnumProp<ProgressNotificationStatus>(['success', 'error', ''], ''),
    /**
     * 状态为 success 时自动关闭时间，单位: 毫秒。为 0 时不自动关闭
     */
    duration: makeNumberProp(3000),
    /**
     * 底部左侧按钮文本
     */
    footerLeftText: makeStringProp('Cancel'),
    /**
     * 底部右侧按钮文本
     */
    footerRightText: makeStringProp('Retry'),
    /**
     * 底部左侧按钮是否禁用
     */
    footerLeftDisabled: makeBooleanProp(false),
    /**
     * 底部右侧按钮是否禁用
     */
    footerRightDisabled: makeBooleanProp(false),
};

/**
 * 提取 ProgressNotification 组件 Props 类型
 */
export type BoatProgressNotificationProps = ExtractPropTypes<typeof boatProgressNotificationProps>;
