/**
 * @description 组件样式依赖关系配置
 */
export const styleDependencies: Record<string, string[]> = {
    // 基础组件
    icon: [],
    button: [],

    // 依赖其他组件的组件
    notification: ['icon'],
    'progress-notification': ['notification', 'button'],
    'rotate-menu': ['icon'],
};

/**
 * @description 获取组件的所有样式依赖（包括递归依赖）
 * @param componentName 组件名称
 * @returns 所有依赖的数组
 */
export function getAllDependencies(componentName: string): string[] {
    const visited = new Set<string>();

    function collectDependencies(name: string) {
        if (visited.has(name)) return;

        visited.add(name);
        const deps = styleDependencies[name] || [];
        deps.forEach(dep => collectDependencies(dep));
    }

    collectDependencies(componentName);
    visited.delete(componentName); // 移除自身
    return Array.from(visited);
}
