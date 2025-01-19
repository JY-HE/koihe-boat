import { makeBooleanProp, makeArrayProp, makeNumberProp } from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义 RotateMenu 组件的 Props 类型
 */
export const rotateMenuProps = {
    /**
     * 按钮文本数组
     */
    menus: makeArrayProp<string>(),
    /**
     * 半径，默认为 110
     */
    radius: makeNumberProp(110),
    /**
     * z-index，默认为 9999
     */
    zIndex: makeNumberProp(9999),
};

/**
 * 提取 RotateMenu 组件 Props 类型
 */
export type BoatRotateMenuProps = ExtractPropTypes<typeof rotateMenuProps>;
