<template>
    <div class="zb-input" :class="{ 'zb-input--suffix': showSuffix }">
        <!-- 如果传了show-password, 判断是否需要切换 密码的显示 如果不传，不判断 -->
        <input
            class="zb-input__inner"
            :class="{ 'is-disabled': disabled }"
            :placeholder="placeholder"
            :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
            :name="name"
            :disabled="disabled"
            :value="modelValue"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus"
            @keyup.enter="keyup"
        />
        <span class="zb-input__suffix" v-if="showSuffix">
            <i
                class="zb-input__icon zb-icon-circle-close"
                v-if="clearable && modelValue"
                @click="clear"
            ></i>
            <i
                class="zb-input__icon zb-icon-view"
                v-if="showPassword"
                @click="handlePassword"
                :class="{ 'zb-icon-view-active': passwordVisible }"
            ></i>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
    name: 'boat-input',
    emits: ['update:modelValue', 'onblur', 'onfocus', 'change'],
    props: {
        // 默认提示信息
        placeholder: {
            type: String,
            default: '',
        },
        // 输入框类型，默认为文本输入框
        type: {
            type: String,
            default: 'text',
        },
        // <input> 元素的名称
        name: {
            type: String,
            default: '',
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 双向绑定值
        modelValue: {
            type: String,
            default: '',
        },
        // 是否可清空
        clearable: {
            type: Boolean,
            default: false,
        },
        // 是否显示密码（密码框可以）
        showPassword: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        // 用于控制是否显示密码框
        const passwordVisible = ref(false);

        const showSuffix = computed(() => props.clearable || props.showPassword);

        // 在 Input 值改变时触发
        const onInput = (event: Event) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value);
        };
        // 清空输入框
        const clear = () => {
            emit('update:modelValue', '');
        };
        // 是否显示密码icon
        const handlePassword = () => {
            passwordVisible.value = !passwordVisible.value;
        };
        // 在 Input 失去焦点时触发
        const onBlur = (event: Event) => {
            emit('onblur', (event.target as HTMLInputElement).value);
        };
        // 在 Input 获得焦点时触发
        const onFocus = (event: Event) => {
            emit('onfocus', (event.target as HTMLInputElement).value);
        };
        // 用户按下回车时触发
        const keyup = (event: Event) => {
            emit('change', (event.target as HTMLInputElement).value);
        };

        return {
            passwordVisible,
            showSuffix,
            onInput,
            clear,
            handlePassword,
            onBlur,
            onFocus,
            keyup,
        };
    },
});
</script>
