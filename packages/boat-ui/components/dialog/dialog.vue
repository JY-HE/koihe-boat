<template>
    <transition name="dialog-fade">
        <!-- 遮罩 -->
        <div
            class="zb-dialog_wrapper"
            v-if="modelValue"
            :style="modalStyle"
            @click.self="modalClick"
            ref="ZbDialogRef"
        >
            <div
                :class="['zb-dialog', mimicry ? 'is-mimicry' : '']"
                :style="{ width: width, 'margin-top': top }"
            >
                <div class="zb-dialog_header">
                    <!-- title 可通过具名 slot 传入 -->
                    <slot name="title">
                        <span class="zb-dialog_title">{{ title }}</span>
                    </slot>
                    <zb-button
                        icon="zb-icon-close"
                        class="zb-dialog_header_button"
                        @click.stop="closeDialog"
                        type="text"
                        v-if="showClose"
                    ></zb-button>
                </div>
                <div class="zb-dialog_body">
                    <slot></slot>
                </div>
                <div class="zb-dialog_footer" v-if="isShowFooter">
                    <!-- footer 可通过具名 slot 传入 -->
                    <slot name="footer">
                        <zb-button @click.stop="closeDialog">取消</zb-button>
                        <zb-button type="primary" @click.stop="determine">确定</zb-button>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, computed } from 'vue';
export default defineComponent({
    name: 'boat-dialog',
    emits: ['click', 'close', 'determine', 'update:modelValue'],
    props: {
        // Dialog 的标题
        title: {
            type: String,
            default: '',
        },
        // Dialog 的宽度
        width: {
            type: String,
            default: '50%',
        },
        // 距离顶部
        top: {
            type: String,
            default: '15vh',
        },
        // 是否显示 Dialog
        modelValue: {
            type: Boolean,
            default: false,
        },
        // 是否拟态
        mimicry: {
            type: Boolean,
            default: false,
        },
        // 是否显示底部按钮
        footer: {
            type: Boolean,
            default: true,
        },
        // Dialog 自身是否插入至 body 元素上
        appendToBody: {
            type: Boolean,
            default: false,
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: true,
        },
        // 是否需要遮罩层
        modal: {
            type: Boolean,
            default: true,
        },
        // 是否可以点击遮罩层关闭 Dialog
        closeOnClickModal: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { emit, slots }) {
        const ZbDialogRef = ref();

        onUpdated(() => {
            if (props.appendToBody && props.modelValue) {
                document.querySelector('body')?.appendChild(ZbDialogRef?.value);
            }
        });

        // 遮罩层样式
        const modalStyle = computed(() => {
            let styles = {};
            if (!props.modal) {
                styles = {
                    'pointer-events': 'none',
                    background: 'transparent',
                };
            }
            return styles;
        });
        // 是否显示底部按钮
        const isShowFooter = computed(() => props.footer ?? slots.footer);

        // 遮罩层点击事件
        const modalClick = () => {
            if (props.closeOnClickModal) {
                // 弹框关闭事件回调
                emit('close');
                emit('update:modelValue', false);
            }
            return;
        };
        // 关闭弹框事件
        const closeDialog = () => {
            emit('close');
            emit('update:modelValue', false);
        };
        // 点击确定按钮事件
        const determine = () => {
            // 点击确定按钮事件回调
            emit('determine');
            emit('update:modelValue', false);
        };

        return {
            ZbDialogRef,
            modalStyle,
            isShowFooter,
            modalClick,
            closeDialog,
            determine,
        };
    },
});
</script>
