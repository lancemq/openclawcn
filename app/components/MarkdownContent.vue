<script setup lang="ts">
interface Props {
  content?: any
}

const props = defineProps<Props>()
</script>

<template>
  <div class="markdown-content">
    <ContentRenderer v-if="props.content" :value="props.content" />
    <slot v-else />
  </div>
</template>

<style>
.markdown-content {
  color: var(--ink);
  font-size: 0.98rem;
  line-height: 1.82;
}

.markdown-content > * + * {
  margin-top: 1.05em;
}

.markdown-content p,
.markdown-content li,
.markdown-content td {
  text-wrap: pretty;
}

.markdown-content p {
  margin: 0;
  color: #334033;
}

.markdown-content strong {
  color: #172317;
  font-weight: 800;
}

.markdown-content em {
  color: #47604a;
}

/* Headings */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin: 1.5em 0 0.55em;
  scroll-margin-top: 104px;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #19231d;
}

.markdown-content h1 {
  font-size: clamp(1.54rem, 2.1vw, 2.16rem);
}

.markdown-content h2 {
  font-size: clamp(1.18rem, 1.48vw, 1.52rem);
}

.markdown-content h3 {
  font-size: clamp(1rem, 1.08vw, 1.14rem);
}

.markdown-content h4 {
  font-size: clamp(0.95rem, 1vw, 1.04rem);
  letter-spacing: -0.02em;
}

.markdown-content h5,
.markdown-content h6 {
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.45;
  text-transform: uppercase;
  color: var(--accent);
}

.markdown-content h2 + p,
.markdown-content h3 + p,
.markdown-content h4 + p {
  margin-top: 0;
}

/* Inline code */
.markdown-content :not(pre) > code {
  padding: 0.14em 0.52em;
  border: 1px solid rgba(12, 108, 105, 0.14);
  border-radius: 8px;
  color: #0a5a57;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.34)),
    linear-gradient(180deg, rgba(19, 129, 125, 0.12), rgba(19, 129, 125, 0.07));
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.84em;
  font-weight: 700;
  letter-spacing: -0.01em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.66);
}

/* Code blocks */
.markdown-content pre {
  overflow: auto;
  margin: 0;
  padding: 18px 20px 20px;
  border: 1px solid rgba(67, 73, 60, 0.16);
  border-top: none;
  border-radius: 0 0 18px 18px;
  color: #1f2d28;
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.98), rgba(245, 239, 227, 0.98)),
    #fffaf1;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.82),
    0 12px 24px rgba(74, 56, 28, 0.08);
  scrollbar-width: thin;
  scrollbar-color: rgba(214, 197, 171, 0.5) transparent;
}

.markdown-content pre code {
  display: block;
  padding: 0;
  border: 0;
  border-radius: 0;
  color: inherit !important;
  background: transparent;
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.92rem;
  font-weight: 550;
  line-height: 1.78;
  white-space: pre;
  tab-size: 2;
  text-rendering: optimizeLegibility;
}

.markdown-content pre code span {
  background: transparent !important;
}

/* Code block wrapper (for highlighted code) */
.markdown-content .code-block-wrapper {
  position: relative;
  margin: 1.35em 0 1.5em;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(67, 73, 60, 0.18);
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.98), rgba(248, 242, 230, 0.98));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 8px 24px rgba(74, 56, 28, 0.1);
}

.markdown-content .code-block-wrapper::after {
  content: "";
  position: absolute;
  inset: 46px auto 0 0;
  width: 44px;
  border-right: 1px solid rgba(67, 73, 60, 0.08);
  background: linear-gradient(180deg, rgba(67, 73, 60, 0.03), transparent 30%);
  pointer-events: none;
  opacity: 0.6;
}

.markdown-content .code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 46px;
  padding: 8px 14px 8px 16px;
  border-bottom: 1px solid rgba(67, 73, 60, 0.12);
  background:
    linear-gradient(180deg, rgba(19, 129, 125, 0.08), rgba(19, 129, 125, 0.04));
}

.markdown-content .code-block-wrapper pre {
  margin: 0;
  padding: 16px 18px 18px 20px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #1a2a1a;
}

.markdown-content .code-block-wrapper pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.markdown-content .code-block-wrapper pre::-webkit-scrollbar-track {
  background: rgba(67, 73, 60, 0.05);
}

.markdown-content .code-block-wrapper pre::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 999px;
  background: rgba(67, 73, 60, 0.2);
  background-clip: padding-box;
}

.markdown-content .code-block-wrapper pre::-webkit-scrollbar-thumb:hover {
  background: rgba(67, 73, 60, 0.35);
  background-clip: padding-box;
}

.markdown-content .code-block-wrapper pre {
  border-radius: 0;
}

.markdown-content .code-lang {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(19, 129, 125, 0.2);
  background: rgba(19, 129, 125, 0.08);
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: #0a5a57;
  letter-spacing: 0.04em;
}

.markdown-content .code-copy-container {
  display: inline-flex;
  align-items: center;
}

.markdown-content .code-copy-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  padding: 0 12px 0 8px;
  border: 1px solid rgba(67, 73, 60, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: #3a4a3a;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(74, 56, 28, 0.08);
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.markdown-content .code-copy-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.9);
  color: #1a2a1a;
  border-color: rgba(19, 129, 125, 0.3);
  box-shadow: 0 4px 12px rgba(74, 56, 28, 0.12);
}

.markdown-content .code-copy-btn.copied {
  color: #0a5a57;
  border-color: rgba(19, 129, 125, 0.4);
  background: rgba(19, 129, 125, 0.12);
}

.markdown-content pre::selection,
.markdown-content pre code::selection,
.markdown-content pre code span::selection {
  color: #fff6e7;
  background: rgba(19, 129, 125, 0.25);
}

.markdown-content .code-copy-btn-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(67, 73, 60, 0.08);
}

.markdown-content .code-copy-btn-mark span {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.7;
  transition: transform 0.18s ease, opacity 0.18s ease, width 0.18s ease;
}

.markdown-content .code-copy-btn:hover .code-copy-btn-mark span {
  opacity: 1;
}

.markdown-content .code-copy-btn.copied .code-copy-btn-mark {
  background: rgba(19, 129, 125, 0.15);
}

.markdown-content .code-copy-btn.copied .code-copy-btn-mark span:first-child {
  transform: translateX(1px) translateY(1px) rotate(42deg);
  width: 4px;
}

.markdown-content .code-copy-btn.copied .code-copy-btn-mark span:last-child {
  transform: translateX(-1px) rotate(-48deg);
  width: 9px;
}

.markdown-content .code-copy-btn-label {
  white-space: nowrap;
  line-height: 1;
}

/* Tables */
.markdown-content table {
  width: 100%;
  margin: 1.4em 0 1.6em;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
  font-size: 0.9rem;
  line-height: 1.65;
  border: 1px solid rgba(67, 73, 60, 0.14);
  border-radius: 16px;
  background: rgba(255, 251, 244, 0.78);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.markdown-content th {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(67, 73, 60, 0.16);
  background: linear-gradient(180deg, rgba(19, 129, 125, 0.12), rgba(19, 129, 125, 0.06));
  font-weight: 700;
  text-align: left;
  color: #173331;
}

.markdown-content td {
  padding: 11px 14px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
  color: #394739;
  vertical-align: top;
}

.markdown-content tr:nth-child(even) td {
  background: rgba(255, 255, 255, 0.42);
}

.markdown-content tr:hover td {
  background: rgba(234, 247, 244, 0.78);
}

/* Blockquotes */
.markdown-content blockquote {
  margin: 1.3em 0;
  padding: 14px 18px;
  border-left: 4px solid var(--brand);
  border-radius: 0 12px 12px 0;
  background: rgba(19, 129, 125, 0.06);
  color: var(--ink-soft);
  line-height: 1.7;
}

.markdown-content blockquote p {
  margin: 0;
}

.markdown-content blockquote strong {
  color: var(--brand);
}

/* Lists */
.markdown-content ul,
.markdown-content ol {
  margin: 0.9em 0 1.1em;
  padding-left: 1.35rem;
}

.markdown-content li {
  margin: 0.42em 0;
  line-height: 1.72;
}

.markdown-content li::marker {
  color: var(--brand);
}

/* Links */
.markdown-content a {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.18s ease;
}

.markdown-content a:hover {
  color: var(--brand-bright);
}

/* Images */
.markdown-content img {
  max-width: 100%;
  margin: 18px 0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(74, 56, 28, 0.1);
}

/* Horizontal rule */
.markdown-content hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid rgba(67, 73, 60, 0.16);
}

/* Keyboard */
.markdown-content kbd {
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0 0.42rem;
  border: 1px solid rgba(67, 73, 60, 0.2);
  border-bottom-width: 2px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.75);
  color: #23302c;
  font-size: 0.82em;
  font-weight: 700;
}

/* Callouts */
.markdown-content .callout {
  margin: 18px 0;
  padding: 14px 18px;
  border-radius: 12px;
  border-left: 4px solid;
  display: grid;
  gap: 8px;
}

.markdown-content .callout.info {
  background: rgba(59, 130, 246, 0.08);
  border-color: #3b82f6;
}

.markdown-content .callout.warning {
  background: rgba(245, 158, 11, 0.08);
  border-color: #f59e0b;
}

.markdown-content .callout.error {
  background: rgba(239, 68, 68, 0.08);
  border-color: #ef4444;
}

.markdown-content .callout.success {
  background: rgba(16, 185, 129, 0.08);
  border-color: #10b981;
}

.markdown-content .callout-title {
  font-weight: 700;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.markdown-content .callout.info .callout-title { color: #3b82f6; }
.markdown-content .callout.warning .callout-title { color: #d97706; }
.markdown-content .callout.error .callout-title { color: #dc2626; }
.markdown-content .callout.success .callout-title { color: #059669; }

/* Terminal blocks */
.markdown-content .terminal-block {
  margin: 18px 0;
  border-radius: 18px;
  overflow: hidden;
}

.markdown-content .terminal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%);
}

.markdown-content .terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.markdown-content .terminal-dot.red { background: #ff5f56; }
.markdown-content .terminal-dot.yellow { background: #ffbd2e; }
.markdown-content .terminal-dot.green { background: #27c93f; }

.markdown-content .terminal-title {
  flex: 1;
  text-align: center;
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
}

.markdown-content .terminal-body {
  padding: 16px 20px;
  background: #1a1a1a;
  color: #e8e4dc;
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.88rem;
  line-height: 1.7;
  overflow-x: auto;
}

.markdown-content .terminal-body .prompt {
  color: #22c55e;
  margin-right: 8px;
}

.markdown-content .terminal-body .command {
  color: #e8e4dc;
}

.markdown-content .terminal-body .output {
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
  white-space: pre-wrap;
}

.markdown-content .terminal-body .comment {
  color: #6b7280;
  font-style: italic;
}

/* First child margin reset */
.markdown-content > div > h1:first-child {
  display: none;
}

.markdown-content > div > :first-child:is(h2, h3, p, ul, ol, blockquote, pre) {
  margin-top: 0;
}

/* Responsive */
@media (max-width: 720px) {
  .markdown-content table {
    font-size: 0.82rem;
  }

  .markdown-content th,
  .markdown-content td {
    padding: 8px 10px;
  }

  .markdown-content pre {
    padding: 14px 16px 16px;
    font-size: 0.86rem;
  }

  .markdown-content .terminal-body {
    padding: 12px 14px;
    font-size: 0.8rem;
  }

  .markdown-content .code-block-header {
    padding: 6px 12px;
  }

  .markdown-content .code-copy-btn {
    min-height: 30px;
    padding: 0 11px 0 9px;
    gap: 8px;
    letter-spacing: 0.06em;
  }

  .markdown-content .code-copy-btn-mark {
    min-width: 22px;
    height: 18px;
    padding: 0 6px;
  }

  .markdown-content .code-copy-btn-label {
    font-size: 0.66rem;
  }

  .markdown-content ul,
  .markdown-content ol {
    padding-left: 20px;
  }

  .markdown-content blockquote {
    padding: 10px 14px;
  }
}
</style>
