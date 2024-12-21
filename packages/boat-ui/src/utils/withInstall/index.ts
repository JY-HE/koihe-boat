import type { App, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

/**
 * 高阶函数：为组件添加 install 方法，以便在 Vue 中注册该组件
 *
 * 这个函数将会为传入的组件添加一个 `install` 方法，`install` 方法是 Vue 组件的标准注册方法
 * ，它允许将组件全局注册到 Vue 应用中。`install` 方法首先检查组件是否有 `name` 或 `__name` 属性，
 * 如果没有，将会在控制台输出警告。
 *
 * @param comp - 需要添加 install 方法的 Vue 组件
 * @returns 返回具有 install 方法的组件类型，便于全局注册
 */
export function withInstall<T>(comp: T): SFCWithInstall<T> {
    (comp as SFCWithInstall<T>).install = (app: App) => {
        const name = (comp as any).name || (comp as any).__name;
        if (!name) {
            console.warn(
                'The component is missing a "name" property or "__name". It cannot be registered.'
            );
            return;
        }
        app.component(name, comp as SFCWithInstall<T>);
    };
    return comp as SFCWithInstall<T>;
}
