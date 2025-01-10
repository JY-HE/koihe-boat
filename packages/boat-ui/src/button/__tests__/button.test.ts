import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BoatButton from '../src/button.vue';

describe('BoatButton.vue', () => {
    it('renders the correct default class', () => {
        const wrapper = mount(BoatButton);
        expect(wrapper.classes()).toContain('boat-button');
        expect(wrapper.classes()).toContain('boat-button--default');
    });

    it('renders the correct type class', () => {
        const wrapper = mount(BoatButton, {
            props: {
                type: 'primary',
            },
        });
        expect(wrapper.classes()).toContain('boat-button--primary');
    });

    it('applies the disabled class and attribute', () => {
        const wrapper = mount(BoatButton, {
            props: {
                disabled: true,
            },
        });
        expect(wrapper.classes()).toContain('is-disabled');
        expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('applies the plain class', () => {
        const wrapper = mount(BoatButton, {
            props: {
                plain: true,
            },
        });
        expect(wrapper.classes()).toContain('plain');
    });

    it('emits click event', async () => {
        const wrapper = mount(BoatButton);
        await wrapper.trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click');
    });

    it('renders slot content', () => {
        const wrapper = mount(BoatButton, {
            slots: {
                default: 'Click Me',
            },
        });
        expect(wrapper.text()).toBe('Click Me');
    });
});
