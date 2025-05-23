import {
  Fragment,
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  isVNode,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  render,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  unref,
  vShow,
  watch,
  withCtx,
  withDirectives
} from "./chunk-YV5EF3ZW.js";

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/directives/draggable/index.mjs
var getTriggerElement = (context, selector) => {
  if (!selector) return context;
  const target = context.querySelector(selector);
  if (!(target instanceof HTMLElement)) {
    console.warn(`v-draggable: trigger selector "${selector}" not found`);
    return null;
  }
  return target;
};
var parseTranslate = (context) => {
  const match = context.style.transform.match(/translate(3d)?\(([-\d.]+)px,\s*([-\d.]+)px/);
  return match ? { x: +match[2], y: +match[3] } : { x: 0, y: 0 };
};
var getElementGeometry = (context) => {
  const rect = context.getBoundingClientRect();
  const translate = parseTranslate(context);
  return {
    baseX: rect.left - translate.x,
    // 元素未应用 transform 时的原始 left
    baseY: rect.top - translate.y,
    // 元素未应用 transform 时的原始 top
    width: context.offsetWidth,
    height: context.offsetHeight
  };
};
var getDragBoundaries = (context) => {
  const { baseX, baseY, width, height } = getElementGeometry(context);
  return {
    minX: -baseX,
    maxX: window.innerWidth - baseX - width,
    minY: -baseY,
    maxY: window.innerHeight - baseY - height
  };
};
var clamp = (value, min, max) => Math.max(min, Math.min(value, max));
var vDraggable = {
  mounted(el, binding) {
    var _a;
    let isDragging = false;
    let startPosition = { x: 0, y: 0 };
    let currentTranslate = { x: 0, y: 0 };
    let blockClickHandler = null;
    const threshold = ((_a = binding.value) == null ? void 0 : _a.dragThreshold) || 5;
    const options = binding.value || {};
    const triggerElement = getTriggerElement(el, options.triggerSelector);
    if (!triggerElement) return;
    const initialCursor = getComputedStyle(triggerElement).cursor;
    const handleMouseDown = (event) => {
      event.preventDefault();
      currentTranslate = parseTranslate(el);
      startPosition = {
        x: event.clientX - currentTranslate.x,
        y: event.clientY - currentTranslate.y
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp, { passive: false });
    };
    const handleMouseMove = (event) => {
      var _a2, _b, _c, _d;
      event.preventDefault();
      const deltaX = Math.abs(event.clientX - startPosition.x - currentTranslate.x);
      const deltaY = Math.abs(event.clientY - startPosition.y - currentTranslate.y);
      if (!isDragging && (deltaX > threshold || deltaY > threshold)) {
        isDragging = true;
        if (blockClickHandler) {
          el.removeEventListener("click", blockClickHandler, true);
          blockClickHandler = null;
        }
        (_b = (_a2 = binding.value) == null ? void 0 : _a2.onDragStart) == null ? void 0 : _b.call(_a2, event);
      }
      if (isDragging) {
        triggerElement.style.cursor = "move";
        const boundaries = getDragBoundaries(el);
        currentTranslate = {
          x: clamp(event.clientX - startPosition.x, boundaries.minX, boundaries.maxX),
          y: clamp(event.clientY - startPosition.y, boundaries.minY, boundaries.maxY)
        };
        el.style.transform = `translate(${currentTranslate.x}px, ${currentTranslate.y}px)`;
        (_d = (_c = binding.value) == null ? void 0 : _c.onDrag) == null ? void 0 : _d.call(_c, event);
      }
    };
    const handleMouseUp = (event) => {
      var _a2;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (isDragging) {
        triggerElement.style.cursor = initialCursor;
        blockClickHandler = (event2) => {
          event2.stopPropagation();
          event2.preventDefault();
          el.removeEventListener("click", blockClickHandler, true);
          blockClickHandler = null;
        };
        el.addEventListener("click", blockClickHandler, true);
        (_a2 = options.onDragEnd) == null ? void 0 : _a2.call(options, event);
      }
      isDragging = false;
    };
    triggerElement.addEventListener("mousedown", handleMouseDown);
  }
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/utils/install/index.mjs
var withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
var withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/utils/makeProps/index.mjs
function makeBooleanProp(defaultValue = false) {
  return {
    type: Boolean,
    default: defaultValue
  };
}
function makeStringProp(defaultValue = "") {
  return {
    type: String,
    default: defaultValue
  };
}
function makeEnumProp(values, defaultValue) {
  return {
    type: String,
    default: defaultValue,
    validator(value) {
      return values.includes(value);
    }
  };
}
function makeNumberProp(defaultValue = 0) {
  return {
    type: Number,
    default: defaultValue
  };
}
function makeFunctionProp(defaultValue = null) {
  return {
    type: Function,
    default: defaultValue
  };
}
function makeUnionProp(types, defaultValue) {
  return {
    type: types,
    default: defaultValue
  };
}

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/icon/src/props.mjs
var iconProps = {
  /**
   * 图标名称
   */
  name: makeStringProp(""),
  /**
   * 图标颜色
   */
  color: makeStringProp(""),
  /**
   * 图标大小
   */
  size: makeStringProp("")
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/icon/src/icon.vue2.mjs
var _hoisted_1 = ["xlink:href"];
var __default__ = defineComponent({
  name: "BoatIcon"
});
var _sfc_main = defineComponent({
  ...__default__,
  props: iconProps,
  setup(__props) {
    ;
    const props = __props;
    const iconName = computed(() => `#boat-${props.name}`);
    const style = computed(() => ({
      color: props.color,
      fontSize: props.size
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "svg",
        {
          class: "boat-icon",
          style: normalizeStyle(style.value),
          "aria-hidden": "true"
        },
        [
          createBaseVNode("use", { "xlink:href": iconName.value }, null, 8, _hoisted_1)
        ],
        4
        /* STYLE */
      );
    };
  }
});

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/icon/index.mjs
var BoatIcon = withInstall(_sfc_main);

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/button/src/props.mjs
var boatButtonProps = {
  /**
   * 按钮类型
   */
  type: makeEnumProp(
    ["primary", "success", "error", "warning", "info", "link", ""],
    ""
  ),
  /**
   * 是否禁用按钮
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否为次要按钮
   */
  plain: makeBooleanProp(false)
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/button/src/button.vue2.mjs
var _hoisted_12 = ["disabled"];
var __default__2 = defineComponent({
  name: "BoatButton"
});
var _sfc_main2 = defineComponent({
  ...__default__2,
  props: boatButtonProps,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    ;
    const props = __props;
    const emit = __emit;
    const classes = computed(() => ({
      "boat-button": true,
      "boat-button--default": !props.type,
      [`boat-button--${props.type}`]: props.type,
      "is-disabled": props.disabled,
      plain: props.plain
    }));
    const handleClick = (event) => {
      emit("click", event);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass(classes.value),
        onClick: handleClick,
        disabled: _ctx.disabled
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_12);
    };
  }
});

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/button/index.mjs
var BoatButton = withInstall(_sfc_main2);

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/src/props.mjs
var boatNotificationProps = {
  /**
   * 通知标题
   */
  title: makeStringProp(""),
  /**
   * 通知类型
   */
  type: makeEnumProp(["success", "error", "warning", "info", ""], ""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * icon 自定义图标。若设置了 type，则 icon 会被覆盖
   */
  icon: makeStringProp(""),
  /**
   * icon 颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 是否显示关闭按钮
   */
  showClose: makeBooleanProp(true),
  /**
   * 显示时间, 单位为毫秒。值为 0 则不会自动关闭
   */
  duration: makeNumberProp(4e3),
  /**
   * 自定义弹出位置
   */
  position: makeEnumProp(
    ["top-right", "top-left", "bottom-right", "bottom-left"],
    "top-right"
  ),
  /**
   * 相对屏幕顶部/底部的距离
   */
  offset: makeNumberProp(16),
  /**
   * 通知栏正文内容
   */
  content: makeUnionProp(
    [String, Object, Function],
    ""
  ),
  /**
   * 是否显示底部按钮。
   */
  showFooterButton: makeBooleanProp(false),
  /**
   * 底部按钮类型。若不设置，则与通知类型一致
   */
  footerButtonType: makeEnumProp(
    ["primary", "success", "error", "warning", "info", "link", ""],
    ""
  ),
  /**
   * 底部按钮文本
   */
  footerButtonText: makeStringProp("button"),
  /**
   * 底部按钮是否禁用
   */
  footerButtonDisabled: makeBooleanProp(false),
  /**
   * 设置通知的 z-index
   */
  zIndex: makeNumberProp(9999),
  /**
   * 通知的唯一标识
   */
  id: makeStringProp(""),
  /**
   * 关闭时的回调函数
   */
  onClose: makeFunctionProp(() => {
  }),
  /**
   * 销毁时的回调函数
   */
  onDestroy: makeFunctionProp(() => {
  }),
  /**
   * 点击底部按钮时的回调函数
   */
  onFooterClick: makeFunctionProp(() => {
  })
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/src/notification.vue2.mjs
var _hoisted_13 = ["id"];
var _hoisted_2 = { class: "notification-header" };
var _hoisted_3 = { class: "notification-header__icon" };
var _hoisted_4 = { class: "notification-header__title" };
var _hoisted_5 = {
  key: 0,
  class: "notification-content"
};
var _hoisted_6 = { key: 1 };
var _hoisted_7 = {
  key: 1,
  class: "notification-footer"
};
var __default__3 = defineComponent({
  name: "BoatNotification"
});
var _sfc_main3 = defineComponent({
  ...__default__3,
  props: boatNotificationProps,
  setup(__props, { expose: __expose }) {
    ;
    const props = __props;
    const visible = ref(true);
    const timer = ref(null);
    const classes = computed(() => ({
      "boat-notification": true,
      [`boat-notification--${props.type}`]: props.type,
      [props.customClass]: props.customClass,
      [`${props.position}`]: props.position
    }));
    const styles = computed(() => {
      var _a, _b;
      const style = {
        zIndex: String(props.zIndex)
      };
      if (typeof props.offset === "number") {
        if ((_a = props.position) == null ? void 0 : _a.includes("top")) {
          style.top = `${props.offset}px`;
        }
        if ((_b = props.position) == null ? void 0 : _b.includes("bottom")) {
          style.bottom = `${props.offset}px`;
        }
      }
      return style;
    });
    const iconName = computed(() => props.type || props.icon);
    const iconColor = computed(() => {
      const colors = /* @__PURE__ */ new Map([
        ["success", "rgb(var(--boat-success-color))"],
        ["error", "rgb(var(--boat-error-color))"],
        ["warning", "rgb(var(--boat-warning-color))"],
        ["info", "rgb(var(--boat-info-color))"]
      ]);
      return colors.get(props.type) || props.iconColor;
    });
    function startTimer() {
      if (props.duration === 0 || !visible.value) return;
      timer.value = setTimeout(close2, props.duration);
    }
    function clearTimer() {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    }
    function close2() {
      visible.value = false;
    }
    const isRenderFunction = (value) => {
      return typeof value === "function" && !value.length;
    };
    function onBeforeLeave() {
      var _a;
      (_a = props.onClose) == null ? void 0 : _a.call(props);
    }
    function onAfterLeave() {
      var _a;
      (_a = props.onDestroy) == null ? void 0 : _a.call(props);
    }
    function onFooterButtonClick() {
      var _a;
      (_a = props.onFooterClick) == null ? void 0 : _a.call(props);
    }
    onMounted(startTimer);
    onUnmounted(clearTimer);
    __expose({
      visible,
      close: close2
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "boat-notification-fade",
        onBeforeLeave,
        onAfterLeave,
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            id: _ctx.id,
            class: normalizeClass(classes.value),
            style: normalizeStyle(styles.value),
            onMouseenter: clearTimer,
            onMouseleave: startTimer
          }, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                iconName.value ? (openBlock(), createBlock(unref(BoatIcon), {
                  key: 0,
                  name: iconName.value,
                  color: iconColor.value
                }, null, 8, ["name", "color"])) : createCommentVNode("v-if", true)
              ]),
              createBaseVNode(
                "div",
                _hoisted_4,
                toDisplayString(_ctx.title),
                1
                /* TEXT */
              ),
              _ctx.showClose ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "notification-header__close",
                onClick: close2
              }, [
                createVNode(unref(BoatIcon), { name: "close" })
              ])) : createCommentVNode("v-if", true)
            ]),
            _ctx.content ? (openBlock(), createElementBlock("div", _hoisted_5, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                isVNode(_ctx.content) || isRenderFunction(_ctx.content) && isVNode(_ctx.content()) ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.content), { key: 0 })) : (openBlock(), createElementBlock(
                  "p",
                  _hoisted_6,
                  toDisplayString(_ctx.content),
                  1
                  /* TEXT */
                ))
              ])
            ])) : createCommentVNode("v-if", true),
            _ctx.showFooterButton ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createVNode(unref(BoatButton), {
                disabled: _ctx.footerButtonDisabled,
                type: _ctx.footerButtonType || _ctx.type,
                onClick: onFooterButtonClick
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.footerButtonText),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled", "type"])
            ])) : createCommentVNode("v-if", true)
          ], 46, _hoisted_13), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      });
    };
  }
});

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/src/notify.mjs
var notifications = {
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": []
};
var GAP_SIZE = 16;
var seed = 1;
var notify = (options) => {
  const position = options.position || "top-right";
  let verticalOffset = options.offset || 16;
  notifications[position].forEach(({ vm }) => {
    var _a;
    verticalOffset += (((_a = vm.el) == null ? void 0 : _a.offsetHeight) || 0) + GAP_SIZE;
  });
  verticalOffset += GAP_SIZE;
  const id = `notification_${seed++}`;
  const container = document.createElement("div");
  const userOnClose = options.onClose;
  const userOnDestroy = options.onDestroy;
  const vNode = createVNode(_sfc_main3, {
    ...options,
    offset: verticalOffset,
    id,
    onClose: () => {
      close(id, position);
      userOnClose == null ? void 0 : userOnClose();
    },
    onDestroy: () => {
      render(null, container);
      container.remove();
      userOnDestroy == null ? void 0 : userOnDestroy();
    }
  });
  if (notify._context) {
    vNode.appContext = notify._context;
  }
  render(vNode, container);
  notifications[position].push({ vm: vNode });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => {
      vNode.component.exposed.close();
    }
  };
};
function close(id, position) {
  const orientedNotifications = notifications[position];
  const idx = orientedNotifications.findIndex(({ vm: vm2 }) => {
    var _a;
    return ((_a = vm2.component) == null ? void 0 : _a.props.id) === id;
  });
  if (idx === -1) return;
  const { vm } = orientedNotifications[idx];
  const removedHeight = vm.el.offsetHeight;
  const verticalPos = position.split("-")[0];
  orientedNotifications.splice(idx, 1);
  for (let i = idx; i < orientedNotifications.length; i++) {
    const { el, component } = orientedNotifications[i].vm;
    const pos = Number.parseInt(el.style[verticalPos], 10) - removedHeight - GAP_SIZE;
    component.props.offset = pos;
  }
}
function closeAll() {
  Object.values(notifications).forEach((orientedNotifications) => {
    orientedNotifications.forEach(({ vm }) => {
      vm.component.exposed.close();
    });
  });
}
notify.closeAll = closeAll;
notify._context = null;

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/index.mjs
var BoatNotification = withInstallFunction(notify, "$notify");

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/progress-notification/src/props.mjs
var boatProgressNotificationProps = {
  /**
   * 进度通知是否可见
   */
  modelValue: makeBooleanProp(false),
  /**
   * 标题
   */
  title: makeStringProp(""),
  /**
   * 消息内容
   */
  message: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 状态
   */
  status: makeEnumProp(["success", "error", ""], ""),
  /**
   * 当 status 为 error 时显示错误信息
   */
  errorTip: makeStringProp(""),
  /**
   * 状态为 success 时自动关闭时间，单位: 毫秒。为 0 时不自动关闭
   */
  duration: makeNumberProp(3e3),
  /**
   * 是否显示关闭按钮
   */
  showClose: makeBooleanProp(true),
  /**
   * 设置通知的 z-index
   */
  zIndex: makeNumberProp(9999),
  /**
   * 底部左侧按钮文本
   */
  footerLeftText: makeStringProp("Cancel"),
  /**
   * 底部右侧按钮文本
   */
  footerRightText: makeStringProp("Retry"),
  /**
   * 底部左侧按钮是否禁用
   */
  footerLeftDisabled: makeBooleanProp(false),
  /**
   * 底部右侧按钮是否禁用
   */
  footerRightDisabled: makeBooleanProp(false),
  /**
   * 执行函数
   */
  action: makeFunctionProp(),
  /**
   * 挂载到指定元素上，默认为 body 元素
   */
  appendTo: makeUnionProp([String, Object], "body"),
  /**
   * 自定义弹出位置
   */
  position: makeEnumProp(
    ["top-right", "top-left", "bottom-right", "bottom-left"],
    "top-right"
  ),
  /**
   * 相对屏幕顶部/底部的距离
   */
  offset: makeNumberProp(16)
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/progress-notification/src/progressNotification.vue2.mjs
var _hoisted_14 = { class: "progress-header" };
var _hoisted_22 = { class: "progress-header__icon" };
var _hoisted_32 = { class: "progress-header__title" };
var _hoisted_42 = { class: "progress-main" };
var _hoisted_52 = {
  key: 0,
  class: "progress-main__message"
};
var _hoisted_62 = { class: "progress-main__bar" };
var _hoisted_72 = {
  key: 1,
  class: "progress-main__errorTip"
};
var _hoisted_8 = {
  key: 0,
  class: "progress-footer"
};
var __default__4 = defineComponent({
  name: "BoatProgressNotification"
});
var _sfc_main4 = defineComponent({
  ...__default__4,
  props: boatProgressNotificationProps,
  emits: ["update:modelValue", "retry", "close"],
  setup(__props, { emit: __emit }) {
    ;
    const props = __props;
    const emit = __emit;
    const currentStatus = ref("");
    const errorMessage = ref("");
    const progress = ref(0);
    const progressTimer = ref(null);
    const durationTimer = ref(null);
    const classes = computed(() => ({
      "boat-progress-notification": true,
      [`boat-progress-notification--${currentStatus.value}`]: currentStatus.value,
      [props.customClass]: props.customClass,
      [`${props.position}`]: props.position
    }));
    const iconName = computed(() => currentStatus.value || "info");
    const styles = computed(() => {
      var _a, _b;
      const style = { zIndex: String(props.zIndex) };
      if (typeof props.offset === "number") {
        if ((_a = props.position) == null ? void 0 : _a.includes("top")) style.top = `${props.offset}px`;
        if ((_b = props.position) == null ? void 0 : _b.includes("bottom")) style.bottom = `${props.offset}px`;
      }
      return style;
    });
    function clearTimer(timer) {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    }
    function incrementProgress() {
      if (currentStatus.value === "error") return;
      if (currentStatus.value === "success") {
        progress.value = 100;
        if (props.duration > 0) {
          clearTimer(durationTimer);
          durationTimer.value = setTimeout(close2, props.duration);
        }
        return;
      }
      if (progress.value < 90) {
        clearTimer(progressTimer);
        progress.value += (90 - progress.value) * 0.1;
        progressTimer.value = setTimeout(incrementProgress, 500);
      }
    }
    function close2() {
      emit("close");
      clearTimer(progressTimer);
      clearTimer(durationTimer);
      progress.value = 0;
      errorMessage.value = "";
      currentStatus.value = "";
      emit("update:modelValue", false);
    }
    function handleRetry() {
      emit("retry");
      currentStatus.value = "";
      errorMessage.value = "";
      if (props.action && typeof props.action === "function") {
        executeAction();
      }
      incrementProgress();
    }
    async function executeAction() {
      try {
        await props.action();
        currentStatus.value = "success";
      } catch (error) {
        currentStatus.value = "error";
        errorMessage.value = error instanceof Error ? error.message : String(error);
      }
    }
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          if (props.action && typeof props.action === "function") {
            executeAction();
          }
          incrementProgress();
        }
      },
      { immediate: true }
    );
    watch(
      () => props.status,
      (newVal) => {
        currentStatus.value = newVal;
        if (!props.action || typeof props.action !== "function") {
          incrementProgress();
        }
      },
      { deep: true }
    );
    onUnmounted(() => {
      clearTimer(progressTimer);
      clearTimer(durationTimer);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: _ctx.appendTo }, [
        createVNode(Transition, { name: "boat-notification-fade" }, {
          default: withCtx(() => [
            _ctx.modelValue ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: normalizeClass(classes.value),
                style: normalizeStyle(styles.value)
              },
              [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", _hoisted_22, [
                    createVNode(unref(BoatIcon), { name: iconName.value }, null, 8, ["name"])
                  ]),
                  createBaseVNode(
                    "div",
                    _hoisted_32,
                    toDisplayString(_ctx.title),
                    1
                    /* TEXT */
                  ),
                  _ctx.showClose ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "progress-header__close",
                    onClick: close2
                  }, [
                    createVNode(unref(BoatIcon), { name: "close" })
                  ])) : createCommentVNode("v-if", true)
                ]),
                createBaseVNode("div", _hoisted_42, [
                  _ctx.message ? (openBlock(), createElementBlock(
                    "div",
                    _hoisted_52,
                    toDisplayString(_ctx.message),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createBaseVNode("div", _hoisted_62, [
                    createBaseVNode(
                      "div",
                      {
                        class: "progress-main__bar__inner",
                        style: normalizeStyle({ width: `${progress.value}%` })
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ]),
                  currentStatus.value === "error" ? (openBlock(), createElementBlock(
                    "div",
                    _hoisted_72,
                    toDisplayString(errorMessage.value || _ctx.errorTip),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                currentStatus.value === "error" ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  createVNode(unref(BoatButton), {
                    onClick: close2,
                    disabled: _ctx.footerLeftDisabled,
                    type: "error",
                    plain: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(_ctx.footerLeftText),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"]),
                  createVNode(unref(BoatButton), {
                    type: "error",
                    onClick: handleRetry,
                    disabled: _ctx.footerRightDisabled
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(_ctx.footerRightText),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])
                ])) : createCommentVNode("v-if", true)
              ],
              6
              /* CLASS, STYLE */
            )) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        })
      ], 8, ["to"]);
    };
  }
});

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/progress-notification/index.mjs
var BoatProgressNotification = withInstall(_sfc_main4);

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/rotate-menu/src/props.mjs
var rotateMenuProps = {
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 菜单数组，支持传 boat-icon 图标名称字符串数组，或者自定义数据数组对象
   */
  menus: makeUnionProp([Array], []),
  /**
   * 半径，默认为 110
   */
  radius: makeNumberProp(110),
  /**
   * z-index，默认为 9999
   */
  zIndex: makeNumberProp(9999),
  /**
   * 挂载到指定元素上，默认为 body 元素
   */
  appendTo: makeUnionProp([String, Object], "body")
};

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/rotate-menu/src/rotateMenu.vue2.mjs
var _hoisted_15 = ["id", "onClick"];
var __default__5 = defineComponent({
  name: "BoatRotateMenu"
});
var _sfc_main5 = defineComponent({
  ...__default__5,
  props: rotateMenuProps,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    ;
    const props = __props;
    const emit = __emit;
    const isExpanded = ref(false);
    const classes = computed(() => ({
      "boat-rotate-menu": true,
      [props.customClass]: props.customClass,
      "is-expand": isExpanded.value
    }));
    const getLinkStyle = (index2) => {
      const totalItems = props.menus.length;
      const angle = totalItems < 6 ? index2 * 60 : 360 / totalItems * index2;
      return {
        transform: `rotate(-${angle}deg)`
      };
    };
    watch(
      () => isExpanded.value,
      (newVal) => {
        const totalItems = props.menus.length;
        for (let i = 0; i < totalItems; i += 1) {
          const menuItem = document.querySelector(`#menu-item__${i}`);
          const angle = totalItems < 6 ? i * 60 : 360 / totalItems * i;
          if (menuItem) {
            menuItem.style.transform = "none";
            menuItem.style.opacity = "0";
            if (newVal) {
              menuItem.style.transform = `rotate(${angle}deg) translateX(-${props.radius}px)`;
              menuItem.style.opacity = "1";
            }
          }
        }
      }
    );
    function clickHandler(menu) {
      emit("click", menu);
    }
    const instance = getCurrentInstance();
    if (instance && instance.appContext && !instance.appContext.config.globalProperties._draggableRegistered) {
      instance.appContext.app.directive("draggable", vDraggable);
      instance.appContext.config.globalProperties._draggableRegistered = true;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: _ctx.appendTo }, [
        withDirectives((openBlock(), createElementBlock(
          "div",
          {
            class: normalizeClass(classes.value),
            style: normalizeStyle({ zIndex: props.zIndex })
          },
          [
            createBaseVNode("div", {
              class: "menu-toggler",
              onClick: _cache[0] || (_cache[0] = ($event) => isExpanded.value = !isExpanded.value)
            }, _cache[1] || (_cache[1] = [
              createBaseVNode(
                "div",
                { class: "toggler-content" },
                [
                  createBaseVNode("div", { class: "toggler-content__line" })
                ],
                -1
                /* HOISTED */
              )
            ])),
            createBaseVNode("ul", null, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.menus, (menu, index2) => {
                  return openBlock(), createElementBlock("li", {
                    class: "menu-item",
                    key: index2,
                    id: `menu-item__${index2}`,
                    onClick: ($event) => clickHandler(menu)
                  }, [
                    createBaseVNode(
                      "div",
                      {
                        class: "menu-item__icon",
                        style: normalizeStyle(getLinkStyle(index2))
                      },
                      [
                        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          data: menu
                        }) : typeof menu === "string" ? (openBlock(), createBlock(unref(BoatIcon), {
                          key: 1,
                          name: menu
                        }, null, 8, ["name"])) : createCommentVNode("v-if", true)
                      ],
                      4
                      /* STYLE */
                    )
                  ], 8, _hoisted_15);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ],
          6
          /* CLASS, STYLE */
        )), [
          [unref(vDraggable), {
            triggerSelector: ".menu-toggler"
          }]
        ])
      ], 8, ["to"]);
    };
  }
});

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/rotate-menu/index.mjs
var BoatRotateMenu = withInstall(_sfc_main5);

// ../node_modules/.pnpm/@koihe+boat-ui@1.1.2_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/index.mjs
var components = [
  BoatIcon,
  BoatButton,
  BoatNotification,
  BoatProgressNotification,
  BoatRotateMenu
];
function install(app) {
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
  if (!app.config.globalProperties._draggableRegistered) {
    app.directive("draggable", vDraggable);
    app.config.globalProperties._draggableRegistered = true;
  }
}
var index = {
  install
};
export {
  BoatButton,
  BoatIcon,
  BoatNotification,
  BoatProgressNotification,
  BoatRotateMenu,
  boatButtonProps,
  boatNotificationProps,
  boatProgressNotificationProps,
  index as default,
  iconProps,
  install,
  rotateMenuProps
};
//# sourceMappingURL=@koihe_boat-ui.js.map
