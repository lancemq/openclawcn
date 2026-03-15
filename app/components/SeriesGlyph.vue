<script setup lang="ts">
withDefaults(defineProps<{
  kind?: 'stack' | 'grid' | 'flow' | 'pulse' | 'shield' | 'spark' | 'terminal' | 'orbit'
  tone?: 'brand' | 'accent' | 'muted'
  small?: boolean
}>(), {
  kind: 'stack',
  tone: 'brand',
  small: false,
})
</script>

<template>
  <span class="series-glyph" :class="[`kind-${kind}`, `tone-${tone}`, { small }]">
    <span class="glyph-core" />
    <span class="glyph-mark glyph-mark-a" />
    <span class="glyph-mark glyph-mark-b" />
  </span>
</template>

<style scoped>
.series-glyph {
  --glyph-size: 2.75rem;
  --glyph-color: rgba(12, 108, 105, 0.92);
  --glyph-soft: rgba(12, 108, 105, 0.18);
  position: relative;
  display: inline-flex;
  width: var(--glyph-size);
  height: var(--glyph-size);
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 247, 236, 0.74)),
    var(--glyph-soft);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.series-glyph.small {
  --glyph-size: 2.2rem;
  border-radius: 15px;
}

.tone-accent {
  --glyph-color: rgba(166, 111, 44, 0.92);
  --glyph-soft: rgba(166, 111, 44, 0.16);
}

.tone-muted {
  --glyph-color: rgba(82, 96, 82, 0.88);
  --glyph-soft: rgba(82, 96, 82, 0.12);
}

.glyph-core,
.glyph-mark {
  position: absolute;
  display: block;
  background: var(--glyph-color);
}

.glyph-core {
  width: 0.95rem;
  height: 0.95rem;
  border-radius: 0.45rem;
}

.glyph-mark {
  border-radius: 999px;
  opacity: 0.95;
}

.kind-stack .glyph-core {
  width: 1rem;
  height: 0.26rem;
  border-radius: 999px;
}

.kind-stack .glyph-mark-a,
.kind-stack .glyph-mark-b {
  width: 1rem;
  height: 0.26rem;
  left: 50%;
  transform: translateX(-50%);
}

.kind-stack .glyph-mark-a {
  top: 0.92rem;
}

.kind-stack .glyph-mark-b {
  bottom: 0.92rem;
}

.kind-grid .glyph-core {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 0.14rem;
  box-shadow:
    0.56rem 0 0 var(--glyph-color),
    0 0.56rem 0 var(--glyph-color),
    0.56rem 0.56rem 0 var(--glyph-color);
  transform: translate(-0.28rem, -0.28rem);
}

.kind-grid .glyph-mark-a,
.kind-grid .glyph-mark-b {
  display: none;
}

.kind-flow .glyph-core {
  width: 1.05rem;
  height: 0.22rem;
  border-radius: 999px;
}

.kind-flow .glyph-mark-a,
.kind-flow .glyph-mark-b {
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
}

.kind-flow .glyph-mark-a {
  left: 0.7rem;
}

.kind-flow .glyph-mark-b {
  right: 0.7rem;
}

.kind-pulse .glyph-core {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.kind-pulse .glyph-mark-a {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid rgba(12, 108, 105, 0.28);
  background: transparent;
  border-radius: 50%;
}

.tone-accent.kind-pulse .glyph-mark-a {
  border-color: rgba(166, 111, 44, 0.28);
}

.tone-muted.kind-pulse .glyph-mark-a {
  border-color: rgba(82, 96, 82, 0.24);
}

.kind-pulse .glyph-mark-b {
  display: none;
}

.kind-shield .glyph-core {
  width: 0.95rem;
  height: 1.1rem;
  clip-path: polygon(50% 0%, 92% 18%, 86% 72%, 50% 100%, 14% 72%, 8% 18%);
}

.kind-shield .glyph-mark-a {
  width: 0.2rem;
  height: 0.58rem;
}

.kind-shield .glyph-mark-b {
  width: 0.58rem;
  height: 0.2rem;
}

.kind-spark .glyph-core {
  width: 0.3rem;
  height: 1rem;
}

.kind-spark .glyph-mark-a,
.kind-spark .glyph-mark-b {
  width: 1rem;
  height: 0.3rem;
}

.kind-terminal .glyph-core {
  width: 0.95rem;
  height: 0.2rem;
  transform: translateX(0.18rem);
}

.kind-terminal .glyph-mark-a {
  width: 0.38rem;
  height: 0.38rem;
  transform: rotate(45deg);
  left: 0.78rem;
}

.kind-terminal .glyph-mark-b {
  width: 0.2rem;
  height: 0.2rem;
  right: 0.78rem;
  bottom: 1rem;
}

.kind-orbit .glyph-core {
  width: 0.44rem;
  height: 0.44rem;
  border-radius: 50%;
}

.kind-orbit .glyph-mark-a {
  width: 1.52rem;
  height: 0.76rem;
  border: 2px solid rgba(12, 108, 105, 0.3);
  background: transparent;
  border-radius: 999px;
  transform: rotate(25deg);
}

.kind-orbit .glyph-mark-b {
  width: 1.52rem;
  height: 0.76rem;
  border: 2px solid rgba(12, 108, 105, 0.18);
  background: transparent;
  border-radius: 999px;
  transform: rotate(-25deg);
}

.tone-accent.kind-orbit .glyph-mark-a,
.tone-accent.kind-orbit .glyph-mark-b {
  border-color: rgba(166, 111, 44, 0.28);
}

.tone-muted.kind-orbit .glyph-mark-a,
.tone-muted.kind-orbit .glyph-mark-b {
  border-color: rgba(82, 96, 82, 0.22);
}
</style>
