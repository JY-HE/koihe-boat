import type { PropType, VNode } from 'vue';

/**
 * 生成 Boolean 类型的 props
 * @param defaultValue 布尔值的默认值，默认为 false
 * @returns 返回 Vue prop 的配置对象
 */
export function makeBooleanProp(defaultValue = false) {
    return {
        type: Boolean as PropType<boolean>,
        default: defaultValue,
    };
}

/**
 * 生成 String 类型的 props
 * @param defaultValue 字符串的默认值，默认为空字符串
 * @returns 返回 Vue prop 的配置对象
 */
export function makeStringProp(defaultValue = '') {
    return {
        type: String as PropType<string>,
        default: defaultValue,
    };
}

/**
 * 生成枚举类型的 props
 * @param values 枚举值的数组
 * @param defaultValue 枚举值的默认值
 * @returns 返回 Vue prop 的配置对象
 */
export function makeEnumProp<T>(values: T[], defaultValue: T) {
    return {
        type: String as unknown as PropType<T>,
        default: defaultValue,
        validator(value: T) {
            return values.includes(value);
        },
    };
}

/**
 * 生成 Number 类型的 props
 * @param defaultValue 数字的默认值，默认为 0
 * @returns 返回 Vue prop 的配置对象
 */
export function makeNumberProp(defaultValue = 0) {
    return {
        type: Number as PropType<number>,
        default: defaultValue,
    };
}

/**
 * 生成 Object 类型的 props
 * @param defaultValue 对象的默认值，默认为空对象
 * @returns 返回 Vue prop 的配置对象
 */
export function makeObjectProp<T>(defaultValue: T) {
    return {
        type: Object as PropType<T>,
        default: defaultValue,
    };
}

/**
 * 生成 String 或 Object 类型的 props
 * @param defaultValue 字符串或对象的默认值，默认为空字符串
 * @returns 返回 Vue prop 的配置对象
 */
export function makeStringOrObjectProp<T>(defaultValue: T) {
    return {
        type: [String, Object] as PropType<T>,
        default: defaultValue,
    };
}

/**
 * 生成 VNode 类型的 props
 * @param defaultValue VNode 的默认值，默认为空 VNode
 * @returns 返回 Vue prop 的配置对象
 */
export function makeVNodeProp(defaultValue: VNode) {
    return {
        type: Object as PropType<VNode>,
        default: defaultValue,
    };
}

/**
 * 生成 Function 类型的 props
 * @param defaultValue Function 的默认值，默认为空 Function
 * @returns 返回 Vue prop 的配置对象
 */
export function makeFunctionProp<T>(defaultValue: T) {
    return {
        type: Function as PropType<T>,
        default: defaultValue,
    };
}
