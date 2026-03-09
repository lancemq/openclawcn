import { _ as __nuxt_component_0 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSeo } from './useSeo-D4-kwbcb.mjs';
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
import './server.mjs';
import 'vue-router';
import './v3-B4aA5lVw.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "404",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo({
      title: "\u9875\u9762\u4E0D\u5B58\u5728",
      description: "\u8BF7\u6C42\u7684\u9875\u9762\u4E0D\u5B58\u5728\uFF0C\u8BF7\u8FD4\u56DE OpenClawCN \u9996\u9875\u7EE7\u7EED\u6D4F\u89C8\u3002",
      path: "/404"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))}><div class="container"><div class="card prose"><p class="eyebrow">404</p><h1>\u9875\u9762\u4E0D\u5B58\u5728</h1><p class="muted">\u5F53\u524D\u94FE\u63A5\u6CA1\u6709\u5BF9\u5E94\u5185\u5BB9\uFF0C\u8BF7\u8FD4\u56DE\u9996\u9875\u6216\u8FDB\u5165\u6587\u6863\u4E2D\u5FC3\u3002</p><div class="button-row">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button primary",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD4\u56DE\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u8FD4\u56DE\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button secondary",
        to: "/docs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u67E5\u770B\u6587\u6863`);
          } else {
            return [
              createTextVNode("\u67E5\u770B\u6587\u6863")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=404-mnKENhxS.mjs.map
