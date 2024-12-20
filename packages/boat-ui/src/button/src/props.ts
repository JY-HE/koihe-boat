import type { PropType, ExtractPropTypes } from 'vue';

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
    type: {
        type: String as PropType<ButtonType>,
        default: 'default',
        validator: (value: ButtonType) => {
            return ['default', 'primary', 'success', 'danger', 'warning', 'info', 'text'].includes(
                value
            );
        },
    },
    /**
     * 是否为朴素按钮
     */
    plain: {
        type: Boolean,
        default: false,
    },
    /**
     * 是否为圆角按钮
     */
    round: {
        type: Boolean,
        default: false,
    },
    /**
     * 是否为圆形按钮
     */
    circle: {
        type: Boolean,
        default: false,
    },
    /**
     * 按钮图标
     */
    icon: {
        type: String,
        default: '',
    },
    /**
     * 是否禁用按钮
     */
    disabled: {
        type: Boolean,
        default: false,
    },
    /**
     * 是否为拟态按钮
     */
    mimicry: {
        type: Boolean,
        default: false,
    },
};

/**
 * 提取 Button 组件 Props 类型
 */
export type BoatButtonProps = ExtractPropTypes<typeof boatButtonProps>;
