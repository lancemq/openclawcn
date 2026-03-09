import { _ as __nuxt_component_0 } from './ContentCard-Cbc3QbGi.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { d as docsOverview } from './site-AI3xcTqu.mjs';
import { u as useSeo } from './useSeo-D4-kwbcb.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-BUCtmSji.mjs';
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
import './v3-B4aA5lVw.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo({
      title: "\u6587\u6863\u4E2D\u5FC3",
      description: "OpenClaw \u4E2D\u6587\u6587\u6863\u5165\u53E3\uFF0C\u5305\u542B\u5FEB\u901F\u5165\u95E8\u3001\u5B89\u88C5\u8BF4\u660E\u548C\u793E\u533A\u652F\u6301\u3002",
      path: "/docs"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentCard = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-e982aca9><div class="container" data-v-e982aca9><p class="eyebrow" data-v-e982aca9>Documentation</p><h1 class="section-title" data-v-e982aca9>\u6587\u6863\u4E2D\u5FC3</h1><p class="section-copy" data-v-e982aca9> \u7B2C 1 \u6B65\u5148\u4EA4\u4ED8\u53EF\u8BBF\u95EE\u7684\u6587\u6863\u76EE\u5F55\uFF0C\u6838\u5FC3\u8986\u76D6\u5FEB\u901F\u5165\u95E8\u3001\u5B89\u88C5\u51C6\u5907\u548C\u793E\u533A\u652F\u6301\u3002 </p><div class="grid docs-grid" data-v-e982aca9><!--[-->`);
      ssrRenderList(unref(docsOverview), (item) => {
        _push(ssrRenderComponent(_component_ContentCard, {
          key: item.to,
          title: item.title,
          description: item.description,
          to: item.to,
          meta: item.meta
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/docs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e982aca9"]]);

export { index as default };
//# sourceMappingURL=index-Cm1LjOTe.mjs.map
