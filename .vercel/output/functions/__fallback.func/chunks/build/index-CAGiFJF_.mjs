import { _ as __nuxt_component_0 } from './ContentCard-Cbc3QbGi.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, b as useRouter } from './server.mjs';
import { u as useAsyncData, q as queryCollection } from './client-CAvuhvKp.mjs';
import { u as useSeo } from './useSeo-D4-kwbcb.mjs';
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
    const { data: items } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("news:index", () => queryCollection("news").all())), __temp = await __temp, __restore(), __temp);
    const selectedCategory = computed(() => typeof route.query.category === "string" ? route.query.category : "\u5168\u90E8");
    const selectedArchive = computed(() => typeof route.query.archive === "string" ? route.query.archive : "\u5168\u90E8");
    const categories = computed(() => [
      "\u5168\u90E8",
      ...new Set((items.value || []).map((item) => String(item.category || "\u672A\u5206\u7C7B")))
    ]);
    const archives = computed(() => [
      "\u5168\u90E8",
      ...new Set((items.value || []).map((item) => String(item.date || "").slice(0, 7)))
    ]);
    const filteredItems = computed(
      () => (items.value || []).filter((item) => {
        const categoryMatch = selectedCategory.value === "\u5168\u90E8" || String(item.category || "") === selectedCategory.value;
        const archiveMatch = selectedArchive.value === "\u5168\u90E8" || String(item.date || "").startsWith(selectedArchive.value);
        return categoryMatch && archiveMatch;
      })
    );
    useSeo({
      title: "\u65B0\u95FB\u52A8\u6001",
      description: "OpenClawCN \u9879\u76EE\u52A8\u6001\u4E0E\u91CC\u7A0B\u7891\u8BB0\u5F55\uFF0C\u5F53\u524D\u805A\u7126\u5B98\u7F51 MVP \u548C\u4E2D\u6587\u5185\u5BB9\u5EFA\u8BBE\u3002",
      path: "/news",
      type: "website"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentCard = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-7b2acb76><div class="container" data-v-7b2acb76><p class="eyebrow" data-v-7b2acb76>News</p><h1 class="section-title" data-v-7b2acb76>\u65B0\u95FB\u52A8\u6001</h1><p class="section-copy" data-v-7b2acb76> \u7B2C 1 \u6B65\u7528\u6700\u5C0F\u65B0\u95FB\u4F53\u7CFB\u8BB0\u5F55\u9636\u6BB5\u63A8\u8FDB\uFF0C\u540E\u7EED\u53EF\u4EE5\u76F4\u63A5\u6269\u5C55\u4E3A\u5B8C\u6574\u535A\u5BA2\u548C\u66F4\u65B0\u65E5\u5FD7\u3002 </p><div class="filters card" data-v-7b2acb76><div class="filter-group" data-v-7b2acb76><span class="filter-label" data-v-7b2acb76>\u5206\u7C7B</span><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: unref(selectedCategory) === category }, "filter-chip"])}" data-v-7b2acb76>${ssrInterpolate(category)}</button>`);
      });
      _push(`<!--]--></div><div class="filter-group" data-v-7b2acb76><span class="filter-label" data-v-7b2acb76>\u5F52\u6863</span><!--[-->`);
      ssrRenderList(unref(archives), (archive) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: unref(selectedArchive) === archive }, "filter-chip"])}" data-v-7b2acb76>${ssrInterpolate(archive)}</button>`);
      });
      _push(`<!--]--></div></div><div class="grid news-grid" data-v-7b2acb76><!--[-->`);
      ssrRenderList(unref(filteredItems), (item) => {
        _push(ssrRenderComponent(_component_ContentCard, {
          key: item.to,
          title: String(item.title || ""),
          description: String(item.description || ""),
          to: String(item.path || ""),
          meta: `${item.date} / ${item.category}`
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b2acb76"]]);

export { index as default };
//# sourceMappingURL=index-CAGiFJF_.mjs.map
