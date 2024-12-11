import { withInstall } from '../../utils';
import Button from './button.vue';

import type { ExtractPropTypes } from 'vue';

// 导出 props 类型
export const boatButtonProps = {
    type: {
        type: String,
        default: 'default',
        validator: (value: string) => {
            return (
                ['default', 'success', 'primary', 'danger', 'warning', 'info', 'text'].indexOf(
                    value
                ) !== -1
            );
        },
    },
    plain: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    circle: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    mimicry: {
        type: Boolean,
        default: false,
    },
};

// 提取 Button 组件的 props 类型
export type ButtonProps = ExtractPropTypes<typeof boatButtonProps>;

// 使用 withInstall 包装 Button 组件
const BoatButton = withInstall(Button);

// 在这里明确声明 BoatButton 的类型，确保它具备正确的类型
// export { BoatButton };
export default BoatButton;
