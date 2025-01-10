import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BoatIcon from '../src/icon.vue';

describe('BoatIcon.vue', () => {
    it('renders the correct icon name', () => {
        const wrapper = mount(BoatIcon, {
            props: {
                name: 'success',
                color: 'blue',
                size: '24px',
            },
        });
        const useElement = wrapper.find('use');
        expect(useElement.attributes('href')).toBe('#boat-success');
    });

    it('applies the correct styles', () => {
        const wrapper = mount(BoatIcon, {
            props: {
                name: 'success',
                color: 'blue',
                size: '24px',
            },
        });
        const svgElement = wrapper.find('svg');
        expect(svgElement.attributes('style')).toContain('color: blue;');
        expect(svgElement.attributes('style')).toContain('font-size: 24px;');
    });

    it('has the correct aria-hidden attribute', () => {
        const wrapper = mount(BoatIcon, {
            props: {
                name: 'success',
                color: 'blue',
                size: '24px',
            },
        });
        const svgElement = wrapper.find('svg');
        expect(svgElement.attributes('aria-hidden')).toBe('true');
    });
});
