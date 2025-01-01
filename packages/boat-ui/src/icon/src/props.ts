import { makeStringProp } from '../../utils/makeProps';
import type { ExtractPropTypes } from 'vue';

/**
 * 定义 Icon 组件的 Props 类型
 */
export const iconProps = {
    /**
     * 图标名称
     */
    name: makeStringProp(''),
    /**
     * 图标颜色
     */
    color: makeStringProp(''),
    /**
     * 图标大小
     */
    size: makeStringProp(''),
};

/**
 * 提取 Icon 组件 Props 类型
 */
export type BoatIconProps = ExtractPropTypes<typeof iconProps>;
