import { makeStringProp, makeUnionProp, makeNumberProp } from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义 RotateMenu 组件的 Props 类型
 */
export const rotateMenuProps = {
    /**
     * 自定义类名
     */
    customClass: makeStringProp(''),
    /**
     * 菜单数组，支持传 boat-icon 图标名称字符串数组，或者自定义数据数组对象
     */
    menus: makeUnionProp<string[] | object[]>([Array], []),
    /**
     * 半径，默认为 110
     */
    radius: makeNumberProp(110),
    /**
     * z-index，默认为 9999
     */
    zIndex: makeNumberProp(9999),
    /**
     * 挂载到指定元素上，默认为 body 元素
     */
    appendTo: makeUnionProp<string | HTMLElement>([String, Object], 'body'),
};

/**
 * 提取 RotateMenu 组件 Props 类型
 */
export type BoatRotateMenuProps = ExtractPropTypes<typeof rotateMenuProps>;
