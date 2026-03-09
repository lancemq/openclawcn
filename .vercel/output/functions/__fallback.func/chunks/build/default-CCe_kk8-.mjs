import { _ as __nuxt_component_0$1 } from './nuxt-link-BUCtmSji.mjs';
import { mergeProps, defineComponent, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, u as useRuntimeConfig } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';
import 'node:url';
import 'ipx';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const navItems = [
      { label: "\u9996\u9875", to: "/" },
      { label: "\u6587\u6863", to: "/docs" },
      { label: "\u5B9E\u8DF5", to: "/best-practices" },
      { label: "\u65B0\u95FB", to: "/news" },
      { label: "\u793E\u533A", to: "/community" },
      { label: "\u641C\u7D22", to: "/search" }
    ];
    const { public: publicConfig } = useRuntimeConfig();
    function isActive(to) {
      if (to === "/") {
        return route.path === "/";
      }
      return route.path === to || route.path.startsWith(`${to}/`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-bf73f979><div class="container header-inner" data-v-bf73f979>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "brand",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="brand-mark" data-v-bf73f979${_scopeId}>OC</span><span class="brand-copy" data-v-bf73f979${_scopeId}><strong data-v-bf73f979${_scopeId}>OpenClawCN</strong><small data-v-bf73f979${_scopeId}>\u4E2D\u6587\u5B98\u7F51 MVP</small></span>`);
          } else {
            return [
              createVNode("span", { class: "brand-mark" }, "OC"),
              createVNode("span", { class: "brand-copy" }, [
                createVNode("strong", null, "OpenClawCN"),
                createVNode("small", null, "\u4E2D\u6587\u5B98\u7F51 MVP")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav" aria-label="\u4E3B\u5BFC\u822A" data-v-bf73f979><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["nav-link", { active: isActive(item.to) }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="header-actions" data-v-bf73f979><a class="button secondary compact"${ssrRenderAttr("href", unref(publicConfig).githubUrl)} target="_blank" rel="noreferrer" data-v-bf73f979> GitHub </a></div></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bf73f979"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-f072b34b><div class="container footer-grid" data-v-f072b34b><div data-v-f072b34b><p class="eyebrow" data-v-f072b34b>OpenClawCN</p><p class="footer-copy" data-v-f072b34b> \u9762\u5411\u4E2D\u6587\u7528\u6237\u7684 OpenClaw \u65B0\u95FB\u3001\u6587\u6863\u3001\u6700\u4F73\u5B9E\u8DF5\u4E0E\u793E\u533A\u652F\u6301\u5165\u53E3\u3002 </p></div><div data-v-f072b34b><h3 data-v-f072b34b>\u5185\u5BB9</h3><ul data-v-f072b34b><li data-v-f072b34b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/docs" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6587\u6863`);
          } else {
            return [
              createTextVNode("\u6587\u6863")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f072b34b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/best-practices" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6700\u4F73\u5B9E\u8DF5`);
          } else {
            return [
              createTextVNode("\u6700\u4F73\u5B9E\u8DF5")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f072b34b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/news" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u65B0\u95FB`);
          } else {
            return [
              createTextVNode("\u65B0\u95FB")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f072b34b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/community" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u793E\u533A\u652F\u6301`);
          } else {
            return [
              createTextVNode("\u793E\u533A\u652F\u6301")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f072b34b>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/search" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u7AD9\u5185\u641C\u7D22`);
          } else {
            return [
              createTextVNode("\u7AD9\u5185\u641C\u7D22")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div data-v-f072b34b><h3 data-v-f072b34b>\u9636\u6BB5\u72B6\u6001</h3><ul data-v-f072b34b><li data-v-f072b34b>\u7B2C 1 \u6B65\uFF1AMVP \u5DF2\u5B9E\u73B0</li><li data-v-f072b34b>\u7B2C 2 \u6B65\uFF1A\u641C\u7D22\u4E0E\u53CD\u9988\u5F00\u53D1\u4E2D</li><li data-v-f072b34b>\u7B2C 3 \u6B65\uFF1A\u8FD0\u8425\u589E\u5F3A\u5F85\u5F00\u53D1</li></ul></div></div><div class="container footer-bottom" data-v-f072b34b><span data-v-f072b34b>\xA9 ${ssrInterpolate(unref(year))} OpenClawCN</span><span data-v-f072b34b>\u9762\u5411\u4E2D\u6587\u7528\u6237\u7684 OpenClaw \u4ECB\u7ECD\u7AD9\u70B9</span></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f072b34b"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "site-shell" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CCe_kk8-.mjs.map
