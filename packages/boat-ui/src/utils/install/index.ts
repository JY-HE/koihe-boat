import type { App, Directive } from 'vue';
import type { SFCWithInstall, SFCInstallWithContext } from './typescript';

// 空函数
export const NOOP = () => {};

/**
 * 为组件添加 install 方法
 * @param main 组件
 * @param extra 额外的组件
 */
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
    (main as SFCWithInstall<T>).install = (app: App): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp);
        }
    };

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (main as any)[key] = comp;
        }
    }
    return main as SFCWithInstall<T> & E;
};

/**
 * 为函数式组件添加 install 方法
 * @param fn 函数式组件
 * @param name 全局调用名字
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
    (fn as SFCWithInstall<T>).install = (app: App) => {
        (fn as SFCInstallWithContext<T>)._context = app._context;
        app.config.globalProperties[name] = fn;
    };

    return fn as SFCInstallWithContext<T>;
};

/**
 * 为指令添加 install 方法
 * @param directive 指令
 * @param name 指令名
 */
export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
    (directive as SFCWithInstall<T>).install = (app: App): void => {
        app.directive(name, directive);
    };

    return directive as SFCWithInstall<T>;
};
/**
 * 添加空的 install 方法
 * @param component 组件
 */
export const withNoopInstall = <T>(component: T) => {
    (component as SFCWithInstall<T>).install = NOOP;

    return component as SFCWithInstall<T>;
};
