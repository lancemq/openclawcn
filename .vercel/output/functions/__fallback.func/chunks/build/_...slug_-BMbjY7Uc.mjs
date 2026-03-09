import { _ as _sfc_main$1 } from './ContentRenderer-ngyniZKn.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRoute, g as createError } from './server.mjs';
import { u as useAsyncData, q as queryCollection } from './client-CAvuhvKp.mjs';
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
import 'property-information';
import 'minimark/hast';
import 'vue-router';
import 'perfect-debounce';
import './v3-B4aA5lVw.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => {
      const param = route.params.slug;
      return Array.isArray(param) ? param.join("/") : String(param || "");
    });
    const pagePath = computed(() => `/docs/${slug.value}`);
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `docs:${slug.value}`,
      () => queryCollection("docs").path(pagePath.value).first()
    )), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u6587\u6863\u4E0D\u5B58\u5728"
      });
    }
    useSeo({
      title: page.value.title,
      description: page.value.description || "OpenClawCN \u6587\u6863\u9875\u9762",
      path: pagePath.value
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ContentRenderer = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))}><div class="container"><article class="card prose"><p class="eyebrow">${ssrInterpolate(((_a = unref(page)) == null ? void 0 : _a.category) || "\u6587\u6863")}</p><h1>${ssrInterpolate((_b = unref(page)) == null ? void 0 : _b.title)}</h1><p class="muted">${ssrInterpolate((_c = unref(page)) == null ? void 0 : _c.description)}</p>`);
      if (unref(page)) {
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(page) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</article></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/docs/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-BMbjY7Uc.mjs.map
