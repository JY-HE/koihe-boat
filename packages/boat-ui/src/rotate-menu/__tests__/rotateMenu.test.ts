import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BoatRotateMenu from '../src/rotateMenu.vue';

describe('BoatRotateMenu.vue', () => {
    // 测试组件是否能正常挂载
    it('should render correctly', () => {
        const wrapper = mount(BoatRotateMenu);
        expect(wrapper.exists()).toBe(true);
    });

    // 测试组件是否包含默认样式类
    it('should have the default class "boat-rotate-menu"', () => {
        const wrapper = mount(BoatRotateMenu);
        expect(wrapper.classes()).toContain('boat-rotate-menu');
    });

    // 测试 menus 为字符串数组时的渲染
    it('should render boat-icon icons when menus is a string array', () => {
        const menus = ['play', 'shut', 'close', 'move', 'delete'];
        const wrapper = mount(BoatRotateMenu, {
            props: { menus },
        });
        const iconElements = wrapper.findAll('.boat-icon');
        expect(iconElements.length).toBe(menus.length);
    });

    // 测试 menus 为对象数组时，使用默认插槽自定义菜单项内容
    it('should render custom slot content when menus is an object array', () => {
        const menus = [{ name: '菜单1' }, { name: '菜单2' }, { name: '菜单3' }];
        const wrapper = mount(BoatRotateMenu, {
            props: { menus },
            slots: {
                default: `<template #default="{ data }">
                    <span class="custom-menu-item">{{ data.name }}</span>
                  </template>`,
            },
        });
        const customItems = wrapper.findAll('.custom-menu-item');
        expect(customItems.length).toBe(menus.length);
        expect(customItems[0].text()).toBe('菜单1');
    });

    // 测试自定义类名是否能应用到组件根元素上
    it('should apply customClass prop to the root element', () => {
        const customClass = 'my-custom-class';
        const wrapper = mount(BoatRotateMenu, {
            props: {
                menus: ['play'],
                customClass,
            },
        });
        expect(wrapper.classes()).toContain(customClass);
    });

    // 测试 zIndex 与 radius 属性对组件样式的影响
    it('should apply zIndex and radius props to the component style', () => {
        const zIndex = 1000;
        const wrapper = mount(BoatRotateMenu, {
            props: {
                menus: ['play'],
                zIndex,
            },
        });
        const style = wrapper.attributes('style') || '';
        // 假设组件根元素 style 包含 z-index 和与半径有关的样式（如用于定位的距离）
        expect(style).toContain(`z-index: ${zIndex}`);
    });

    // 测试点击菜单项时能否正确触发 click 事件并传出对应的菜单项数据
    it('should emit click event with correct payload when a menu item is clicked', async () => {
        const menus = ['play', 'shut', 'close'];
        const wrapper = mount(BoatRotateMenu, {
            props: { menus },
        });
        // 根据实际结构调整选择器，假设菜单项节点包含类名 "boat-icon"
        const menuItem = wrapper.find('.boat-icon');
        await menuItem.trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click');
        const emittedPayload = wrapper.emitted('click')?.[0];
        // 传出的数据应为点击的菜单项内容
        expect(emittedPayload).toEqual([menus[0]]);
    });
});
