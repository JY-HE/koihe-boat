import { COMPILER_PACKAGE } from './paths';

export const target = 'esnext';

/**
 * @description 获取组件库的 package.json 信息
 * @returns {Object} 例子:{ version: 'x.x.x', dependencies: [], peerDependencies: [] }
 */
export const getCompPackage = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version, dependencies = {}, peerDependencies = {} } = require(COMPILER_PACKAGE);
    return {
        version,
        dependencies: Object.keys(dependencies),
        peerDependencies: Object.keys(peerDependencies),
    };
};

/**
 * @description 生成 external 函数
 * @param {Object} options
 * @param {boolean} options.full - 是否将 dependencies 也包含在 external 中
 * @returns {(id: string) => boolean} - external 函数
 */
export const generateExternal = (options: { full: boolean }) => {
    const { dependencies, peerDependencies } = getCompPackage();

    const packages: string[] = peerDependencies;

    if (options.full) {
        packages.push(...dependencies);
    }

    return (id: string) => {
        return packages.some(pkg => id === pkg || (options.full && id.startsWith(`${pkg}/`)));
    };
};

/**
 * @description 生成路径映射函数
 * @returns {(id: string) => string} - 返回一个函数，该函数将输入模块 ID 替换为对应的路径。
 * 如果模块 ID 匹配路径映射表中的一个旧路径，则返回替换后的新路径，否则返回空字符串。
 */
export const generatePaths = () => {
    const paths = [['lodash-es', 'lodash']];

    return (id: string) => {
        for (const [oldPath, newPath] of paths) {
            if (id.startsWith(oldPath)) {
                return id.replace(oldPath, newPath);
            }
        }

        return '';
    };
};
