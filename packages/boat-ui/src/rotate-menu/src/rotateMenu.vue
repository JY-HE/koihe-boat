<template>
    <div :class="classes" :style="{ zIndex: props.zIndex }">
        <div class="menu-toggler" @click="isExpanded = !isExpanded">
            <div class="menu-toggler__line"></div>
        </div>
        <ul>
            <li
                class="menu-item"
                v-for="(item, index) in menus"
                :key="item"
                :id="`menu-item__${index}`"
            >
                <div class="menu-item__icon" :style="getLinkStyle(index)">{{ item }}</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { rotateMenuProps } from './props';

defineOptions({
    name: 'BoatRotateMenu',
});

const props = defineProps(rotateMenuProps);

const isExpanded = ref(false);

const classes = computed(() => ({
    'boat-rotate-menu': true,
    customClass: props.customClass,
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
</script>
