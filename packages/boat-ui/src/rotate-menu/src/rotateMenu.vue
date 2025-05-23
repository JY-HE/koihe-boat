<template>
    <teleport :to="appendTo">
        <div
            :class="classes"
            :style="{ zIndex: props.zIndex }"
            v-draggable="{
                triggerSelector: '.menu-toggler',
            }"
        >
            <div class="menu-toggler" @click="isExpanded = !isExpanded">
                <div class="toggler-content">
                    <div class="toggler-content__line"></div>
                </div>
            </div>
            <ul>
                <li
                    class="menu-item"
                    v-for="(menu, index) in menus"
                    :key="index"
                    :id="`menu-item__${index}`"
                    @click="clickHandler(menu)"
                >
                    <div class="menu-item__icon" :style="getLinkStyle(index)">
                        <slot :data="menu" v-if="$slots.default"></slot>
                        <boat-icon v-else-if="typeof menu === 'string'" :name="menu" />
                    </div>
                </li>
            </ul>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch, getCurrentInstance } from 'vue';
import { rotateMenuProps } from './props';
import BoatIcon from '../../icon';
import { vDraggable } from '../../directives/draggable';

defineOptions({
    name: 'BoatRotateMenu',
});

const props = defineProps(rotateMenuProps);

const emit = defineEmits<{
    click: [menu: string | object];
}>();

const isExpanded = ref(false);

const classes = computed(() => ({
    'boat-rotate-menu': true,
    [props.customClass]: props.customClass,
    'is-expand': isExpanded.value,
}));

const getLinkStyle = (index: number) => {
    const totalItems = props.menus.length;
    const angle = totalItems < 6 ? index * 60 : (360 / totalItems) * index;

    return {
        transform: `rotate(-${angle}deg)`,
    };
};

watch(
    () => isExpanded.value,
    newVal => {
        const totalItems = props.menus.length;

        for (let i = 0; i < totalItems; i += 1) {
            const menuItem = document.querySelector(`#menu-item__${i}`) as HTMLElement;
            const angle = totalItems < 6 ? i * 60 : (360 / totalItems) * i;
            if (menuItem) {
                menuItem.style.transform = 'none';
                menuItem.style.opacity = '0';

                if (newVal) {
                    menuItem.style.transform = `rotate(${angle}deg) translateX(-${props.radius}px)`;
                    menuItem.style.opacity = '1';
                }
            }
        }
    }
);

function clickHandler(menu: string | object) {
    emit('click', menu);
}

/**
 * 自动注册拖拽指令（避免用户手动 app.directive 注册）
 */
const instance = getCurrentInstance();
if (
    instance &&
    instance.appContext &&
    !instance.appContext.config.globalProperties._draggableRegistered
) {
    instance.appContext.app.directive('draggable', vDraggable);
    // 打上标记，避免重复注册
    instance.appContext.config.globalProperties._draggableRegistered = true;
}
</script>
