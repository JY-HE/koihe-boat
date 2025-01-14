import {
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
  isVNode,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  render,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  unref,
  vShow,
  watch,
  withCtx,
  withDirectives
} from "./chunk-YV5EF3ZW.js";

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/iconfont.mjs
window._iconfont_svg_string_4799714 = '<svg><symbol id="boat-search" viewBox="0 0 1024 1024"><path d="M479.053913 155.692522a313.299478 313.299478 0 1 0 0 626.598956 313.299478 313.299478 0 0 0 0-626.598956zM66.782609 468.992a412.271304 412.271304 0 1 1 824.498087 0 412.271304 412.271304 0 0 1-824.498087 0z"  ></path><path d="M707.895652 697.833739a49.463652 49.463652 0 0 1 69.899131 0l164.953043 164.908522a49.463652 49.463652 0 0 1-69.988174 69.988174L707.895652 767.777391a49.463652 49.463652 0 0 1 0-69.988174z"  ></path></symbol><symbol id="boat-info" viewBox="0 0 1024 1024"><path d="M569.6 304a57.6 57.6 0 1 1-115.2 0 57.6 57.6 0 0 1 115.2 0zM512 425.6a48 48 0 0 0-48 48v208H448a48 48 0 0 0 0 96h128a48 48 0 0 0 0-96h-16V473.6A48 48 0 0 0 512 425.6z"  ></path><path d="M64 512a448 448 0 1 1 896 0A448 448 0 0 1 64 512z m448-355.328a355.328 355.328 0 1 0 0 710.656A355.328 355.328 0 0 0 512 156.672z"  ></path></symbol><symbol id="boat-error" viewBox="0 0 1024 1024"><path d="M177.573647 498.447059a334.426353 334.426353 0 1 0 668.852706 0 334.426353 334.426353 0 0 0-668.852706 0zM90.352941 498.447059a421.647059 421.647059 0 1 1 843.294118 0 421.647059 421.647059 0 0 1-843.294118 0z m336.173177-147.154824a43.610353 43.610353 0 0 0-61.680942 61.680941l85.473883 85.473883-85.534118 85.473882a43.610353 43.610353 0 0 0 61.741177 61.680941L512 560.128l85.473882 85.473882a43.610353 43.610353 0 0 0 61.680942-61.680941l-85.473883-85.534117 85.534118-85.413648a43.610353 43.610353 0 1 0-61.741177-61.680941L512 436.705882 426.526118 351.171765z"  ></path></symbol><symbol id="boat-success" viewBox="0 0 1024 1024"><path d="M177.573647 498.447059a334.426353 334.426353 0 1 0 668.852706 0 334.426353 334.426353 0 0 0-668.852706 0zM90.352941 498.447059a421.647059 421.647059 0 1 1 843.294118 0 421.647059 421.647059 0 0 1-843.294118 0z m626.989177-85.534118a43.610353 43.610353 0 1 0-61.741177-61.620706l-201.788235 201.788236-85.473882-85.534118a43.610353 43.610353 0 1 0-61.680942 61.741176l116.314353 116.314353a43.610353 43.610353 0 0 0 61.741177 0l232.628706-232.628706z"  ></path></symbol><symbol id="boat-close" viewBox="0 0 1024 1024"><path d="M225.581176 212.028235a50.176 50.176 0 0 1 71.017412 0L512 427.429647l215.461647-215.521882a50.176 50.176 0 1 1 71.017412 71.017411L583.017412 498.447059l215.521882 215.521882a50.176 50.176 0 0 1-71.017412 70.957177L512.060235 569.464471 296.598588 784.865882a50.176 50.176 0 0 1-71.017412-70.957176l215.461648-215.521882-215.461648-215.461648a50.176 50.176 0 0 1 0-71.017411z"  ></path></symbol><symbol id="boat-warning" viewBox="0 0 1024 1024"><path d="M515.211636 768a57.623273 57.623273 0 1 0 0-115.2 57.623273 57.623273 0 0 0 0 115.2zM512 211.176727c-26.530909 0-47.988364 21.504-47.988364 47.988364v288.023273a47.988364 47.988364 0 0 0 95.976728 0V259.165091c0-26.530909-21.504-47.941818-47.988364-47.941818z"  ></path><path d="M512 64a448 448 0 1 0 0 896 448 448 0 0 0 0-896zM156.672 512a355.328 355.328 0 1 1 710.656 0 355.328 355.328 0 0 1-710.656 0z"  ></path></symbol></svg>', ((a) => {
  var t = (e = (e = document.getElementsByTagName("script"))[e.length - 1]).getAttribute("data-injectcss"), e = e.getAttribute("data-disable-injectsvg");
  if (!e) {
    var o, n, i, d, s, l = function(t2, e2) {
      e2.parentNode.insertBefore(t2, e2);
    };
    if (t && !a.__iconfont__svg__cssinject__) {
      a.__iconfont__svg__cssinject__ = true;
      try {
        document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
      } catch (t2) {
        console && console.log(t2);
      }
    }
    o = function() {
      var t2, e2 = document.createElement("div");
      e2.innerHTML = a._iconfont_svg_string_4799714, (e2 = e2.getElementsByTagName("svg")[0]) && (e2.setAttribute("aria-hidden", "true"), e2.style.position = "absolute", e2.style.width = 0, e2.style.height = 0, e2.style.overflow = "hidden", e2 = e2, (t2 = document.body).firstChild ? l(e2, t2.firstChild) : t2.appendChild(e2));
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(o, 0) : (n = function() {
      document.removeEventListener("DOMContentLoaded", n, false), o();
    }, document.addEventListener("DOMContentLoaded", n, false)) : document.attachEvent && (i = o, d = a.document, s = false, r(), d.onreadystatechange = function() {
      "complete" == d.readyState && (d.onreadystatechange = null, c());
    });
  }
  function c() {
    s || (s = true, i());
  }
  function r() {
    try {
      d.documentElement.doScroll("left");
    } catch (t2) {
      return void setTimeout(r, 50);
    }
    c();
  }
})(window);

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/utils/install/index.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/utils/makeProps/index.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/icon/src/props.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/icon/src/icon.vue2.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/icon/index.mjs
var BoatIcon = withInstall(_sfc_main);

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/button/src/props.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/button/src/button.vue2.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/button/index.mjs
var BoatButton = withInstall(_sfc_main2);

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/src/props.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/src/notification.vue2.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/src/notify.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/notification/index.mjs
var BoatNotification = withInstallFunction(notify, "$notify");

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/progress-notification/src/props.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/progress-notification/src/progressNotification.vue2.mjs
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

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/progress-notification/index.mjs
var BoatProgressNotification = withInstall(_sfc_main4);

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/styleDependencies.mjs
var styleDependencies = {
  // 基础组件
  icon: [],
  button: [],
  // 依赖其他组件的组件
  notification: ["icon"],
  "progress-notification": ["notification", "button"]
};
function getAllDependencies(componentName) {
  const visited = /* @__PURE__ */ new Set();
  function collectDependencies(name) {
    if (visited.has(name)) return;
    visited.add(name);
    const deps = styleDependencies[name] || [];
    deps.forEach((dep) => collectDependencies(dep));
  }
  collectDependencies(componentName);
  visited.delete(componentName);
  return Array.from(visited);
}

// ../node_modules/.pnpm/@koihe+boat-ui@1.0.1_vue@3.5.13_typescript@5.4.2_/node_modules/@koihe/boat-ui/es/index.mjs
var components = [BoatIcon, BoatButton, BoatNotification, BoatProgressNotification];
function install(app) {
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var index = {
  install
};
export {
  BoatButton,
  BoatIcon,
  BoatNotification,
  BoatProgressNotification,
  boatButtonProps,
  boatNotificationProps,
  boatProgressNotificationProps,
  index as default,
  getAllDependencies,
  iconProps,
  install,
  styleDependencies
};
//# sourceMappingURL=@koihe_boat-ui.js.map
