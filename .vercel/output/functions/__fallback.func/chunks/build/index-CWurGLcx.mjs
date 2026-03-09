import { _ as __nuxt_component_0 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, b as useRouter } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const { data: items } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "best-practices:index",
      () => queryCollection("bestPractices").all()
    )), __temp = await __temp, __restore(), __temp);
    const selectedCategory = computed(() => typeof route.query.category === "string" ? route.query.category : "\u5168\u90E8");
    const selectedDifficulty = computed(
      () => typeof route.query.difficulty === "string" ? route.query.difficulty : "\u5168\u90E8"
    );
    const categories = computed(() => [
      "\u5168\u90E8",
      ...new Set((items.value || []).map((item) => String(item.category || "\u672A\u5206\u7C7B")))
    ]);
    const difficulties = computed(() => [
      "\u5168\u90E8",
      ...new Set((items.value || []).map((item) => String(item.difficulty || "\u672A\u5206\u7EA7")))
    ]);
    const filteredItems = computed(
      () => (items.value || []).filter((item) => {
        const categoryMatch = selectedCategory.value === "\u5168\u90E8" || String(item.category || "") === selectedCategory.value;
        const difficultyMatch = selectedDifficulty.value === "\u5168\u90E8" || String(item.difficulty || "") === selectedDifficulty.value;
        return categoryMatch && difficultyMatch;
      })
    );
    useSeo({
      title: "\u6700\u4F73\u5B9E\u8DF5",
      description: "\u67E5\u770B OpenClawCN \u5F53\u524D\u6574\u7406\u7684\u4E2D\u6587\u5185\u5BB9\u8FD0\u8425\u3001\u53CD\u9988\u95ED\u73AF\u548C\u7AD9\u70B9\u534F\u4F5C\u6700\u4F73\u5B9E\u8DF5\u3002",
      path: "/best-practices",
      type: "website"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-7d8abd39><div class="container" data-v-7d8abd39><p class="eyebrow" data-v-7d8abd39>Best Practices</p><h1 class="section-title" data-v-7d8abd39>\u6700\u4F73\u5B9E\u8DF5</h1><p class="section-copy" data-v-7d8abd39> \u8FD9\u662F\u7B2C 3 \u6B65\u5148\u843D\u4E0B\u6765\u7684\u7B2C\u4E00\u5757\u5185\u5BB9\uFF1A\u628A\u4E2D\u6587\u7AD9\u70B9\u8FD0\u8425\u3001\u53CD\u9988\u95ED\u73AF\u548C\u793E\u533A\u534F\u4F5C\u4E2D\u6BD4\u8F83\u7A33\u5B9A\u7684\u65B9\u6CD5\u5148\u6574\u7406\u6210\u4E13\u9898\u3002 </p><div class="filters card" data-v-7d8abd39><div class="filter-group" data-v-7d8abd39><span class="filter-label" data-v-7d8abd39>\u5206\u7C7B</span><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: unref(selectedCategory) === category }, "filter-chip"])}" data-v-7d8abd39>${ssrInterpolate(category)}</button>`);
      });
      _push(`<!--]--></div><div class="filter-group" data-v-7d8abd39><span class="filter-label" data-v-7d8abd39>\u96BE\u5EA6</span><!--[-->`);
      ssrRenderList(unref(difficulties), (difficulty) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: unref(selectedDifficulty) === difficulty }, "filter-chip"])}" data-v-7d8abd39>${ssrInterpolate(difficulty)}</button>`);
      });
      _push(`<!--]--></div></div><div class="grid practice-grid" data-v-7d8abd39><!--[-->`);
      ssrRenderList(unref(filteredItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: "card practice-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tag" data-v-7d8abd39${_scopeId}>${ssrInterpolate(item.category)} / ${ssrInterpolate(item.difficulty)}</span><h2 data-v-7d8abd39${_scopeId}>${ssrInterpolate(item.title)}</h2><p data-v-7d8abd39${_scopeId}>${ssrInterpolate(item.description)}</p>`);
            } else {
              return [
                createVNode("span", { class: "tag" }, toDisplayString(item.category) + " / " + toDisplayString(item.difficulty), 1),
                createVNode("h2", null, toDisplayString(item.title), 1),
                createVNode("p", null, toDisplayString(item.description), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/best-practices/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d8abd39"]]);

export { index as default };
//# sourceMappingURL=index-CWurGLcx.mjs.map
