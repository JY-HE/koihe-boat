import type { DirectiveBinding } from 'vue';

interface DraggableOptions {
    /**
     * 触发拖拽的元素选择器（必须是指令元素的子元素）
     */
    triggerSelector?: string;
    /**
     * 触发拖拽的最小移动距离（默认5px）
     */
    dragThreshold?: number;
    /**
     * 拖拽开始事件。
     */
    onDragStart?: (event: MouseEvent) => void;
    /**
     * 拖拽中开始事件。
     */
    onDrag?: (event: MouseEvent) => void;
    /**
     * 拖拽结束事件。
     */
    onDragEnd?: (event: MouseEvent) => void;
}

/**
 * 获取有效的触发元素
 * @param context - 上下文元素
 * @param selector - 选择器字符串，可选
 * @returns {HTMLElement | null} 返回匹配的触发元素，如果未找到则返回 null
 */
const getTriggerElement = (context: HTMLElement, selector?: string): HTMLElement | null => {
    if (!selector) return context;

    const target = context.querySelector(selector);
    if (!(target instanceof HTMLElement)) {
        console.warn(`v-draggable: trigger selector "${selector}" not found`);
        return null;
    }
    return target;
};

/**
 * 解析当前 transform 的 translate 值
 * @param context - 上下文元素
 * @returns 返回一个包含 x 和 y 坐标的对象
 */
const parseTranslate = (context: HTMLElement): { x: number; y: number } => {
    const match = context.style.transform.match(/translate(3d)?\(([-\d.]+)px,\s*([-\d.]+)px/);
    return match ? { x: +match[2], y: +match[3] } : { x: 0, y: 0 };
};

/**
 * 获取元素原始布局位置和尺寸
 * @param context - 上下文元素
 * @returns 返回一个包含元素原始布局位置和尺寸的对象
 */
const getElementGeometry = (context: HTMLElement) => {
    const rect = context.getBoundingClientRect();
    const translate = parseTranslate(context);
    return {
        baseX: rect.left - translate.x, // 元素未应用 transform 时的原始 left
        baseY: rect.top - translate.y, // 元素未应用 transform 时的原始 top
        width: context.offsetWidth,
        height: context.offsetHeight,
    };
};

/**
 * 计算可拖拽边界
 * @param context - 上下文元素
 * @returns 返回一个包含可拖拽边界的对象
 */
const getDragBoundaries = (context: HTMLElement) => {
    const { baseX, baseY, width, height } = getElementGeometry(context);
    return {
        minX: -baseX,
        maxX: window.innerWidth - baseX - width,
        minY: -baseY,
        maxY: window.innerHeight - baseY - height,
    };
};

/**
 * 数值范围限制
 * @param value - 需要限制的数值
 * @param min - 最小值
 * @param max - 最大值
 * @returns {number} 返回限制后的数值
 */
const clamp = (value: number, min: number, max: number): number =>
    Math.max(min, Math.min(value, max));

/**
 * 拖拽指令。用于使元素可以拖拽
 */
export const vDraggable = {
    mounted(el: HTMLElement, binding: DirectiveBinding<DraggableOptions>) {
        let isDragging = false;
        let startPosition = { x: 0, y: 0 }; // 拖拽起始坐标（包含元素当前位置）
        let currentTranslate = { x: 0, y: 0 }; // 当前偏移量
        let blockClickHandler: ((e: Event) => void) | null = null;

        const threshold = binding.value?.dragThreshold || 5;
        const options = binding.value || {};

        const triggerElement = getTriggerElement(el, options.triggerSelector);
        if (!triggerElement) return;

        const initialCursor = getComputedStyle(triggerElement).cursor;

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            currentTranslate = parseTranslate(el);
            startPosition = {
                x: event.clientX - currentTranslate.x,
                y: event.clientY - currentTranslate.y,
            };

            window.addEventListener('mousemove', handleMouseMove, { passive: false });
            window.addEventListener('mouseup', handleMouseUp, { passive: false });
        };

        const handleMouseMove = (event: MouseEvent) => {
            event.preventDefault();

            const deltaX = Math.abs(event.clientX - startPosition.x - currentTranslate.x);
            const deltaY = Math.abs(event.clientY - startPosition.y - currentTranslate.y);

            if (!isDragging && (deltaX > threshold || deltaY > threshold)) {
                isDragging = true;
                if (blockClickHandler) {
                    el.removeEventListener('click', blockClickHandler, true);
                    blockClickHandler = null;
                }
                binding.value?.onDragStart?.(event);
            }

            if (isDragging) {
                triggerElement.style.cursor = 'move';

                const boundaries = getDragBoundaries(el);
                currentTranslate = {
                    x: clamp(event.clientX - startPosition.x, boundaries.minX, boundaries.maxX),
                    y: clamp(event.clientY - startPosition.y, boundaries.minY, boundaries.maxY),
                };

                el.style.transform = `translate(${currentTranslate.x}px, ${currentTranslate.y}px)`;
                binding.value?.onDrag?.(event);
            }
        };

        const handleMouseUp = (event: MouseEvent) => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            if (isDragging) {
                triggerElement.style.cursor = initialCursor;

                blockClickHandler = (event: Event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    el.removeEventListener('click', blockClickHandler!, true);
                    blockClickHandler = null;
                };
                el.addEventListener('click', blockClickHandler, true);

                options.onDragEnd?.(event);
            }
            isDragging = false;
        };

        triggerElement.addEventListener('mousedown', handleMouseDown);
    },
};
