import type { App } from 'vue';
import { BoatIcon } from './icon';
import { BoatButton } from './button';
import { BoatNotification } from './notification';
import { BoatProgressNotification } from './progress-notification';
import { BoatRotateMenu } from './rotate-menu';

// 定义需要注册的组件数组
const components = [
    BoatIcon,
    BoatButton,
    BoatNotification,
    BoatProgressNotification,
    BoatRotateMenu,
];

/**
 * 提供 install 方法用于批量注册组件
 * @param app Vue 应用实例
 */
export function install(app: App) {
    // 遍历组件数组，注册每个组件
    components.forEach(item => {
        // 判断组件是否提供了 install 方法
        if (item.install!) {
            // 如果组件提供了 install 方法，使用 app.use() 注册
            app.use(item);
        } else if (item.name) {
            // 如果组件只提供了 name 属性，使用 app.component() 注册
            app.component(item.name, item);
        }
    });
}

// 导出默认对象，包含 install 方法
// 这样可以支持 app.use(BoatUI) 的使用方式
export default {
    install,
};

// 导出组件目录下的所有内容，使外部可以直接访问
export * from './icon';
export * from './button';
export * from './notification';
export * from './progress-notification';
export * from './rotate-menu';

// 导出组件样式依赖关系
export * from './styleDependencies';
