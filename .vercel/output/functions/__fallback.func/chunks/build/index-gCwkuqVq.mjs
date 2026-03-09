import { _ as __nuxt_component_0$2 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, unref, mergeProps, withCtx, createTextVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './ContentCard-Cbc3QbGi.mjs';
import { d as docsOverview, n as newsOverview, b as bestPracticeOverview, a as actionOverview } from './site-AI3xcTqu.mjs';
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
import './v3-B4aA5lVw.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { public: publicConfig } = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero section" }, _attrs))} data-v-13656caa><div class="container hero-grid" data-v-13656caa><div class="hero-copy-column" data-v-13656caa><p class="eyebrow" data-v-13656caa>OpenClaw \u4E2D\u6587\u5B98\u7F51</p><h1 class="hero-title" data-v-13656caa>\u8BA9\u4E2D\u6587\u7528\u6237\u66F4\u5FEB\u7406\u89E3 OpenClaw\uFF0C\u5E76\u627E\u5230\u6E05\u6670\u7684\u4E2D\u6587\u8D44\u6599\u5165\u53E3\u3002</h1><p class="hero-copy" data-v-13656caa> \u8FD9\u4E2A MVP \u805A\u7126\u4E09\u4E2A\u52A8\u4F5C\uFF1A\u5FEB\u901F\u770B\u61C2 OpenClaw\u3001\u5FEB\u901F\u627E\u5230\u4E2D\u6587\u6587\u6863\u3001\u5FEB\u901F\u8FDB\u5165\u793E\u533A\u4E0E\u66F4\u65B0\u52A8\u6001\u3002 </p><div class="button-row" data-v-13656caa>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button primary",
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
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button secondary",
        to: "/news"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6D4F\u89C8\u6700\u65B0\u52A8\u6001`);
          } else {
            return [
              createTextVNode("\u6D4F\u89C8\u6700\u65B0\u52A8\u6001")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="button ghost"${ssrRenderAttr("href", unref(publicConfig).githubUrl)} target="_blank" rel="noreferrer" data-v-13656caa> \u67E5\u770B GitHub </a></div><div class="hero-tags" data-v-13656caa><span class="tag" data-v-13656caa>\u4E2D\u6587\u6559\u7A0B</span><span class="tag" data-v-13656caa>\u5B89\u88C5\u6307\u5F15</span><span class="tag" data-v-13656caa>\u793E\u533A\u5165\u53E3</span><span class="tag" data-v-13656caa>\u6700\u65B0\u52A8\u6001</span></div></div><div class="hero-panel card" data-v-13656caa><div class="hero-panel-header" data-v-13656caa><span data-v-13656caa>Editorial Frame</span><span class="status" data-v-13656caa>Live Structure</span></div><div class="hero-stats" data-v-13656caa><div data-v-13656caa><strong data-v-13656caa>Docs</strong><span data-v-13656caa>\u4E2D\u6587\u6587\u6863\u5165\u53E3</span></div><div data-v-13656caa><strong data-v-13656caa>News</strong><span data-v-13656caa>\u6301\u7EED\u66F4\u65B0\u52A8\u6001</span></div><div data-v-13656caa><strong data-v-13656caa>Community</strong><span data-v-13656caa>\u96C6\u4E2D\u793E\u533A\u652F\u6301</span></div></div><ol class="timeline" data-v-13656caa><li data-v-13656caa><strong data-v-13656caa>\u5EFA\u7ACB\u4E2D\u6587\u5B98\u7F51\u5165\u53E3</strong><p data-v-13656caa>\u9996\u9875\u3001\u6587\u6863\u548C\u65B0\u95FB\u5217\u8868\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u3002</p></li><li data-v-13656caa><strong data-v-13656caa>\u8865\u9F50\u4E2D\u6587\u8D44\u6599\u7ED3\u6784</strong><p data-v-13656caa>\u5B89\u88C5\u3001\u6982\u5FF5\u3001\u793E\u533A\u4E0E\u52A8\u6001\u5165\u53E3\u6E05\u6670\u53EF\u89C1\u3002</p></li><li data-v-13656caa><strong data-v-13656caa>\u51C6\u5907\u540E\u7EED\u6269\u5C55</strong><p data-v-13656caa>\u4E3A\u641C\u7D22\u3001\u53CD\u9988\u3001\u6700\u4F73\u5B9E\u8DF5\u548C\u793E\u533A\u4E92\u52A8\u9884\u7559\u7ED3\u6784\u3002</p></li></ol></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-13656caa"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FeatureGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const features = [
      {
        title: "\u4E2D\u6587\u5185\u5BB9\u4F18\u5148",
        description: "\u9996\u9875\u3001\u6587\u6863\u3001\u65B0\u95FB\u5168\u90E8\u6309\u4E2D\u6587\u9605\u8BFB\u4E60\u60EF\u7EC4\u7EC7\uFF0C\u964D\u4F4E\u521D\u6B21\u7406\u89E3\u95E8\u69DB\u3002"
      },
      {
        title: "\u4ECB\u7ECD\u7AD9\u70B9\u4F18\u5148",
        description: "\u7AD9\u70B9\u5BF9\u5916\u91CD\u70B9\u662F\u4ECB\u7ECD OpenClaw \u672C\u8EAB\uFF0C\u800C\u4E0D\u662F\u4ECB\u7ECD\u672C\u7AD9\u5982\u4F55\u90E8\u7F72\u3002"
      },
      {
        title: "Markdown \u9A71\u52A8",
        description: "\u65B0\u95FB\u3001\u6559\u7A0B\u548C\u6700\u4F73\u5B9E\u8DF5\u90FD\u53EF\u4EE5\u6309\u5185\u5BB9\u6587\u4EF6\u6301\u7EED\u6269\u5145\uFF0C\u4E0D\u5148\u4F9D\u8D56\u540E\u53F0\u3002"
      },
      {
        title: "\u53EF\u6301\u7EED\u6269\u5C55",
        description: "\u7B2C 1 \u6B65\u5148\u4EA4\u4ED8\u53EF\u8BBF\u95EE MVP\uFF0C\u7B2C 2 \u6B65\u518D\u9010\u6B65\u5F15\u5165\u641C\u7D22\u3001\u53CD\u9988\u548C\u793E\u533A\u80FD\u529B\u3002"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-c7ef1737><div class="container" data-v-c7ef1737><p class="eyebrow" data-v-c7ef1737>\u6838\u5FC3\u4EF7\u503C</p><h2 class="section-title" data-v-c7ef1737>\u7B2C\u4E00\u9636\u6BB5\u5148\u89E3\u51B3\u53EF\u4E0A\u7EBF\u3001\u53EF\u9605\u8BFB\u3001\u53EF\u9884\u89C8\u3002</h2><p class="section-copy" data-v-c7ef1737> \u8FD9\u4E2A\u9636\u6BB5\u4E0D\u8FFD\u6C42\u5927\u800C\u5168\uFF0C\u800C\u662F\u5148\u628A\u5B98\u7F51\u5185\u5BB9\u7ED3\u6784\u3001\u9875\u9762\u5C42\u7EA7\u548C\u4E2D\u6587\u4FE1\u606F\u8868\u8FBE\u505A\u5BF9\u3002 </p><div class="feature-grid" data-v-c7ef1737><!--[-->`);
      ssrRenderList(features, (feature, index2) => {
        _push(`<article class="card feature-card" data-v-c7ef1737><span class="feature-index" data-v-c7ef1737>0${ssrInterpolate(index2 + 1)}</span><h3 data-v-c7ef1737>${ssrInterpolate(feature.title)}</h3><p data-v-c7ef1737>${ssrInterpolate(feature.description)}</p></article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeatureGrid.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c7ef1737"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-1070eeef><div class="container quick-start card" data-v-1070eeef><div data-v-1070eeef><p class="eyebrow" data-v-1070eeef>5 \u5206\u949F\u5FEB\u901F\u5F00\u59CB</p><h2 class="section-title" data-v-1070eeef>\u5148\u7406\u89E3 OpenClaw\uFF0C\u518D\u5F00\u59CB\u4E2D\u6587\u8D44\u6599\u7AD9\u70B9\u7684\u4F7F\u7528\u4E0E\u7EF4\u62A4\u3002</h2></div><div class="steps" data-v-1070eeef><div class="step" data-v-1070eeef><span class="step-number" data-v-1070eeef>1</span><div data-v-1070eeef><h3 data-v-1070eeef>\u5B89\u88C5\u4F9D\u8D56</h3><pre data-v-1070eeef><code data-v-1070eeef>npm install</code></pre></div></div><div class="step" data-v-1070eeef><span class="step-number" data-v-1070eeef>2</span><div data-v-1070eeef><h3 data-v-1070eeef>\u672C\u5730\u8FD0\u884C</h3><pre data-v-1070eeef><code data-v-1070eeef>npm run dev</code></pre></div></div><div class="step" data-v-1070eeef><span class="step-number" data-v-1070eeef>3</span><div data-v-1070eeef><h3 data-v-1070eeef>\u7EE7\u7EED\u67E5\u770B\u6587\u6863\u4E0E\u65B0\u95FB</h3><pre data-v-1070eeef><code data-v-1070eeef>npm run build</code></pre></div></div></div></div></section>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuickStartSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1070eeef"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ContentSpotlight",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      "\u4EC0\u4E48\u662F OpenClaw\uFF0C\u4EE5\u53CA\u5B83\u9002\u5408\u54EA\u4E9B\u7528\u6237",
      "\u5B89\u88C5\u3001\u914D\u7F6E\u548C\u57FA\u7840\u6982\u5FF5\u5E94\u8BE5\u5982\u4F55\u5206\u5C42\u7EC4\u7EC7",
      "\u4E2D\u6587\u793E\u533A\u3001GitHub \u548C\u95EE\u9898\u53CD\u9988\u5165\u53E3\u5982\u4F55\u96C6\u4E2D\u5C55\u793A",
      "\u65B0\u95FB\u3001\u6559\u7A0B\u548C\u6700\u4F73\u5B9E\u8DF5\u5982\u4F55\u6301\u7EED\u6269\u5145"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-ce850a44><div class="container spotlight" data-v-ce850a44><div data-v-ce850a44><p class="eyebrow" data-v-ce850a44>\u5185\u5BB9\u7ED3\u6784</p><h2 class="section-title" data-v-ce850a44>\u5148\u628A\u4E2D\u6587\u7528\u6237\u771F\u6B63\u4F1A\u627E\u7684\u5185\u5BB9\u6446\u5728\u524D\u9762\u3002</h2><p class="section-copy" data-v-ce850a44> \u9996\u9875\u7684\u76EE\u6807\u662F\u8BF4\u660E OpenClaw \u662F\u4EC0\u4E48\u3001\u80FD\u505A\u4EC0\u4E48\u3001\u5982\u4F55\u5F00\u59CB\uFF0C\u4EE5\u53CA\u4E2D\u6587\u7528\u6237\u63A5\u4E0B\u6765\u5E94\u8BE5\u53BB\u54EA\u91CC\u7EE7\u7EED\u4E86\u89E3\u3002 </p><div class="button-row" data-v-ce850a44>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "button primary",
        to: "/docs/getting-started"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u5F00\u59CB\u4E86\u89E3 OpenClaw`);
          } else {
            return [
              createTextVNode("\u5F00\u59CB\u4E86\u89E3 OpenClaw")
            ];
          }
        }),
        _: 1
      }, _parent));
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
      _push(`</div></div><div class="card" data-v-ce850a44><ul class="spotlight-list" data-v-ce850a44><!--[-->`);
      ssrRenderList(items, (item) => {
        _push(`<li data-v-ce850a44>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentSpotlight.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ce850a44"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SubscribeForm",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const pending = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "subscribe-form" }, _attrs))} data-v-4d325e1a><label class="subscribe-field" data-v-4d325e1a><span data-v-4d325e1a>\u90AE\u7BB1\u8BA2\u9605</span><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="\u8F93\u5165\u90AE\u7BB1\uFF0C\u63A5\u6536\u540E\u7EED\u66F4\u65B0" data-v-4d325e1a></label><button class="button primary" type="submit"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""} data-v-4d325e1a>${ssrInterpolate(unref(pending) ? "\u63D0\u4EA4\u4E2D..." : "\u8BA2\u9605\u66F4\u65B0")}</button>`);
      if (unref(successMessage)) {
        _push(`<p class="notice success" data-v-4d325e1a>${ssrInterpolate(unref(successMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<p class="notice error" data-v-4d325e1a>${ssrInterpolate(unref(errorMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SubscribeForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4d325e1a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo({
      title: "OpenClaw \u4E2D\u6587\u5B98\u7F51",
      description: "\u9762\u5411\u4E2D\u6587\u7528\u6237\u7684 OpenClaw \u5B98\u7F51 MVP\uFF0C\u5305\u542B\u65B0\u95FB\u3001\u6587\u6863\u548C\u793E\u533A\u652F\u6301\u5165\u53E3\u3002",
      path: "/",
      type: "website"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSection = __nuxt_component_0;
      const _component_FeatureGrid = __nuxt_component_1;
      const _component_QuickStartSection = __nuxt_component_2;
      const _component_ContentSpotlight = __nuxt_component_3;
      const _component_ContentCard = __nuxt_component_0$1;
      const _component_SubscribeForm = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-fec01c39>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(ssrRenderComponent(_component_FeatureGrid, null, null, _parent));
      _push(ssrRenderComponent(_component_QuickStartSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ContentSpotlight, null, null, _parent));
      _push(`<section class="section" data-v-fec01c39><div class="container" data-v-fec01c39><p class="eyebrow" data-v-fec01c39>\u6587\u6863\u5165\u53E3</p><h2 class="section-title" data-v-fec01c39>\u4ECE\u6587\u6863\u548C\u65B0\u95FB\u5F00\u59CB\u9A8C\u8BC1\u7AD9\u70B9\u4EF7\u503C\u3002</h2><div class="grid two-up" data-v-fec01c39><!--[-->`);
      ssrRenderList(unref(docsOverview), (item) => {
        _push(ssrRenderComponent(_component_ContentCard, {
          key: item.to,
          title: item.title,
          description: item.description,
          to: item.to,
          meta: item.meta
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section><section class="section" data-v-fec01c39><div class="container" data-v-fec01c39><p class="eyebrow" data-v-fec01c39>\u6700\u65B0\u52A8\u6001</p><h2 class="section-title" data-v-fec01c39>\u7B2C\u4E00\u9636\u6BB5\u7684\u53D8\u66F4\u5148\u7528\u65B0\u95FB\u5217\u8868\u6C89\u6DC0\u3002</h2><div class="grid two-up" data-v-fec01c39><!--[-->`);
      ssrRenderList(unref(newsOverview), (item) => {
        _push(ssrRenderComponent(_component_ContentCard, {
          key: item.to,
          title: item.title,
          description: item.description,
          to: item.to,
          meta: item.meta
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section><section class="section" data-v-fec01c39><div class="container" data-v-fec01c39><p class="eyebrow" data-v-fec01c39>\u6700\u4F73\u5B9E\u8DF5</p><h2 class="section-title" data-v-fec01c39>\u7B2C 3 \u6B65\u5148\u4ECE\u6700\u6838\u5FC3\u7684\u4E2D\u6587\u7AD9\u70B9\u5B9E\u8DF5\u6C89\u6DC0\u5F00\u59CB\u3002</h2><div class="grid two-up" data-v-fec01c39><!--[-->`);
      ssrRenderList(unref(bestPracticeOverview), (item) => {
        _push(ssrRenderComponent(_component_ContentCard, {
          key: item.to,
          title: item.title,
          description: item.description,
          to: item.to,
          meta: item.meta
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section><section class="section" data-v-fec01c39><div class="container" data-v-fec01c39><p class="eyebrow" data-v-fec01c39>\u4E92\u52A8\u5165\u53E3</p><h2 class="section-title" data-v-fec01c39>\u7B2C 2 \u6B65\u5F00\u59CB\u8865\u9F50\u641C\u7D22\u3001\u53CD\u9988\u548C\u793E\u533A\u80FD\u529B\u3002</h2><div class="grid three-up" data-v-fec01c39><!--[-->`);
      ssrRenderList(unref(actionOverview), (item) => {
        _push(ssrRenderComponent(_component_ContentCard, {
          key: item.to,
          title: item.title,
          description: item.description,
          to: item.to,
          meta: item.meta
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section><section class="section" data-v-fec01c39><div class="container subscribe-grid card" data-v-fec01c39><div data-v-fec01c39><p class="eyebrow" data-v-fec01c39>\u8BA2\u9605\u66F4\u65B0</p><h2 class="section-title" data-v-fec01c39>\u5982\u679C\u4F60\u5E0C\u671B\u8DDF\u8FDB\u4E2D\u6587\u8D44\u6599\u66F4\u65B0\uFF0C\u53EF\u4EE5\u5148\u7559\u4E0B\u8BA2\u9605\u90AE\u7BB1\u3002</h2><p class="section-copy" data-v-fec01c39> \u5F53\u524D\u8BA2\u9605\u63A5\u53E3\u5148\u63D0\u4F9B\u53EF\u9A8C\u8BC1\u94FE\u8DEF\uFF0C\u540E\u7EED\u53EF\u63A5\u5165\u771F\u5B9E\u90AE\u4EF6\u7CFB\u7EDF\u3001Webhook \u6216\u81EA\u52A8\u5316\u6D41\u7A0B\u3002 </p></div>`);
      _push(ssrRenderComponent(_component_SubscribeForm, null, null, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fec01c39"]]);

export { index as default };
//# sourceMappingURL=index-gCwkuqVq.mjs.map
