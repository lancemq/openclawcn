import { _ as _sfc_main$1 } from './ContentRenderer-ngyniZKn.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
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
    const pagePath = computed(() => `/best-practices/${slug.value}`);
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `best-practices:${slug.value}`,
      () => queryCollection("bestPractices").path(pagePath.value).first()
    )), __temp = await __temp, __restore(), __temp);
    const { data: relatedPractices } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`best-practices:related:${slug.value}`, async () => {
      const items = await queryCollection("bestPractices").all();
      return items.filter((item) => String(item.path) !== pagePath.value).slice(0, 3);
    })), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u6700\u4F73\u5B9E\u8DF5\u4E0D\u5B58\u5728"
      });
    }
    useSeo({
      title: page.value.title,
      description: page.value.description || "OpenClawCN \u6700\u4F73\u5B9E\u8DF5\u9875\u9762",
      path: pagePath.value,
      type: "article",
      section: String(page.value.category || "\u6700\u4F73\u5B9E\u8DF5")
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_ContentRenderer = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-ebd9d348><div class="container" data-v-ebd9d348><article class="card prose" data-v-ebd9d348><div class="practice-meta" data-v-ebd9d348><span class="eyebrow" data-v-ebd9d348>${ssrInterpolate(((_a = unref(page)) == null ? void 0 : _a.category) || "\u6700\u4F73\u5B9E\u8DF5")}</span><span class="tag" data-v-ebd9d348>${ssrInterpolate((_b = unref(page)) == null ? void 0 : _b.difficulty)}</span></div><h1 data-v-ebd9d348>${ssrInterpolate((_c = unref(page)) == null ? void 0 : _c.title)}</h1><p class="muted" data-v-ebd9d348>${ssrInterpolate((_d = unref(page)) == null ? void 0 : _d.description)}</p>`);
      if (unref(page)) {
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(page) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</article><section class="related-block" data-v-ebd9d348><div class="related-head" data-v-ebd9d348><h2 data-v-ebd9d348>\u7EE7\u7EED\u6DF1\u5165</h2><p class="muted" data-v-ebd9d348>\u5982\u679C\u8FD9\u7BC7\u5B9E\u8DF5\u5BF9\u4F60\u6709\u5E2E\u52A9\uFF0C\u4E0B\u4E00\u6B65\u53EF\u4EE5\u7EE7\u7EED\u770B\u76F8\u5173\u4E13\u9898\uFF0C\u6216\u8005\u76F4\u63A5\u8FDB\u5165\u53CD\u9988\u4E0E\u793E\u533A\u5165\u53E3\u3002</p></div><div class="cta-row" data-v-ebd9d348>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button secondary",
        to: "/community"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FDB\u5165\u793E\u533A\u652F\u6301`);
          } else {
            return [
              createTextVNode("\u8FDB\u5165\u793E\u533A\u652F\u6301")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button ghost",
        to: "/feedback"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u63D0\u4EA4\u53CD\u9988`);
          } else {
            return [
              createTextVNode("\u63D0\u4EA4\u53CD\u9988")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="related-grid" data-v-ebd9d348><!--[-->`);
      ssrRenderList(unref(relatedPractices), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: "card related-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tag" data-v-ebd9d348${_scopeId}>${ssrInterpolate(item.category)} / ${ssrInterpolate(item.difficulty)}</span><h3 data-v-ebd9d348${_scopeId}>${ssrInterpolate(item.title)}</h3><p data-v-ebd9d348${_scopeId}>${ssrInterpolate(item.description)}</p>`);
            } else {
              return [
                createVNode("span", { class: "tag" }, toDisplayString(item.category) + " / " + toDisplayString(item.difficulty), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/best-practices/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ebd9d348"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-CmC3SB7B.mjs.map
