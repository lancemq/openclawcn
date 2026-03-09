import { _ as __nuxt_component_0$1 } from './nuxt-link-BUCtmSji.mjs';
import { defineComponent, mergeProps, withCtx, openBlock, createBlock, toDisplayString, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ContentCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    to: {},
    meta: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: "content-card card"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.meta) {
              _push2(`<span class="tag" data-v-86363845${_scopeId}>${ssrInterpolate(__props.meta)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h3 data-v-86363845${_scopeId}>${ssrInterpolate(__props.title)}</h3><p data-v-86363845${_scopeId}>${ssrInterpolate(__props.description)}</p><span class="more" data-v-86363845${_scopeId}>\u67E5\u770B\u8BE6\u60C5</span>`);
          } else {
            return [
              __props.meta ? (openBlock(), createBlock("span", {
                key: 0,
                class: "tag"
              }, toDisplayString(__props.meta), 1)) : createCommentVNode("", true),
              createVNode("h3", null, toDisplayString(__props.title), 1),
              createVNode("p", null, toDisplayString(__props.description), 1),
              createVNode("span", { class: "more" }, "\u67E5\u770B\u8BE6\u60C5")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86363845"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ContentCard-Cbc3QbGi.mjs.map
