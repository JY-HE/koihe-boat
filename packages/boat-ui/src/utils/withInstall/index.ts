import type { App, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export default <T>(comp: T) => {
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
};
