import { ref } from 'vue'

const isOpen = ref(false)

export function useGlobalSearch() {
  function openSearch() {
    isOpen.value = true
  }

  function closeSearch() {
    isOpen.value = false
  }

  function toggleSearch() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    openSearch,
    closeSearch,
    toggleSearch,
  }
}