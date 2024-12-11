// import type { App, Plugin } from 'vue';
// export type SFCWithInstall<T> = T & Plugin;
// export default <T>(comp: T) => {
//     (comp as SFCWithInstall<T>).install = (app: App) => {
//         // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
//         // 所以要加上这个条件
//         const name = (comp as any).name || (comp as any).__name;
//         //注册组件
//         app.component(name, comp as SFCWithInstall<T>);
//     };
//     return comp as SFCWithInstall<T>;
// };

// import type { App, Plugin } from 'vue';

// export type SFCWithInstall<T> = T & Plugin;

// export default <T extends { name?: string; __name?: string }>(comp: T) => {
//     (comp as SFCWithInstall<T>).install = (app: App) => {
//         // 获取组件的名称，优先使用 name 属性，fallback 为 __name
//         const name = comp.name || comp.__name;
//         if (!name) {
//             console.warn(
//                 'The component is missing a "name" property or "__name". It cannot be registered.'
//             );
//             return;
//         }
//         // 注册组件
//         app.component(name, comp as SFCWithInstall<T>);
//     };
//     return comp as SFCWithInstall<T>;
// };

// import type { App, Plugin, DefineComponent } from 'vue';

// export type SFCWithInstall<T> = T & Plugin;

// export default <T extends DefineComponent>(comp: T) => {
//     (comp as SFCWithInstall<T>).install = (app: App) => {
//         // 获取组件的名称，优先使用 name 属性，fallback 为 __name
//         const name = comp.name || comp.__name;
//         if (!name) {
//             console.warn(
//                 'The component is missing a "name" property or "__name". It cannot be registered.'
//             );
//             return;
//         }
//         // 注册组件
//         app.component(name, comp as SFCWithInstall<T>);
//     };
//     return comp as SFCWithInstall<T>;
// };
import { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
    (main as SFCWithInstall<T>).install = (app: App) => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp);
        }
    };
    if (extra) {
        for (const [compName, comp] of Object.entries(extra)) {
            (main as Record<string, any>)[compName] = comp;
        }
    }
    // 将 T 断言为具体的类型 T & plugin & Record<string, any>
    return main as SFCWithInstall<T> & E;
};

export default withInstall;
