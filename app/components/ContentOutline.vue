<script setup lang="ts">
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

defineProps<{
  title?: string
  links?: TocLink[]
}>()
</script>

<template>
  <aside v-if="links?.length" class="content-outline card">
    <div class="content-outline-head">
      <p class="eyebrow">On This Page</p>
      <h2>{{ title || '本页目录' }}</h2>
    </div>

    <nav class="content-outline-nav" aria-label="文章目录">
      <ul class="content-outline-list">
        <li v-for="link in links" :key="link.id">
          <a :href="`#${link.id}`" :class="['content-outline-link', `depth-${link.depth}`]">
            {{ link.text }}
          </a>

          <ul v-if="link.children?.length" class="content-outline-list nested">
            <li v-for="child in link.children" :key="child.id">
              <a :href="`#${child.id}`" :class="['content-outline-link', `depth-${child.depth}`]">
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.content-outline {
  display: grid;
  gap: 12px;
  position: sticky;
  top: 96px;
}

.content-outline-head {
  display: grid;
  gap: 4px;
}

.content-outline-head h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
  letter-spacing: -0.03em;
}

.content-outline-nav,
.content-outline-list {
  display: grid;
  gap: 8px;
}

.content-outline-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.content-outline-list.nested {
  padding-left: 10px;
}

.content-outline-link {
  display: block;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.55;
  transition: color 0.18s ease, transform 0.18s ease;
}

.content-outline-link:hover {
  color: var(--brand);
  transform: translateX(2px);
}

.depth-3 {
  font-size: 0.82rem;
}
</style>
