<template>
    <button
        class="zb-button"
        :class="[
            `zb-button-${type}`,
            {
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle,
                'is-disabled': disabled,
                'is-mimicry': mimicry,
            },
        ]"
        @click="handleClick"
        :disabled="disabled"
    >
        <i :class="icon" v-if="icon"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'boat-button',
    emits: ['click'],
    props: {
        // 按钮类型
        type: {
            type: String,
            default: 'default',
            validator: (value: string) => {
                return (
                    ['default', 'success', 'primary', 'danger', 'warning', 'info', 'text'].indexOf(
                        value
                    ) !== -1
                );
            },
        },
        // 朴素按钮
        plain: {
            type: Boolean,
            default: false,
        },
        // 圆角按钮
        round: {
            type: Boolean,
            default: false,
        },
        // 圆按钮
        circle: {
            type: Boolean,
            default: false,
        },
        // icon图标
        icon: {
            type: String,
            default: '',
        },
        // 禁用属性
        disabled: {
            type: Boolean,
            default: false,
        },
        // 拟态
        mimicry: {
            type: Boolean,
            default: false,
        },
    },
    setup(_, { emit }) {
        const handleClick = (event: Event) => {
            emit('click', event);
        };

        return { handleClick };
    },
});
</script>
