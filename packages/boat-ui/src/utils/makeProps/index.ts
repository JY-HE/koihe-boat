import type { PropType } from 'vue';

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
