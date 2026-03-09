import { defineComponent, mergeProps, reactive, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FeedbackForm",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      type: "content",
      name: "",
      email: "",
      page: "",
      message: ""
    });
    const pending = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "feedback-form card" }, _attrs))} data-v-167d56df><div class="field-grid" data-v-167d56df><label class="field" data-v-167d56df><span data-v-167d56df>\u53CD\u9988\u7C7B\u578B</span><select data-v-167d56df><option value="content" data-v-167d56df${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "content") : ssrLooseEqual(unref(form).type, "content")) ? " selected" : ""}>\u5185\u5BB9\u5EFA\u8BAE</option><option value="bug" data-v-167d56df${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "bug") : ssrLooseEqual(unref(form).type, "bug")) ? " selected" : ""}>\u7AD9\u70B9\u95EE\u9898</option><option value="community" data-v-167d56df${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "community") : ssrLooseEqual(unref(form).type, "community")) ? " selected" : ""}>\u793E\u533A\u8BC9\u6C42</option></select></label><label class="field" data-v-167d56df><span data-v-167d56df>\u90AE\u7BB1\uFF08\u53EF\u9009\uFF09</span><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="you@example.com" data-v-167d56df></label></div><div class="field-grid" data-v-167d56df><label class="field" data-v-167d56df><span data-v-167d56df>\u59D3\u540D\uFF08\u53EF\u9009\uFF09</span><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="\u79F0\u547C\u6216\u6635\u79F0" data-v-167d56df></label><label class="field" data-v-167d56df><span data-v-167d56df>\u76F8\u5173\u9875\u9762\uFF08\u53EF\u9009\uFF09</span><input${ssrRenderAttr("value", unref(form).page)} type="text" placeholder="/docs/getting-started" data-v-167d56df></label></div><label class="field" data-v-167d56df><span data-v-167d56df>\u53CD\u9988\u5185\u5BB9</span><textarea rows="7" placeholder="\u8BF7\u63CF\u8FF0\u4F60\u53D1\u73B0\u7684\u95EE\u9898\u3001\u5EFA\u8BAE\u6216\u5E0C\u671B\u8865\u5145\u7684\u5185\u5BB9" data-v-167d56df>${ssrInterpolate(unref(form).message)}</textarea></label><div class="button-row" data-v-167d56df><button class="button primary" type="submit"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""} data-v-167d56df>${ssrInterpolate(unref(pending) ? "\u63D0\u4EA4\u4E2D..." : "\u63D0\u4EA4\u53CD\u9988")}</button></div>`);
      if (unref(successMessage)) {
        _push(`<p class="notice success" data-v-167d56df>${ssrInterpolate(unref(successMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<p class="notice error" data-v-167d56df>${ssrInterpolate(unref(errorMessage))}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeedbackForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-167d56df"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo({
      title: "\u63D0\u4EA4\u53CD\u9988",
      description: "\u5411 OpenClawCN \u63D0\u4EA4\u6587\u6863\u95EE\u9898\u3001\u7AD9\u70B9\u95EE\u9898\u548C\u793E\u533A\u5EFA\u8BAE\u3002",
      path: "/feedback"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FeedbackForm = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-6429aaeb><div class="container feedback-page" data-v-6429aaeb><div data-v-6429aaeb><p class="eyebrow" data-v-6429aaeb>Feedback</p><h1 class="section-title" data-v-6429aaeb>\u63D0\u4EA4\u53CD\u9988</h1><p class="section-copy" data-v-6429aaeb> \u7B2C 2 \u6B65\u5148\u63D0\u4F9B\u53EF\u9A8C\u8BC1\u7684\u53CD\u9988\u94FE\u8DEF\uFF1A\u524D\u7AEF\u8868\u5355\u3001\u670D\u52A1\u7AEF\u6821\u9A8C\u63A5\u53E3\uFF0C\u4EE5\u53CA\u540E\u7EED\u63A5\u5165 webhook \u6216\u5DE5\u5355\u7CFB\u7EDF\u7684\u6269\u5C55\u4F4D\u3002 </p></div>`);
      _push(ssrRenderComponent(_component_FeedbackForm, null, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/feedback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const feedback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6429aaeb"]]);

export { feedback as default };
//# sourceMappingURL=feedback-j98ElNDB.mjs.map
