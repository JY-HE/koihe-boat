import { makeBooleanProp, makeEnumProp } from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义按钮的类型选项
 */
export type ButtonType = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info' | 'link';

/**
 * 定义 Button 组件的 Props 类型
 */
export const boatButtonProps = {
    /**
     * 按钮类型
     */
    type: makeEnumProp<ButtonType>(
        ['default', 'primary', 'success', 'error', 'warning', 'info', 'link'],
        'default'
    ),
    /**
     * 是否禁用按钮
     */
    disabled: makeBooleanProp(false),
};

/**
 * 提取 Button 组件 Props 类型
 */
export type BoatButtonProps = ExtractPropTypes<typeof boatButtonProps>;
