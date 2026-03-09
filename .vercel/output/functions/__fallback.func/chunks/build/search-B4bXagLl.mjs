import { _ as __nuxt_component_0 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, b as useRouter } from './server.mjs';
import { u as useSeo } from './useSeo-D4-kwbcb.mjs';
import { u as useAsyncData, q as queryCollection } from './client-CAvuhvKp.mjs';
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
import './v3-B4aA5lVw.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'perfect-debounce';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HighlightedText",
  __ssrInlineRender: true,
  props: {
    text: {},
    query: {}
  },
  setup(__props) {
    const props = __props;
    const parts = computed(() => {
      const text = props.text || "";
      const query = (props.query || "").trim();
      if (!query) {
        return [{ value: text, highlight: false }];
      }
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "ig");
      return text.split(regex).filter(Boolean).map((value) => ({
        value,
        highlight: value.toLowerCase() === query.toLowerCase()
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)} data-v-fecd0a6e><!--[-->`);
      ssrRenderList(unref(parts), (part, index) => {
        _push(`<!--[-->`);
        if (part.highlight) {
          _push(`<mark class="highlight" data-v-fecd0a6e>${ssrInterpolate(part.value)}</mark>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(part.value)}<!--]-->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></span>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HighlightedText.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fecd0a6e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeo({
      title: "\u7AD9\u5185\u641C\u7D22",
      description: "\u641C\u7D22 OpenClawCN \u7684\u6587\u6863\u3001\u65B0\u95FB\u548C\u793E\u533A\u8D44\u6599\u3002",
      path: "/search"
    });
    const route = useRoute();
    const router = useRouter();
    const searchInput = ref(typeof route.query.q === "string" ? route.query.q : "");
    const { data: docs } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("search:docs", () => queryCollection("docs").all())), __temp = await __temp, __restore(), __temp);
    const { data: news } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("search:news", () => queryCollection("news").all())), __temp = await __temp, __restore(), __temp);
    const { data: bestPractices } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "search:best-practices",
      () => queryCollection("bestPractices").all()
    )), __temp = await __temp, __restore(), __temp);
    const normalizedQuery = computed(() => searchInput.value.trim().toLowerCase());
    const allItems = computed(() => {
      const docItems = (docs.value || []).map((item) => ({
        title: String(item.title || ""),
        description: String(item.description || ""),
        category: String(item.category || "\u6587\u6863"),
        path: String(item.path || ""),
        kind: "\u6587\u6863"
      }));
      const newsItems = (news.value || []).map((item) => ({
        title: String(item.title || ""),
        description: String(item.description || ""),
        category: String(item.category || "\u65B0\u95FB"),
        path: String(item.path || ""),
        kind: "\u65B0\u95FB"
      }));
      const practiceItems = (bestPractices.value || []).map((item) => ({
        title: String(item.title || ""),
        description: String(item.description || ""),
        category: String(item.category || "\u6700\u4F73\u5B9E\u8DF5"),
        path: String(item.path || ""),
        kind: "\u6700\u4F73\u5B9E\u8DF5"
      }));
      return [...docItems, ...newsItems, ...practiceItems];
    });
    const filteredItems = computed(() => {
      const keyword = normalizedQuery.value;
      if (!keyword) {
        return allItems.value;
      }
      return allItems.value.filter((item) => {
        const target = `${item.title} ${item.description} ${item.category} ${item.kind}`.toLowerCase();
        return target.includes(keyword);
      });
    });
    const hasQuery = computed(() => normalizedQuery.value.length > 0);
    watch(
      searchInput,
      (value) => {
        router.replace({
          query: value ? { q: value } : {}
        });
      },
      { flush: "post" }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_HighlightedText = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-2b4b0b29><div class="container" data-v-2b4b0b29><p class="eyebrow" data-v-2b4b0b29>Search</p><h1 class="section-title" data-v-2b4b0b29>\u7AD9\u5185\u641C\u7D22</h1><p class="section-copy" data-v-2b4b0b29> \u76EE\u524D\u5148\u6309\u6807\u9898\u3001\u63CF\u8FF0\u548C\u5206\u7C7B\u8FDB\u884C\u641C\u7D22\uFF0C\u8DB3\u591F\u8986\u76D6\u7B2C 2 \u6B65\u7684\u6587\u6863\u4E0E\u65B0\u95FB\u67E5\u627E\u9700\u6C42\u3002 </p><div class="card search-shell" data-v-2b4b0b29><label class="search-field" data-v-2b4b0b29><span data-v-2b4b0b29>\u5173\u952E\u8BCD</span><input${ssrRenderAttr("value", unref(searchInput))} type="text" placeholder="\u4F8B\u5982\uFF1A\u5B89\u88C5\u3001\u793E\u533A\u3001OpenClaw" data-v-2b4b0b29></label><p class="muted" data-v-2b4b0b29>\u5171\u627E\u5230 ${ssrInterpolate(unref(filteredItems).length)} \u6761\u7ED3\u679C</p></div>`);
      if (unref(filteredItems).length) {
        _push(`<div class="grid results" data-v-2b4b0b29><!--[-->`);
        ssrRenderList(unref(filteredItems), (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.path,
            to: item.path,
            class: "card result-card"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="tag" data-v-2b4b0b29${_scopeId}>${ssrInterpolate(item.kind)} / ${ssrInterpolate(item.category)}</span><h2 data-v-2b4b0b29${_scopeId}>`);
                _push2(ssrRenderComponent(_component_HighlightedText, {
                  text: item.title,
                  query: unref(searchInput)
                }, null, _parent2, _scopeId));
                _push2(`</h2><p data-v-2b4b0b29${_scopeId}>`);
                _push2(ssrRenderComponent(_component_HighlightedText, {
                  text: item.description,
                  query: unref(searchInput)
                }, null, _parent2, _scopeId));
                _push2(`</p>`);
              } else {
                return [
                  createVNode("span", { class: "tag" }, toDisplayString(item.kind) + " / " + toDisplayString(item.category), 1),
                  createVNode("h2", null, [
                    createVNode(_component_HighlightedText, {
                      text: item.title,
                      query: unref(searchInput)
                    }, null, 8, ["text", "query"])
                  ]),
                  createVNode("p", null, [
                    createVNode(_component_HighlightedText, {
                      text: item.description,
                      query: unref(searchInput)
                    }, null, 8, ["text", "query"])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(hasQuery)) {
        _push(`<div class="card empty-state" data-v-2b4b0b29><h2 data-v-2b4b0b29>\u6CA1\u6709\u627E\u5230\u5339\u914D\u7ED3\u679C</h2><p class="muted" data-v-2b4b0b29>\u53EF\u4EE5\u5C1D\u8BD5\u66F4\u77ED\u7684\u5173\u952E\u8BCD\uFF0C\u6216\u8005\u76F4\u63A5\u8FDB\u5165\u793E\u533A\u9875\u548C\u53CD\u9988\u9875\u544A\u8BC9\u6211\u4EEC\u4F60\u60F3\u627E\u4EC0\u4E48\u5185\u5BB9\u3002</p><div class="button-row" data-v-2b4b0b29>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "button secondary",
          to: "/community"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u67E5\u770B\u793E\u533A\u652F\u6301`);
            } else {
              return [
                createTextVNode("\u67E5\u770B\u793E\u533A\u652F\u6301")
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
              _push2(`\u63D0\u4EA4\u5185\u5BB9\u5EFA\u8BAE`);
            } else {
              return [
                createTextVNode("\u63D0\u4EA4\u5185\u5BB9\u5EFA\u8BAE")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b4b0b29"]]);

export { search as default };
//# sourceMappingURL=search-B4bXagLl.mjs.map
