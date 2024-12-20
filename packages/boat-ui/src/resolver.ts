import type { ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components/types';
import { kebabCase } from 'unplugin-vue-components';

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
 * @description 获取到副作用
 * @param dirName 目录名称
 * @param options 配置
 * @returns
 */
function getSideEffects(
    dirName: string,
    options: BoatUIResolverOptions
): SideEffectsInfo | undefined {
    // 是否加载
    const { importStyle = true } = options;
    if (!importStyle || isSSR) return;

    // 获取到副作用的路径
    if (importStyle === 'scss') {
        return `@koihe/boat-ui/${moduleType}/${dirName}/style/scss`;
    } else {
        return `@koihe/boat-ui/${moduleType}/${dirName}/style/index`;
    }
}

/**
 * 解析器, 应用于自动导入
 * @param options 解析器的参数配置
 * @returns
 */
export function BoatUIResolver(options: BoatUIResolverOptions = {}): ComponentResolver {
    return {
        type: 'component', // 组件类型
        resolve: (name: string) => {
            // 判断解析的组件名称是不是当前组件库的
            if (name.startsWith('Boat')) {
                // 获取到组件目录名称 BoatButton -> Button
                const partialName = name.slice(4);
                return {
                    // 组件名称
                    name: name,
                    // 从哪个路径导入，es/lib
                    from: `@koihe/boat-ui/${moduleType}`,
                    // 根据组件名称获取到对应的 css 导入路径。BoatButton => es/button/style/index
                    sideEffects: getSideEffects(kebabCase(partialName), options),
                };
            }
        },
    };
}
