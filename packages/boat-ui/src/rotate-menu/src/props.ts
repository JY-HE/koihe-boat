import { makeBooleanProp, makeArrayProp } from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义 RotateMenu 组件的 Props 类型
 */
export const rotateMenuProps = {
    /**
     * 菜单是否默认展开
     */
    expend: makeBooleanProp(false),
    /**
     * 按钮文本数组
     */
    menus: makeArrayProp<string>(),
};

/**
 * 提取 RotateMenu 组件 Props 类型
 */
export type BoatRotateMenuProps = ExtractPropTypes<typeof rotateMenuProps>;
