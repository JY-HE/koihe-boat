import { makeBooleanProp, makeEnumProp, makeStringProp } from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义按钮的类型选项
 */
export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'text';

/**
 * 定义 Button 组件的 Props 类型
 */
export const boatButtonProps = {
    /**
     * 按钮类型
     */
    type: makeEnumProp<ButtonType>(
        ['default', 'primary', 'success', 'danger', 'warning', 'info', 'text'],
        'default'
    ),
    /**
     * 是否为朴素按钮
     */
    plain: makeBooleanProp(false),
    /**
     * 是否为圆角按钮
     */
    round: makeBooleanProp(false),
    /**
     * 是否为圆形按钮
     */
    circle: makeBooleanProp(false),
    /**
     * 是否禁用按钮
     */
    disabled: makeBooleanProp(false),
    /**
     * 是否为拟态按钮
     */
    mimicry: makeBooleanProp(false),
};

/**
 * 提取 Button 组件 Props 类型
 */
export type BoatButtonProps = ExtractPropTypes<typeof boatButtonProps>;
