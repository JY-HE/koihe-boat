import type { ComponentResolver } from 'unplugin-vue-components/types';
import { kebabCase } from 'unplugin-vue-components';
import { getAllDependencies } from './styleDependencies';

/**
 * @description 是否服务端渲染
 */
const isSSR = Boolean(
    process.env.SSR || process.env.SSG || process.env.VITE_SSR || process.env.VITE_SSG
);

/**
 * @description 服务端渲染使用 cjs 模块，反之使用 esm 模块
 */
const moduleType = isSSR ? 'lib' : 'es';

/**
 * @description 解析器的参数配置
 */
export interface BoatUIResolverOptions {
    // 执行加载 css 还是 scss，默认加载 css
    importStyle?: boolean | 'css' | 'scss';
}

/**
 * @description 已导入的样式集合
 */
const importedStyles = new Set<string>();

/**
 * @description 获取副作用
 * @param dirName 目录名称
 * @param options.importStyle 是否加载样式，默认加载
 * @returns
 */
function getSideEffects(dirName: string, options: BoatUIResolverOptions): string | undefined {
    // 是否加载
    const { importStyle = true } = options;
    if (!importStyle || isSSR) return;

    // 获取到副作用的路径
    if (importStyle === 'scss') {
        return `@koihe/boat-ui/${moduleType}/${dirName}/style/scss`;
    }
    return `@koihe/boat-ui/${moduleType}/${dirName}/style/index`;
}

/**
 * @description 获取组件的样式依赖
 * @param componentName 组件名称
 * @returns 依赖的组件数组
 */
function getStyleDependencies(componentName: string): string[] {
    return getAllDependencies(componentName);
}

/**
 * @description 解析器, 应用于自动导入
 * @param options.importStyle 是否加载样式，默认加载
 * @returns
 */
export function BoatUIResolver(options: BoatUIResolverOptions = {}): ComponentResolver {
    return {
        type: 'component',
        resolve: (name: string) => {
            if (name.startsWith('Boat')) {
                // 获取到组件目录名称 BoatButton -> Button
                const partialName = name.slice(4);
                const componentName = kebabCase(partialName);

                // 收集所有需要导入的样式
                const sideEffects: string[] = [];

                // 先处理依赖组件的样式，确保依赖先导入
                const dependencies = getStyleDependencies(componentName);
                dependencies.forEach(dep => {
                    const depStyle = getSideEffects(dep, options);
                    if (depStyle && !importedStyles.has(depStyle)) {
                        sideEffects.push(depStyle);
                        importedStyles.add(depStyle);
                    }
                });

                // 再处理组件自身的样式
                const mainStyle = getSideEffects(componentName, options);
                if (mainStyle && !importedStyles.has(mainStyle)) {
                    sideEffects.push(mainStyle);
                    importedStyles.add(mainStyle);
                }

                return {
                    name: name,
                    from: `@koihe/boat-ui/${moduleType}`,
                    sideEffects: sideEffects.length ? sideEffects : undefined,
                };
            }
        },
    };
}
