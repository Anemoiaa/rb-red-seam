import { computed } from 'vue'

export default function usePagination(data) {
  const pageNums = computed(() => {
    if (!data.value) {
      return null
    }

    const meta = data.value.meta
    const currentPage = meta.current_page

    const delta = 2
    const start = Math.max(1, currentPage - delta)
    const end = start <= delta ? Math.min(meta.last_page, start + delta * 2) : Math.min(meta.last_page, currentPage + delta)

    const pagination=  new Array(end - start + 1).fill(0).map((_, i) => start + i)

    if (pagination.length > meta.last_page) {
      pagination.splice(meta.last_page)
    }

    return pagination
  })

  return { pageNums }
}
