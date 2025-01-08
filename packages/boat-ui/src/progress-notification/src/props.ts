import {
    makeStringProp,
    makeBooleanProp,
    makeEnumProp,
    makeNumberProp,
    makeFunctionProp,
    makeUnionProp,
} from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义进度通知的状态类型
 */
export type ProgressNotificationStatus = 'success' | 'error' | '';

/**
 * 定义通知位置
 */
export type ProgressNotificationPosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';

/**
 * 定义 ProgressNotification 组件的 Props 类型
 */
export const boatProgressNotificationProps = {
    /**
     * 进度通知是否可见
     */
    modelValue: makeBooleanProp(false),
    /**
     * 标题
     */
    title: makeStringProp(''),
    /**
     * 消息内容
     */
    message: makeStringProp(''),
    /**
     * 自定义类名
     */
    customClass: makeStringProp(''),
    /**
     * 状态
     */
    status: makeEnumProp<ProgressNotificationStatus>(['success', 'error', ''], ''),
    /**
     * 当 status 为 error 时显示错误信息
     */
    errorTip: makeStringProp(''),
    /**
     * 状态为 success 时自动关闭时间，单位: 毫秒。为 0 时不自动关闭
     */
    duration: makeNumberProp(3000),
    /**
     * 是否显示关闭按钮
     */
    showClose: makeBooleanProp(true),
    /**
     * 设置通知的 z-index
     */
    zIndex: makeNumberProp(9999),
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
    /**
     * 执行函数
     */
    action: makeFunctionProp<() => Promise<any> | null>(),
    /**
     * 挂载到指定元素上，默认为 body 元素
     */
    appendTo: makeUnionProp<string | HTMLElement>([String, Object], 'body'),
    /**
     * 自定义弹出位置
     */
    position: makeEnumProp<ProgressNotificationPosition>(
        ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
        'top-right'
    ),
    /**
     * 相对屏幕顶部/底部的距离
     */
    offset: makeNumberProp(16),
};

/**
 * 提取 ProgressNotification 组件 Props 类型
 */
export type BoatProgressNotificationProps = ExtractPropTypes<typeof boatProgressNotificationProps>;
