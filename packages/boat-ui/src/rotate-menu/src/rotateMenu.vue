<template>
    <div class="boat-rotate-menu" :style="cssVariables">
        <!-- <input type="checkbox" id="menu_toggler" checked /> -->
        <input type="checkbox" id="menu_toggler" v-model="isExpanded" />
        <label for="menu_toggler"></label>
        <ul>
            <li class="menu-item" v-for="(item, index) in menus" :key="item">
                <a href="#">{{ item }}</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { rotateMenuProps } from './props';

defineOptions({
    name: 'BoatRotateMenu',
});

const props = defineProps(rotateMenuProps);

// 控制菜单展开状态
const isExpanded = ref(props.expend);

const cssVariables = computed(() => ({
    '--menus-count': props.menus.length,
    '--menus-items': Array.from({ length: props.menus.length }, (_, i) => i + 1).join(', '),
}));

// 计算每个菜单项的样式
const getMenuItemStyle = (index: number) => {
    const totalItems = props.menus.length;
    const angle = (360 / totalItems) * index; // 计算每个菜单项的角度
    const radius = 110; // 半径，可以根据需要调整

    return {
        transform: isExpanded.value
            ? `rotate(${angle}deg) translateX(-${radius}px)` // 展开状态
            : `rotate(${angle}deg) translateX(0)`, // 折叠状态
        opacity: isExpanded.value ? 1 : 0, // 展开时显示，折叠时隐藏
        transition: `opacity 0.3s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`, // 动态设置 transition-delay
    };
};

// 计算每个链接的样式（反向旋转）
const getLinkStyle = (index: number) => {
    const totalItems = props.menus.length;
    const angle = (360 / totalItems) * index; // 计算每个菜单项的角度

    return {
        transform: `rotate(-${angle}deg)`, // 反向旋转，抵消父元素的旋转
    };
};
</script>
