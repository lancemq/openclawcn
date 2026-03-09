import { _ as _sfc_main$1 } from './ContentRenderer-ngyniZKn.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, g as createError } from './server.mjs';
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
    const pagePath = computed(() => `/news/${slug.value}`);
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `news:${slug.value}`,
      () => queryCollection("news").path(pagePath.value).first()
    )), __temp = await __temp, __restore(), __temp);
    const { data: relatedNews } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`news:related:${slug.value}`, async () => {
      const items = await queryCollection("news").all();
      return items.filter((item) => String(item.path) !== pagePath.value).slice(0, 3);
    })), __temp = await __temp, __restore(), __temp);
    const { data: relatedPractices } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`news:related-practices:${slug.value}`, async () => {
      const items = await queryCollection("bestPractices").all();
      return items.slice(0, 2);
    })), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u65B0\u95FB\u4E0D\u5B58\u5728"
      });
    }
    useSeo({
      title: page.value.title,
      description: page.value.description || "OpenClawCN \u65B0\u95FB\u9875\u9762",
      path: pagePath.value,
      type: "article",
      section: String(page.value.category || "\u7AD9\u70B9\u66F4\u65B0"),
      publishedTime: String(page.value.date || "")
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_ContentRenderer = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-26afa671><div class="container" data-v-26afa671><article class="card prose" data-v-26afa671><div class="news-meta" data-v-26afa671><span class="eyebrow" data-v-26afa671>${ssrInterpolate(((_a = unref(page)) == null ? void 0 : _a.category) || "\u52A8\u6001")}</span><span class="tag" data-v-26afa671>${ssrInterpolate((_b = unref(page)) == null ? void 0 : _b.date)}</span></div><h1 data-v-26afa671>${ssrInterpolate((_c = unref(page)) == null ? void 0 : _c.title)}</h1><p class="muted" data-v-26afa671>${ssrInterpolate((_d = unref(page)) == null ? void 0 : _d.description)}</p>`);
      if (unref(page)) {
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(page) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</article><section class="related-block" data-v-26afa671><div class="related-head" data-v-26afa671><h2 data-v-26afa671>\u7EE7\u7EED\u9605\u8BFB</h2><p class="muted" data-v-26afa671>\u770B\u5B8C\u8FD9\u6761\u52A8\u6001\u540E\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u8FDB\u5165\u76F8\u5173\u66F4\u65B0\u6216\u66F4\u7A33\u5B9A\u7684\u6700\u4F73\u5B9E\u8DF5\u4E13\u9898\u3002</p></div><div class="related-grid" data-v-26afa671><!--[-->`);
      ssrRenderList(unref(relatedNews), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: "card related-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tag" data-v-26afa671${_scopeId}>\u65B0\u95FB / ${ssrInterpolate(item.category)}</span><h3 data-v-26afa671${_scopeId}>${ssrInterpolate(item.title)}</h3><p data-v-26afa671${_scopeId}>${ssrInterpolate(item.description)}</p>`);
            } else {
              return [
                createVNode("span", { class: "tag" }, "\u65B0\u95FB / " + toDisplayString(item.category), 1),
                createVNode("h3", null, toDisplayString(item.title), 1),
                createVNode("p", null, toDisplayString(item.description), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(relatedPractices), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: "card related-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tag" data-v-26afa671${_scopeId}>\u6700\u4F73\u5B9E\u8DF5 / ${ssrInterpolate(item.category)}</span><h3 data-v-26afa671${_scopeId}>${ssrInterpolate(item.title)}</h3><p data-v-26afa671${_scopeId}>${ssrInterpolate(item.description)}</p>`);
            } else {
              return [
                createVNode("span", { class: "tag" }, "\u6700\u4F73\u5B9E\u8DF5 / " + toDisplayString(item.category), 1),
                createVNode("h3", null, toDisplayString(item.title), 1),
                createVNode("p", null, toDisplayString(item.description), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-26afa671"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-DxoObb3D.mjs.map
