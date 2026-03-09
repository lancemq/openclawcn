import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeo } from './useSeo-D4-kwbcb.mjs';
import { _ as _export_sfc } from './server.mjs';
import './v3-B4aA5lVw.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo({
      title: "\u5E38\u89C1\u95EE\u9898",
      description: "\u67E5\u770B OpenClawCN \u5F53\u524D\u6574\u7406\u7684\u5E38\u89C1\u95EE\u9898\u4E0E\u5EFA\u8BAE\u9605\u8BFB\u8DEF\u5F84\u3002",
      path: "/faq"
    });
    const faqs = [
      {
        question: "\u7B2C\u4E00\u6B21\u8BBF\u95EE\u5E94\u8BE5\u4ECE\u54EA\u91CC\u5F00\u59CB\uFF1F",
        answer: "\u5EFA\u8BAE\u5148\u770B\u5FEB\u901F\u5165\u95E8\uFF0C\u518D\u770B\u5B89\u88C5\u4E0E\u73AF\u5883\uFF0C\u6700\u540E\u6309\u9700\u6C42\u8FDB\u5165\u65B0\u95FB\u6216\u793E\u533A\u652F\u6301\u3002"
      },
      {
        question: "\u5982\u679C\u4E2D\u6587\u8D44\u6599\u4E0D\u5B8C\u6574\u600E\u4E48\u529E\uFF1F",
        answer: "\u53EF\u4EE5\u5148\u5728\u7AD9\u5185\u641C\u7D22\u5DF2\u6709\u5185\u5BB9\uFF0C\u4ECD\u7136\u6CA1\u6709\u7684\u8BDD\u76F4\u63A5\u63D0\u4EA4\u53CD\u9988\u3002"
      },
      {
        question: "\u7AD9\u70B9\u95EE\u9898\u548C OpenClaw \u672C\u4F53\u95EE\u9898\u600E\u4E48\u533A\u5206\uFF1F",
        answer: "\u7AD9\u70B9\u6392\u7248\u3001\u94FE\u63A5\u3001\u641C\u7D22\u7B49\u5F52\u7AD9\u70B9\u95EE\u9898\uFF1B\u529F\u80FD\u4F7F\u7528\u3001\u5B89\u88C5\u548C\u80FD\u529B\u8FB9\u754C\u66F4\u9002\u5408\u8FDB\u5165\u6587\u6863\u6216 GitHub\u3002"
      },
      {
        question: "\u793E\u533A\u5165\u53E3\u76EE\u524D\u6709\u54EA\u4E9B\uFF1F",
        answer: "\u5F53\u524D\u4EE5 GitHub\u3001\u7AD9\u5185\u53CD\u9988\u548C\u793E\u533A\u652F\u6301\u9875\u4E3A\u4E3B\uFF0C\u540E\u7EED\u4F1A\u9010\u6B65\u8865\u5145\u66F4\u591A\u4E2D\u6587\u4EA4\u6D41\u6E20\u9053\u3002"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-524ff538><div class="container" data-v-524ff538><p class="eyebrow" data-v-524ff538>FAQ</p><h1 class="section-title" data-v-524ff538>\u5E38\u89C1\u95EE\u9898</h1><p class="section-copy" data-v-524ff538> \u8FD9\u662F\u7B2C 2 \u6B65\u8865\u9F50\u7684 FAQ \u9875\u9762\uFF0C\u7528\u6765\u627F\u63A5\u7528\u6237\u6700\u5E38\u89C1\u7684\u201C\u5148\u770B\u54EA\u91CC\u201D\u201C\u600E\u4E48\u53CD\u9988\u201D\u201C\u53BB\u54EA\u91CC\u63D0\u95EE\u201D\u8FD9\u7C7B\u95EE\u9898\u3002 </p><div class="grid faq-grid" data-v-524ff538><!--[-->`);
      ssrRenderList(faqs, (faq2) => {
        _push(`<article class="card faq-card" data-v-524ff538><h2 data-v-524ff538>${ssrInterpolate(faq2.question)}</h2><p data-v-524ff538>${ssrInterpolate(faq2.answer)}</p></article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-524ff538"]]);

export { faq as default };
//# sourceMappingURL=faq-DtSELd3i.mjs.map
