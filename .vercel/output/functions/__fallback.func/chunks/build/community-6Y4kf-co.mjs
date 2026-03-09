import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "community",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo({
      title: "\u793E\u533A\u652F\u6301",
      description: "\u67E5\u770B OpenClawCN \u7684\u793E\u533A\u5165\u53E3\u3001\u95EE\u9898\u53CD\u9988\u65B9\u5F0F\u3001\u8D21\u732E\u8DEF\u5F84\u548C\u540E\u7EED\u4E2D\u6587\u793E\u533A\u89C4\u5212\u3002",
      path: "/community"
    });
    const channels = [
      {
        title: "GitHub \u4ED3\u5E93",
        description: "\u67E5\u770B\u6E90\u7801\u3001\u7248\u672C\u52A8\u6001\u3001Issue \u548C PR \u8BB0\u5F55\u3002",
        href: "https://github.com/openclaw/openclaw"
      },
      {
        title: "\u95EE\u9898\u53CD\u9988",
        description: "\u5982\u679C\u4F60\u53D1\u73B0\u6587\u6863\u95EE\u9898\u6216\u7AD9\u70B9 bug\uFF0C\u53EF\u4EE5\u76F4\u63A5\u63D0\u4EA4\u53CD\u9988\u3002",
        href: "/feedback"
      },
      {
        title: "\u8D21\u732E\u4E0E\u534F\u4F5C",
        description: "\u540E\u7EED\u4F1A\u8865\u9F50\u4E2D\u6587\u8D21\u732E\u6307\u5357\u3001\u7FFB\u8BD1\u8BF4\u660E\u548C\u793E\u533A\u534F\u4F5C\u89C4\u5219\u3002",
        href: "/docs/community"
      },
      {
        title: "FAQ",
        description: "\u5148\u67E5\u770B\u5E38\u89C1\u95EE\u9898\uFF0C\u518D\u51B3\u5B9A\u53BB\u6587\u6863\u3001\u53CD\u9988\u8FD8\u662F GitHub\u3002",
        href: "/faq"
      }
    ];
    const faqs = [
      "\u6211\u5E94\u8BE5\u5148\u770B\u6587\u6863\u8FD8\u662F\u5148\u770B\u65B0\u95FB\uFF1F\u5EFA\u8BAE\u5148\u770B\u5FEB\u901F\u5165\u95E8\uFF0C\u518D\u770B\u5B89\u88C5\u4E0E\u73AF\u5883\u3002",
      "\u53D1\u73B0\u9519\u522B\u5B57\u6216\u5185\u5BB9\u7F3A\u5931\u600E\u4E48\u529E\uFF1F\u76F4\u63A5\u63D0\u4EA4\u53CD\u9988\u5373\u53EF\u3002",
      "\u793E\u533A\u5165\u53E3\u76EE\u524D\u5728\u54EA\uFF1F\u5F53\u524D\u4EE5 GitHub \u548C\u7AD9\u5185\u53CD\u9988\u4E3A\u4E3B\uFF0C\u540E\u7EED\u4F1A\u8865\u5145\u4E2D\u6587\u793E\u533A\u6E20\u9053\u3002"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-223a5f59><div class="container" data-v-223a5f59><p class="eyebrow" data-v-223a5f59>Community</p><h1 class="section-title" data-v-223a5f59>\u793E\u533A\u652F\u6301</h1><p class="section-copy" data-v-223a5f59> \u7B2C 2 \u6B65\u5F00\u59CB\u8865\u9F50\u4E0E\u7528\u6237\u4E92\u52A8\u76F8\u5173\u7684\u5165\u53E3\u3002\u5F53\u524D\u5148\u63D0\u4F9B\u95EE\u9898\u53CD\u9988\u3001GitHub \u534F\u4F5C\u548C\u57FA\u7840 FAQ\uFF0C\u540E\u7EED\u518D\u6269\u5C55\u8BA8\u8BBA\u4E0E\u8D21\u732E\u673A\u5236\u3002 </p><div class="grid four-up cards" data-v-223a5f59><!--[-->`);
      ssrRenderList(channels, (channel) => {
        _push(`<a class="card channel-card"${ssrRenderAttr("href", channel.href)}${ssrRenderAttr("target", channel.href.startsWith("http") ? "_blank" : void 0)}${ssrRenderAttr("rel", channel.href.startsWith("http") ? "noreferrer" : void 0)} data-v-223a5f59><h2 data-v-223a5f59>${ssrInterpolate(channel.title)}</h2><p data-v-223a5f59>${ssrInterpolate(channel.description)}</p><span class="more" data-v-223a5f59>\u8FDB\u5165</span></a>`);
      });
      _push(`<!--]--></div><div class="faq card" data-v-223a5f59><h2 data-v-223a5f59>\u5E38\u89C1\u95EE\u9898</h2><ul data-v-223a5f59><!--[-->`);
      ssrRenderList(faqs, (faq) => {
        _push(`<li data-v-223a5f59>${ssrInterpolate(faq)}</li>`);
      });
      _push(`<!--]--></ul></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/community.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const community = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-223a5f59"]]);

export { community as default };
//# sourceMappingURL=community-6Y4kf-co.mjs.map
