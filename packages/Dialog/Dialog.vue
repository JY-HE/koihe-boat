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
    name: 'ZbDialog',
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
                document.querySelector('body')?.appendChild(ZbDialogRef.value);
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

<style lang="scss">
.zb-dialog_wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: -3vh;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    background-color: rgba(0, 0, 0, 0.5);
    .zb-dialog {
        position: relative;
        margin: 15vh auto 50px;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;

        &_header {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            .zb-dialog_title {
                line-height: 24px;
                font-size: 20px;
                color: #303133;
            }
            .zb-dialog_header_button {
                padding: 0;
                background: transparent;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 20px;
                color: #303133;

                &:hover {
                    color: #588cf3;
                }
            }
        }

        &_body {
            padding: 20px;
            color: #606266;
            font-size: 20px;
            word-break: break-all;
        }

        &_footer {
            padding: 10px 20px;
            text-align: right;
            box-sizing: border-box;
            .zb-button:first-child {
                margin-right: 20px;
            }
        }
    }
    // 拟态风格
    .zb-dialog.is-mimicry {
        border-radius: 12px;
        box-shadow: inset 7px 14px 23px #dadada, inset -7px -14px 23px #eeeeee;
    }
}

// vue transition 组件自带过渡动画样式
.dialog-fade-enter-active {
    animation: fade 0.5s;
}

.dialog-fade-leave-active {
    animation: fade 0.39s reverse;
}
@keyframes fade {
    from {
        opacity: 0;
        transform: translateY(-3vh);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
